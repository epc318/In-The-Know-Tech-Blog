const router = require("express").Router();
const { user, post, comment } = require("../../models");


// get all comments
router.get("/", (req, res) => {
    comment.findAll({
        attributes: ["comment_input", "post_id", "user_id"]
    })
        .then(commentInfo => res.json(commentInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get a single comment
router.get("/:id", (req, res) => {
    comment.findOne({
        attributes: ["comment_input", "post_id", "user_id"],
        where: {
            id: req.params.id
        },
        include: [{
            model: user,
            attributes: ["pseudonym"]
        },
        {
            model: post,
            attributes: ["title"]
        }]
    })
        .then(commentInfo => {
            if(!commentInfo) {
                res.status(404).json({ message: "No comment found with this id" });
                return;
            }
            res.json(commentInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a comment
router.post("/", (req, res) => {
    comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
        .then(commentInfo => res.json(commentInfo))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
});


module.exports = router;