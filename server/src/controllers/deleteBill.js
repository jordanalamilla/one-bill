/**
 * deleteBill() Controller
 * 
 * Defines the logic for handling the DELETE request to delete a Bill.
 */

import Bill from "../models/Bill.js";
import {displayError} from "./utilities/errors.js";

export async function deleteBill(req, res) {
    // Find the Bill by ID and delete it.
    await Bill.deleteOne({ _id: req.params.id }).then((deletedBill) => {
        if (!deletedBill.deletedCount) {
            res.status(404).json({
                message: 'Bill not found'
            });

        } else {
            res.status(200).json({
                message: "Bill deleted",
            });
        }
    }).catch(error => {
        displayError(res, error, "deleteBill");
    });
}