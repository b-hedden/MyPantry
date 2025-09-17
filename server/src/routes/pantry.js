const express = require('express');
const PantryItem = require('../models/PantryItem');
const router = express.Router();

router.get('/', async (req, res) => {
    const items = (await PantryItem.find()).sort({createdAt: -1});
    res.json(items);
});

// CREATE pantry item
router.post('/', async (req, res) => {
    try {
        const {name, qty = 1, unit, expire, notes} = req.body;
        if (!name) return res.status(400).json({error: 'name is required'});
        const item = await PantryItem.create({name, qty, unit, expire, notes});
        res.status(201).json(item);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

// UPDATE pantry item
router.patch('/:id', async (req, res) => {
    try {
        const item = await PantryItem.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!item) return res.status(404).json({error: 'item not found'});
        res.json(item);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

// DELETE pantry item
router.delete('/:id', async (req, res) => {
    try {
        const item = await PantryItem.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({error: 'item not found'});
        res.json({ok: true});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = router;