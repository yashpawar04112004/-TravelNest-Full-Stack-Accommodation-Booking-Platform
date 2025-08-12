const express=require("express");
const wrapAsync = require("../utils/wrapAsync");
// const router = express.Router({ mergeParams: true });
const router=express.Router();

const User=require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const { renderSignupForm, signup, renderLoginForm, login, logout } = require("../controllers/users.js");
// const wrapAsync=require("../utils/wrapAsync");

router.route("/signup")
.get(renderSignupForm)
.post(wrapAsync(signup));


router.route("/login")
.get(renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
login);

router.get("/logout",logout);

module.exports=router;
