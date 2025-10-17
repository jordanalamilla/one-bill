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
            required: true,
        },
        itemPrice: {
            type: Number,
            required: true,
        },
        itemQuantity: {
            type: Number,
            required: true,
            min: 1,
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