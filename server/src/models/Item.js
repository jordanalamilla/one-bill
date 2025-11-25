/**
 * Item model
 *
 * Defines the schema for an Item, which is included in the Order schema.
 * An Item is a single product included in an Order.
 * 
 * Each Item has a name, a quantity and a subtotal.
 */

import mongoose from "mongoose";
import { Schema } from "mongoose";

export const itemSchema = new Schema(
    {
        itemName: {
            type: String,
            required: [true, 'An item name is required.'],
            minLength: [1, 'The item name must be at least 1 character.'],
            trim: true,
        },
        itemPrice: {
            type: Number,
            required: [true, 'Item price is required.'],
        },
        itemQuantity: {
            type: Number,
            required: [true, 'Item quantity is required.'],
            min: [1, 'Quantity must be at least 1.'],
            default: 1,
        },
        itemSubTotal: {
            type: Number,
            required: true,
            default: function () {
                return this.itemPrice * this.itemQuantity;
            }
        }
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;