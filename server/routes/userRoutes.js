//route to login a user
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../schemas/userSchema");
// require jwt
const jwt = require("jsonwebtoken");
const Message = require("../schemas/messageSchema");
const router = express.Router();

const auth = require("../middlewares/auth");

//route to login a user
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });
        jwt.sign(
          { id: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user._id,
                username: user.username,
                profile: user.profile,
              },
            });
          }
        );
      });
    })
    .catch((err) => {})
}); //end of router.post('/login')

//route to register a user
router.post("/signup", (req, res) => {
  const { username, password, profile } = req.body;
  // check if the user already exists
  User.findOne({ username })
    .then((user) => {
      if (user) return res.status(400).json({ msg: "User already exists" });
      else {
        const newUser = new User({
          username,
          password,
          profile,
        });
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => {})
        });
      }
    })
    .catch((err) => {})
}); //end of router.post('/register')

// router to add a friend to the mongodb database
router.post("/addFriend", auth, (req, res) => {
  let profile = 0;
  var chatId;
  let flag = 0;
  const { username, friendUsername } = req.body;
  console.info(username);
  User.findOne({ username })
    .then((user) => {
      // check if user exists
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      // check if friend already exists
      if (
        user.friends.some((friend) => friend.username === friendUsername)
      ) {
        return res.status(400).json({ msg: "Friend already exists" });
      } else {
        User.findOne({ username: friendUsername })
          .then((friend) => {
            // check if friend exists
            if (!friend)
              return res.status(400).json({ msg: "Friend does not exist" });
            profile = friend.profile;
            friend.friends.forEach((fofriend) => {
              if (fofriend.username === username) {
                chatId = fofriend.chatId;
                flag = 1;
              }
            });
            if (flag === 0) {
              const newMessage = new Message({});
              newMessage
                .save()
                .then((message) => {
                  user.friends.push({
                    username: friendUsername,
                    profile: profile,
                    chatId: message._id,
                  });
                  
                  user.save().then((u) => res.json(u.friends));
                })
                .catch((err) => {})
            } else {
              user.friends.push({
                username: friendUsername,
                profile: profile,
                chatId: chatId,
              });
              console.error(user.friends);
              user.save().then((u) => res.json(u.friends));
            }
          })
          .catch((err) => {})
      }

      // find the profile of the friend

      // add friend to user's friends array
    })
    .catch((err) => {})
}); //end of router.post('/addFriend')

// router to get the friends of the user
router.get("/getFriends", auth, (req, res) => {
  const { username } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      res.json(user.friends);
    })
    .catch((err) => {})
}); //end of router.get('/getFriends')

//end of router.get('/getFriends')

// export the router
module.exports = router;
