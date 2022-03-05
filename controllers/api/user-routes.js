const router = require("express").Router();
const { user, post, comment } = require("../../models");


// get all users
router.get("/", (req, res) => {
    user.findAll({
        attributes: { exclude: ["password"] }
    })
        .then(userInfo => res.json(userInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// get a single user
router.get("/:id", (req, res) => {
    user.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id
        }
    })
        .then(userInfo => {
            if(!userInfo) {
                res.status(404).json({ message: "This user ID does not exist yet, please check input and try again" });
                return;
            }
            res.json(userInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create user/profile
router.post("/", (req, res) => {
    user.create({
        pseudonym: req.body.pseudonym,
        email: req.body.email,
        password: req.body.password
    })
        .then(userInfo => res.json(userInfo))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
})


module.exports = router;