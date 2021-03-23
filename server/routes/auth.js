const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const isLoggedIn = require("../middlewares/isLoggedIn");
const uploadToCloudinaryMiddleware = require("../config/cloudinaryConfig");


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.post("/signup", 

// TO DO: Change from "avatar." What is avatar supposed to be?

uploadToCloudinaryMiddleware.single("avatar"),
(req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password required" });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

      const newUser = {
        email,
        username,
        password: hashedPassword,
      };

      // DON'T THINK I NEED THIS. WHAT DOES IT MEAN?

      // if (req.file) {
      //   newUser.avatar = req.file.path;
      // }

      User.create(newUser)
        .then((createdUser) => {
          res.status(201).json({ message: "User account created" });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(400).json({ message: "Bad credentials" });
        return;
      }

      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        res.status(400).json({ message: "Bad credentials" });
        return;
      }

// ROLE; FOUNDUSER.ROLE ->> Is this for when you have multiple types of logged in users in your account? 

      req.session.currentUser = {
        _id: foundUser._id,
        //   role: foundUser.role
      };

// WHAT IS THIS? I DON'T KNOW WHERE API/AUTH/CURRENT-USER IS COMING FROM

      res.redirect("/api/auth/current-user");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/current-user", isLoggedIn, (req, res, next) => {

  User.findById(req.session.currentUser._id)
  .select("-password")
  .then((currentUser) => {
    res.status(200).json(currentUser);
  })
  .catch((error) => {
    next(error);
  });
});

router.delete("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    // cannot access session here anymore
    // console.log(req.session.currentUser);
    if (err) {
      res.status(500).json(err);
    }
    res.sendStatus(204).json({ message: "Successfuly logged out" });
  });
});

module.exports = router;
