const abrirBanco = require("../services/abrir-banco");
const express = require("express");
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const db = await abrirBanco();
        const usuarios = await db.all(`SELECT * FROM usuarios;`);
        await db.close();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({erro : error})
    }
    res.send({ data: "User GETED" })
});

router.post("/", async (req, res) => {
    try {
        const db = await abrirBanco();
        const { u_nome, u_email, u_perfil } = req.body;
        await db.run(`
          INSERT INTO usuarios (nome, email_institucional, perfil)
          VALUES (?, ?, ?)
        `, [u_nome, u_email, u_perfil] );
        await db.close();
        res.status(201).json({ok : "usuario criado"});
    } catch (error) {
        res.status(500).json({erro : error})
    }
    res.send({ data: "User POSTED" })
});

router.put("/", async (req, res) => {
    res.send({ data: "User PUTED" })
});

router.delete("/", async (req, res) => {
    res.send({ data: "User DELETED" })
});

module.exports = router