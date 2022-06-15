const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    profile: Number,
    friends: [
        {
            username: String,
            profile: Number,
            chatId: mongoose.Types.ObjectId 
        }
    ]
}
);

// export the mongoose model
module.exports = mongoose.model('User', userSchema);