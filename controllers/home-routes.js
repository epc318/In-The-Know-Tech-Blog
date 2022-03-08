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
                    "user_id",
                    "created_at",
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
        res.render("home", { posts, signedIn: req.session.signedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/sign-in", (req, res) => {
    console.log(req.session.signedIn);
    if(req.session.signedIn) {
        res.redirect("/");
        return;
    }
    res.render("sign-in");
})

router.get("/post/:id", (req, res) => {
    post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["title", "post_id", "post_input", "created_at"],
        include: [
            {
                model: comment,
                attributes: ["id", "comment_input", "post_id", "user_id", "created_at"]
            },
            {
                model: user,
                attributes: ["pseudonym"]
            }
        ]
    })
    .then(postInfo => {
        if(!postInfo) {
            res.json(404).json({ message: "This post ID wasn't found, please check input and try again" });
            return;
        }
        const post = postInfo.get({ plain: true });
        res.render("singlePost", { post, signedIn: req.session.signedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;