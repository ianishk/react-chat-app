const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    messages: [
        {
            text: String,
            username: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
}
);

// export the mongoose model
module.exports = mongoose.model('Message', messageSchema);
