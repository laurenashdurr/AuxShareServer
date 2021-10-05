let express = require('express')
let router = express.Router()
const { User } = require('../models')
const { UniqueConstraintError } = require("sequelize/lib/errors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


router.post("/register", async (req, res) => {
    let { username, password } = req.body.user;

    try {
        const user = await User.create({
            username,
            password: bcrypt.hashSync(password, 13),
            role: 'basic'
        })

        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.status(201).json({
            message: "User successfully registered",
            user: user,
            sessionToken: token
        })

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(400).json({
                message: "Username already in use"
            });
        } else {
            res.status(500).json({
                message: "Failed to register user"
            })
        }
    }

})

router.post("/admin/register", async (req, res) => {
    let { username, password } = req.body.user;

    try {
        const user = await User.create({
            username,
            password: bcrypt.hashSync(password, 13),
            role: 'admin'
        })

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.status(201).json({
            message: "User successfully registered",
            user: user,
            sessionToken: token
        })

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(400).json({
                message: "Username already in use"
            });
        } else {
            res.status(500).json({
                message: "Failed to register user"
            })
        }
    }

})

router.post("/login", async (req, res) => {
    let { username, password } = req.body.user;

    try {
        const loginUser = await User.findOne({
            where: {
                username
            }
        })

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {

                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

                res.status(200).json({
                    user: username,
                    message: "User successfully logged in",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }

        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
})


module.exports = router
