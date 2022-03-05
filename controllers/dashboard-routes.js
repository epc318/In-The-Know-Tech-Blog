const router = require("express").Router();
const sequelize = require("../config/connection");
const authorize = require("../utils/authorization");
const { user, post, comment } = require("../models");


router.get("/", authorize, (req, res) => {
    post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ["id", "title", "created_at"],
        incude: [
            {
                model: comment,
                attributes: ["comment_input", "post_id", "user_id", "created_at"],
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
        const feed = postInfo.map(post => post.get({ plain: true }));
        res.render("dashboard", { feed, signedIn: true });
    })
});

router.get("/edit/:id", authorize, (req, res) => {
    post.findByPk(req.params.id, {
        attributes: ["id", "title", "created_at"],
        include: [
            {
                model: comment,
                attributes: ["id", "comment_input", "post_id", "user_id", "created_at"],
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
            if(postInfo) {
                const singlePost = postInfo.get({ plain: true });
                res.render("edit-post", { singlePost, signedIn: true });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


module.exports = router;