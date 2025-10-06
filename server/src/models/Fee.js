/**
 * Fee Model
 * 
 * Defines the schema for a fee, which is included in the Bill schema.
 * A Fee is an added cost that is shared by everyone on the Bill, such as delivery, service fees and tips.
 * 
 * Each fee has a name and an amount.
 */

import { Schema } from "mongoose";

const feeSchema = new Schema(
    {
        feeName: {
            type: String,
            required: true,
        },
        feeAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;