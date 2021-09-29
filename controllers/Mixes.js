let express = require('express')
let router = express.Router()
const { User, Mixes } = require('../models')
const validateJWT = require("../middleware/validate-jwt")


// create a mix 
router.post("/", validateJWT, async (req, res) => {
    let { mixName, category, imageUrl, description } = req.body.mix;

    try {
        let u = await User.findOne({ where: { id: req.user.id } })

        if (u) {
            let mix = await Mixes.create({
                mixName,
                category,
                imageUrl,
                description,
            })
            await u.addMixes(mix)

            message = { mix }
        }
        else {
            message = { message: "Can't make a mix, user does not exist", data: null }
        }

    } catch (err) {
        console.log(err)
        message = { message: "Mix create failed." }
    }
    res.json(message)
})


// get all mixes
router.get("/all", validateJWT, async (req, res) => {
    try {
        mixes = await Mixes.findAll();
        res.status(200).json(mixes);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


// get my mixes 
router.get("/mine", validateJWT, async (req, res) => {
    let u = await User.findOne({ where: { id: req.user.id } })

    try {
        let myMixes = u ? await u.getMixes() : null
        res.status(200).json(myMixes)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})


// edit my mix
router.put("/edit/:mixId", validateJWT, async (req, res) => {
    let { mixName, category, imageUrl, description } = req.body.mix;
    let { id } = req.user;
    let mixId = req.params.mixId

    let query = {
        where: {
            UserId: id,
            id: mixId
        }
    };

    let updateMix = {
        mixName: mixName,
        category: category,
        imageUrl: imageUrl,
        description: description
    };
    try {
        await Mixes.update(updateMix, query);
        res.status(200).json({ message: "Mix updated", updatedMix: updateMix });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


// delete my mix
router.delete("/delete/:mixId", validateJWT, async (req, res) => {
    let { id } = req.user;
    let mixId = req.params.mixId

    try {
        let query = {
            where: {
                UserId: id,
                id: mixId
            }
        };

        await Mixes.destroy(query);
        res.status(200).json({ message: "Mix has been removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// get mixes by category
router.get("/:category", validateJWT, async (req, res) => {
    let category = req.params.category

    try {
        let query = {
            where: {
                category: category
            }
        };

        mixes = await Mixes.findAll(query);
        res.status(200).json(mixes);
    } catch (err) {
        res.status(500).json({ error: err });
    }

})



module.exports = router