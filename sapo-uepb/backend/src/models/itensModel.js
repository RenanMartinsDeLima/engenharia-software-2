const abrirBanco = require("../config/abrir-banco");
const express = require("express");
// const router = express.Router()

async function getItem () {
    try {
        const db = await abrirBanco();
        const pertences = await db.all(`SELECT * FROM itens;`);
        await db.close();
        return await pertences;
    } catch (error) {
    }
    // res.send({ data: "Item GETED" })
};

async function postItem (req) {
    try {
        const db = await abrirBanco();
        const { nome, descricao, local_encontrado, data_encontrada } = req.body;
        await db.run(`
        INSERT INTO itens (nome, descricao, local_encontrado, data_encontrada)
          VALUES (?, ?, ?, ?)
        `, [nome, descricao, local_encontrado, data_encontrada] );
        await db.close();
    } catch (error) {
    }
    // res.send({ data: "Item POSTED" })
};

// router.put("/", async (req, res) => {
//     res.send({ data: "Item PUTED" })
// });

async function deleteItem (req) {
    try {
        const db = await abrirBanco();
        const { id } = req.body;
        await db.run(`
          DELETE FROM itens 
          WHERE id = (
            SELECT id
            FROM itens
            ORDER BY id ASC
            LIMIT 1 OFFSET ?
          );
        `, [id] );
        await db.close();
        // res.status(202).json({ok : "item deletado"});
    } catch (error) {
        // res.status(500).json({erro : error})
    }
    // res.send({ data: "Item DELETED" })
};

module.exports = {
    getItem,
    postItem,
    deleteItem
}