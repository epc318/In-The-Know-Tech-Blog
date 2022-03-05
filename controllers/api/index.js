const router = require("express").Router();
const commentRoute = require("./comment-routes");
const postRoute = require("./post-routes");
const userRoute = require("./user-routes");


router.use("/comments", commentRoute);
router.use("/posts", postRoute);
router.use("/users", userRoute);


module.exports = router;