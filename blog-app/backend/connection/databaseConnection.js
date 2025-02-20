const mongoose = require('mongoose');

exports.connectDB = async () => { 
    try { 
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}