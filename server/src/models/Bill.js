/**
 * Bill model
 * 
 * Defines the schema for a Bill, which includes the Order and Fee schemas.
 * A Bill is the parent object that contains all Orders, Fees and Discounts.
 * 
 * Each Bill has a name, tax rate, array of Orders, array of Fees, array of Discounts, total amount, and paid status.
 */

import mongoose from "mongoose";
import { Schema } from "mongoose";
import { orderSchema } from "./Order.js";
import { feeSchema } from "./Fee.js";
import { discountSchema } from "./Discount.js";

export const billSchema = new Schema(
    {
        billName: {
            type: String,
            required: true,
        },
        billTaxRate: {
            type: Number,
            required: true,
        },
        billOrders: [orderSchema],
        billFees: [feeSchema],
        billDiscounts: [discountSchema],
        billPaid: {
            type: Boolean,
            default: false
        },
        billTotal: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Bill = mongoose.model('Bill', billSchema);

export default Bill;