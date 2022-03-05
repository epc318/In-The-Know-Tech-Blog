const router = require("express").Router();
const sequelize = require("../config/connection");
const { user, post, comment } = require("../models");


router.get("/", (req, res) => {
    console.log(req.session);
    post.findAll({
        attributes: [
            "id",
            "title",
            "created_at"
        ],
        include: [
            {
                model: comment,
                attributes: [
                    "comment_input",
                    "post_id",
                    "created_at",
                    "user_id"
                ],
                include: {
                    model: user,
                    attributes: ["pseudonym"]
                }
            },
            {
                model: user,
                attributes: ["pseudonym"]
            }
        ]
    })
     .then(postInfo => {
        const posts = postInfo.map(post => post.get({ plain: true }));
        res.render("home", { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
    console.log(req.session.signedIn);
    if(req.session.signedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
})


module.exports = router;