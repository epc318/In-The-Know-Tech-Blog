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


module.exports = router;