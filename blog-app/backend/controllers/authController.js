const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Post = require('../models/postSchema')

// signup user
exports.signup = async (req, res) => {
    const { username, email, password} = req.body;
    try {
        if(!username || !email || !password) {
            return res.json({
                success: false,
                message: 'Please fill in all fields'
            });
        }

        let user = await User.findOne({ email });
        if (user) { 
            return res.json({
                success: false,
                message: 'Email already exists, Go to Login Page'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        user = new User({
            username,
            email: email,
            password: hashedPassword,
        })

        await user.save();

        return res.status(201).json({
            success: true,
            user,
            message: 'User created successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

// login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            return res.json({
                success: false,
                message: 'Please fill in all fields'
            })
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found, please signup first',
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(401).json({
                success: false,
                message: 'password is incorrect' 
            });
        }

        const options = {
            id: user._id,
            email: user.email,
        }

        const token = jwt.sign(options, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Store token in HTTP-only cookie -> Prevents access from client side
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000 // 1 hour in milliseconds
        });

        return res.json({
            success: true,
            token,
            user,
            message: 'Login successful',
        })
    } catch (error){
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized, please login first',
            });
        }

        // Find the user and delete their posts
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found or already deleted',
            });
        }

        // Delete the user's posts
        await Post.deleteMany({ author: userId });

        // Now delete the user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: 'Account and associated posts deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}