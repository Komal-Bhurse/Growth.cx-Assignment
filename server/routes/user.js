const express = require("express");
const {restrictToLogedInUserOnly} = require("../middlewares/auth")

const {handleSignIn,handleSignUp,handleLogout,handleGetUrlInsights,handleGetUrls,handleDelete,handleUpdateFavouriteStatus} = require("../controllers/user");

const router = express.Router();

router.post("/signup",handleSignUp)

router.post("/signin",handleSignIn)

router.post("/logout",restrictToLogedInUserOnly,handleLogout)

router.post("/geturlinsights",restrictToLogedInUserOnly,handleGetUrlInsights)

router.get("/urls",restrictToLogedInUserOnly,handleGetUrls)

router.delete("/delete/:id",restrictToLogedInUserOnly,handleDelete)

router.put("/update/:id",restrictToLogedInUserOnly,handleUpdateFavouriteStatus)

module.exports = router;