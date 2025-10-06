/**
 * Item model
 *
 * Defines the schema for an Item, which is included in the Order schema.
 * An Item is a single product included in an Order.
 * 
 * Each Item has a name, a quantity and a subtotal.
 */

import { Schema } from "mongoose";

const itemSchema = new Schema(
    {
        itemName: {
            type: String,
            required: true,
        },
        itemQuantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
        itemSubTotal: Number,
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;