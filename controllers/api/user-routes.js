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
        },
        include: [
            {
                model: post,
                attributes: ["title"]
            },
        ]
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
        })
});

// create user/profile
router.post("/", (req, res) => {
    user.create({
        pseudonym: req.body.pseudonym,
        email: req.body.email,
        password: req.body.password
    })
        .then(userInfo => {
            req.session.save(() => {
                req.session.user_id = userInfo.id;
                req.session.pseudonym = userInfo.pseudonym;
                req.session.signedIn = true;

                res.json(userInfo);
            })})    
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
})

// user login route
router.post("/sign-in", (req, res) => {
    user.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(userInfo => {
            if(!userInfo) {
                res.status(400).json({ message: "No user was found with that email address, please check input and try again" });
                return;
            }
            const validatePW = userInfo.passwordAuth(req.body.password);
            if(!validatePW) {
                res.status(400).json({ message: "Invalid Password, please try again" });
                return;
            }
            req.session.save(() => {
                req.session.user_id = userInfo.id;
                req.session.pseudonym = userInfo.pseudonym;
                req.session.signedIn = true;
                res.json({ user: userInfo, message: "You have successfully logged in!" });
            });
        });
});

// user logout route
router.post("/sign-in", (req, res) => {
    console.log(req.session.signedIn);
    if(req.session.signedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});


module.exports = router;