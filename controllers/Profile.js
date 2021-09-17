let express = require('express')
let router = express.Router()
const { User, Profile } = require('../models')
const validateJWT = require("../middleware/validate-jwt")


// create a profile 
router.post("/", validateJWT, async (req, res) => {
    let { fullName, bio, avatarUrl } = req.body.profile;

    try {
        let u = await User.findOne({ where: { id: req.user.id } })

        if (u) {
            let createProfile = await Profile.create({
                fullName,
                bio,
                avatarUrl,
            })
            await u.setProfile(createProfile)

            message = { message: "Post made!", profile: createProfile }
        }
        else {
            message = { message: "Can't make a post, user does not exist", data: null }
        }

    } catch (err) {
        console.log(err)
        message = { message: "Post Create Failed" }
    }
    res.json(message)
})


// get your profile 
router.get("/", validateJWT, async (req, res) => {
    let u = await User.findOne({ where: { id: req.user.id } })

    try {
        let userProfile = u ? await u.getProfile() : null
        res.status(200).json(userProfile)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// get user profile by username 
router.get("/:username", validateJWT, async (req, res) => {
    let u = await User.findOne({ where: {username: req.params.username} })
    
    try {
        let userProfile = u ? await u.getProfile() : null
        res.status(200).json(userProfile)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})
module.exports = router