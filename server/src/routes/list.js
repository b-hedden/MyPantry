const express = require('express');
const ListItem = require('../models/ListItem');
const router = express.Router();

router.get('/', async (req, res) => {
    const items = (await ListItem.find()).sort({createdAt: -1});
    res.json(items);
})

// CREATE list item
router.post('/', async (req, res) => {
    try {
        const {name, qty = 1, unit, notes} = req.body;
        if (!name) return res.status(400).json({error: 'name is required'});
        //TODO: add merge by name
        const item = await ListItem.create({name, qty, unit, notes});
        res.status(201).json(item);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

// UPDATE list item
router.patch('/:id', async (req, res) => {
    try {
        const item = await ListItem.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!item) return res.status(404).json({error: 'item not found'});
        res.json(item);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

// DELETE list item
router.delete('/:id', async (req, res) => {
    try {
        const item = await ListItem.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({error: 'item not found'});
        res.json({ok: true})
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = router;
