const {Schema, model} = require('mongoose');
const PantryItemSchema = new Schema(
    {
        name: {type: String, required: true, index: true},
        qty: {type: Number, default: 1, min: 0},
        unit: {type: String},
        expire: {type: Date},
        notes: {type: String}
    },
    {timestamps: true}
);

module.exports = model('PantryItem', PantryItemSchema);
