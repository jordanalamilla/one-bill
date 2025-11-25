/**
 * Fee Model
 * 
 * Defines the schema for a fee, which is included in the Bill schema.
 * A Fee is an added cost that is shared by everyone on the Bill, such as delivery, service fees and tips.
 * 
 * Each fee has a name and an amount.
 */

import mongoose from "mongoose";
import { Schema } from "mongoose";

export const feeSchema = new Schema(
    {
        feeName: {
            type: String,
            required: [true, 'A fee name is required.'],
            minlength: [1, 'The fee name must be at least 1 character.'],
            trim: true,
        },
        feeAmount: {
            type: Number,
            required: [true, 'A fee amount is required.'],
        },
        feeIsTaxed: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;