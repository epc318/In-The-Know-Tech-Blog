const router = require("express").Router();
const apiRoute = require("./api");
const homepageRoute = require("./home-routes");
const dashRoute = require("./dashboard-routes");


router.use("/", homepageRoute);
router.use("/", dashRoute);