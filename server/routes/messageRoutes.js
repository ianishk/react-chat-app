const express = require("express");
const router = express.Router();

const User = require("../schemas/userSchema");
const Message = require("../schemas/messageSchema");

// route to add a message to the mongodb database
router.post("/addMessage", (req, res) => {
    const { text, username, friendUsername } = req.body;
    User.findOne({ username }).then((user) => {
        user.friends.forEach((friend) => {
            if (friend.username === friendUsername) {
                // add this user as friend in the friend's friends array (fetch the friend object from the User database) if it doesn't already exist
                // User.findOne({ username: friendUsername }).then((friend) => {
                //     if (!friend.friends.some((friend) => friend.username === username)) {
                //         friend.friends.push({
                //             username,
                //             profile: user.profile,
                //             chatId: user.friends.find((friend) => friend.username === friendUsername).chatId,
                //         });
                //         friend.save();
                //     }
                // });
                Message.findOne({ _id: friend.chatId }).then((message) => {
                    message.messages.push({
                        text: text,
                        username: username,
                        time: new Date(),
                    });
                    message.save().then((message) => {
                        res.json(message);
                    }
                    ).catch((err) => {})
                }
                ).catch((err) => {})
            }
        }
        );
    }
    ).catch((err) => {})
}
); //end of router.post('/addMessage')


// route to get all messages from the mongodb database
router.get("/getMessages", (req, res) => {
    const username = req.body.username;
    const friendUsername = req.query.friendUsername;
    
    User.findOne({ username }).then((user) => {
        user.friends.forEach((friend) => {
            if (friend.username === friendUsername) {
                Message.findOne({ _id: friend.chatId }).then((message) => {
                    res.json(message);
                }).catch((err) => {})
            }
        })
    }).
    catch((err) => {}) 
}
); //end of router.get('/getMessages')

// export the router
module.exports = router;
