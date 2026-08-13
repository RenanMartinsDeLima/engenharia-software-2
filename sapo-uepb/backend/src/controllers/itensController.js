const { getItem, postItem, deleteItem } = require('../models/itensModel')

const get = async (req, res) => {
    try {
        const itens = await getItem()
        res.json(itens)
    } catch (error) {
        res.status(500)
    }
}

const post = async (req, res) => {
    try {
        const item = await postItem(req)
        res.json(item)
    } catch (error) {
        res.status(500)
    }
}

const remove = async (req, res) => {
    try {
        const item = await deleteItem(req)
        res.json(item)
    } catch (error) {
        res.status(500)
    }
}

module.exports = {
    get,
    post,
    remove
}