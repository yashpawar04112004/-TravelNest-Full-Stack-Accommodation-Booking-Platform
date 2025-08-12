const express=require("express");
// const router = express.Router({ mergeParams: true });
const router=express.Router();
const mongoose =require("mongoose");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const {index,renderNewForm,showListing,createListing,renderEditForm,updateListing,destroyListing}=require("../controllers/listings.js");

const multer= require("multer");
const{storage}=require("../cloudConfig.js");
const upload=multer({storage});


router.route("/")
.get(wrapAsync(index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(createListing));

// New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));



// router.route("/:id")
// .get(wrapAsync(showListing))
// .get(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(renderEditForm))
// .delete(isLoggedIn,isOwner,wrapAsync(destroyListing));


// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(renderEditForm));


module.exports=router;