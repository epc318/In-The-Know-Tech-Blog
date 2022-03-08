const router = require("express").Router();
const { user, post, comment } = require("../../models");


// get all posts
router.get("/", (req, res) => {
    post.findAll({
        attributes: ["id", "title", "post_input", "created_at"],
        include: {
            model: user,
            attributes: ["pseudonym"]
        }
    })
        .then(postInfo => res.json(postInfo))
        .catch(err => {
            console.log(err);
            res.json(500).json(err);
        });
});

// get a single post
router.get("/:id", (req, res) => {
    post.findOne({
        attributes: ["id", "title", "post_input", "created_at"],
        where: {
            id: req.params.id
        },
        include: [{
            model: user,
            attributes: ["pseudonym"]
        },
        {
            model: comment,
            attributes: ["comment_input"],
            include: {
                model: user,
                attributes: ["pseudonym"]
            }
        }]
    })
    .then(postInfo => {
        if(!postInfo) {
        res.status(404).json({ message: "This post ID does not exist yet, please check input and try again" });
        return;
    }
    res.json(postInfo);
    })
    .catch(err => {
        console.log(err);
        res.json(500).json(err);
    });
});

// create a post
router.post("/", (req, res) => {
    post.create({
        title: req.body.title,
        user_id: req.body.user_id
    })
        .then(postInfo => res.json(postInfo))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
});

// update a post
router.put("/:id", (req, res) => {
    post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postInfo => {
            if(!postInfo) {
                res.status(404).json({ message: "This post ID does not exist yet, please check input and try again" });
                return;
            }
            res.json(postInfo);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});

router.delete("/:id", (req, res) => {
    post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postInfo => {
            if(!postInfo) {
                res.status(400).json({ message: "This post ID does not exist yet, please check input and try again" });
                return;
            }
            res.json(postInfo);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});


module.exports = router;