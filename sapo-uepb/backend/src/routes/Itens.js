const abrirBanco = require("../services/abrir-banco");
const express = require("express");
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const db = await abrirBanco();
        const pertences = await db.all(`SELECT * FROM itens;`);
        await db.close();
        res.status(200).json(pertences);
    } catch (error) {
        res.status(500).json({erro : error})
    }
    res.send({ data: "Item GETED" })
});

router.post("/", async (req, res) => {
    try {
        const db = await abrirBanco();
        const { nome, descricao, local_encontrado } = req.body;
        await db.run(`
          INSERT INTO itens (nome, descricao, local_encontrado)
          VALUES (?, ?, ?)
        `, [nome, descricao, local_encontrado] );
        await db.close();
        res.status(201).json({ok : "item postado"});
    } catch (error) {
        res.status(500).json({erro : error})
    }
    res.send({ data: "Item POSTED" })
});

router.put("/", async (req, res) => {
    res.send({ data: "Item PUTED" })
});

router.delete("/", async (req, res) => {
    try {
        const db = await abrirBanco();
        const { id } = req.body;
        await db.run(`
          DELETE FROM itens WHERE id = ?;
        `, [id] );
        await db.close();
        res.status(202).json({ok : "item deletado"});
    } catch (error) {
        res.status(500).json({erro : error})
    }
    res.send({ data: "Item DELETED" })
});

module.exports = router