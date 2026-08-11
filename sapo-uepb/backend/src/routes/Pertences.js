const abrirBanco = require("../services/abrir-banco");
const express = require("express");
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const db = await abrirBanco();
        const pertences = await db.all(`SELECT * FROM pertences;`);
        await db.close();
        res.status(200).json(pertences);
    } catch (error) {
        res.status(500).json({erro : error})
    }
    res.send({ data: "Item GETED" })
});

router.post("/", async (req, res) => {
    res.send({ data: "Item POSTED" })
});

router.put("/", async (req, res) => {
    res.send({ data: "Item PUTED" })
});

router.delete("/", async (req, res) => {
    res.send({ data: "Item DELETED" })
});

module.exports = router