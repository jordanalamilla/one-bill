/**
 * Discount model
 * 
 * Defines the schema for a Discount, which is included in the Bill schema.
 * A Discount is an amount or percentage to take off the bill, to be shared fairly by everyone on the Bill.
 * The amount discounted from individual orders is weighted based on each order subtotal.
 * 
 * Each Discount has a name and an amount.
 */

import { Schema } from "mongoose";

const discountSchema = new Schema(
    {
        discountName: {
            type: String,
            required: true,
        },
        discountAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Discount = mongoose.model('Discount', discountSchema);

export default Discount;