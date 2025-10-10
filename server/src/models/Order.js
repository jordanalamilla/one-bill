/**
 * Order model
 * 
 * Defines the schema for an Order, which is included in the Bill schema.
 * An Order is a collection of Items that a single person is responsible for on a Bill.
 * 
 * Each Order has a person name, an array of items, and a subtotal.
 */

import mongoose from "mongoose";
import { Schema } from "mongoose";
import { itemSchema } from "./Item.js";

export const orderSchema = new Schema(
    {
        orderPersonName: String,
        orderItems: [itemSchema],
        orderSubTotal: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;