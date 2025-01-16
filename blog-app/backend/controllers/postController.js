const Post = require('../models/postSchema');
// const User = require('../models/userSchema');

// Function to get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        if(posts.length == 0){
            return res.status(404).json({
                success: false,
                message: "No posts found" 
            });
        }
        return res.json({
            success: true,
            posts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

// Function to get a single post by its ID
exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        return res.status(200).json({
            success: true,
            post
        });

    } catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

// Function to create a new post (authentication required)
exports.createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        if(!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required",
            })
        }

        const post = new Post({
            title,
            content,
            author: req.user.id, // The user ID from the authentication token
        });
        await post.save();

        return res.status(201).json({
            success: true,
            post,
            message: "Post created successfully",
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

// Function to update a post (authentication required)
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        if(!title || !content) {
            return res.status(400).json({
                    success: false,
                    message: "Title and content are required",
                });
        }
        const post = await Post.findById(id);
        if(title === post.title && content === post.content) {
            return res.status(400).json({
                success: false,
                message: "No changes made",
            })
        }

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        // check if user is the author of the post
        if(post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not the author of this post",
            });
        }

        post.title = title;
        post.content = content;

        await post.save();

        return res.status(200).json({
            success: true,
            post,
            message: 'Post updated successfully',
        })

    } catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

// Function to delete a post (authentication required)
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        

        // check if the user is the author of the post
        if(post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete the post',
            })
        }

        await post.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}