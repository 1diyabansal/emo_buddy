const express = require("express");
const router = express.Router();

const { generateReply } = require("../services/openaiService");

router.post("/", async (req, res) => {

    try {
        const { message } = req.body;

        const reply = await generateReply(message);

        res.json({
            success: true,
            reply
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }

});

module.exports = router;