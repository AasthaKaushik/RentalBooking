const express = require("express");
const router =express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport= require("passport");
const {saveRedirectUrl}= require("../middleware.js")
const userController = require("../controllers/user.js");


// combining both the signups
router
  .route("/signup")
  .get(userController.renderSinupForm)
  .post(wrapAsync(userController.signup));

//combining both the login
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// logout logic 
router.get("/logout",userController.logout);

module.exports= router;