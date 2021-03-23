var express = require("express");
var router = express.Router();

/* GET users listing. */

//WHY IS "FUNCTION" HERE? 

router.get("/", function (req, res, next) {
  res.status(200).json({ message: "Welcome user" });
});

// TO DO: Add a route to add a picture on one user with Cloudinary

module.exports = router;
