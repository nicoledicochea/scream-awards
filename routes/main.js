const express = require("express");
const router = express.Router();
// const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

// const postsController = require("../controllers/posts");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/about", homeController.getAbout);



module.exports = router;
