const router = require("express").Router();
const apiRoute = require("./api");
const homepageRoute = require("./home-routes");
const dashRoute = require("./dashboard-routes");


router.use("/", homepageRoute);
router.use("/api", apiRoute);
router.use("/dashboard", dashRoute);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;