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

            message = { message: "Profile Created!", profile: createProfile }
        }
        else {
            message = { message: "Can't make a profile, user does not exist", data: null }
        }

    } catch (err) {
        console.log(err)
        message = { message: "Profile create failed." }
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

// edit your profile 
router.put("/edit", validateJWT, async (req, res) => {
    let { fullName, bio, avatarUrl } = req.body.profile;
    let { id } = req.user;

    let query = {
        where: {
            UserId: id,
        }
    };

    let updateProfile = {
        fullName: fullName,
        bio: bio,
        avatarUrl: avatarUrl
    };
    try {
        await Profile.update(updateProfile, query);
        res.status(200).json({message: "user profile updated", updatedProfile: updateProfile});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// delete your profile 
router.delete("/delete", validateJWT, async (req, res) => {
    let { id } = req.user;

    try {
        let query = {
            where: {
                UserId: id,
            }
        };
        
        await Profile.destroy(query);   
        res.status(200).json({ message: "Profile Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


// get profile by username 
router.get("/:username", validateJWT, async (req, res) => {
    let u = await User.findOne({ where: { username: req.params.username } })

    try {
        let userProfile = u ? await u.getProfile() : null
        res.status(200).json(userProfile)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})
module.exports = router