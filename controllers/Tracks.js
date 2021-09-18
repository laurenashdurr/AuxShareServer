let express = require('express')
let router = express.Router()
const { User, Mixes, Tracks } = require('../models')
const validateJWT = require("../middleware/validate-jwt")

// add a track to a specific mix
router.post("/:mixId", validateJWT, async (req, res) => {
    let { title, artist, note } = req.body.track;

    try {
        let u = await Mixes.findOne({ where: { id: req.params.mixId } })

        if (u) {
            let track = await Tracks.create({
                title,
                artist,
                note,
            })
            await u.addTracks(track)

            message = { message: "Track Added!" }
        }
        else {
            message = { message: "Can't add track, mix does not exist", data: null }
        }

    } catch (err) {
        message = { message: "Track add failed." }
    }

    res.json(message)
})


// get all tracks in a mix
router.get("/:mixId", validateJWT, async (req, res) => {
    let mix = req.params.mixId

    try {
        let query = {
            where: {
                MixId: mix
            }
        };

        tracks = await Tracks.findAll(query);
        res.status(200).json(tracks);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


// edit a track
router.put("/:trackId", validateJWT, async (req, res) => {
    let { title, artist, note } = req.body.track;
    let trackId = req.params.trackId

    let query = {
        where: {
            id: trackId
        }
    };

    let updateTrack = {
        title: title,
        artist: artist,
        note: note
    };
    try {
        await Tracks.update(updateTrack, query);
        res.status(200).json({ message: "Track updated", updatedTrack: updateTrack });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


// delete a track
router.delete("/:trackId", validateJWT, async (req, res) => {
    let trackId = req.params.trackId

    let query = {
        where: {
            id: trackId
        }
    };

    try {
        await Tracks.destroy(query);
        res.status(200).json({ message: "Track deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router