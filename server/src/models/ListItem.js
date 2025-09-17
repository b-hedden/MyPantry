const {Schema, model} = require('mongoose');

const ListItemSchema = new Schema(
    {
        name: {type: String, required: true, index: true},
        qty: {type: Number, default: 1, min: 0},
        unit: {type: String}, // should this have a default?
        notes: {type: String},
        checked: {type: Boolean, default: false} // for merging item into pantry
    },
    {timestamps: true}
);

module.exports = model('ListItem', ListItemSchema);
