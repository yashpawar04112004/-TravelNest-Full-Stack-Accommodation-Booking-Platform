const express=require("express");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
// const mongoose =require("mongoose");
const Review = require("../models/review.js");
const router = express.Router({ mergeParams: true });
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/reviews.js");

// Reviews
// post review  route
router.post("/",isLoggedIn,validateReview,wrapAsync(createReview));

// Delete Review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(destroyReview));

module.exports=router;