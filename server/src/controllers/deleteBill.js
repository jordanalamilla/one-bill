/**
 * deleteBill() Controller
 * 
 * Defines the logic for handling the DELETE request to delete a Bill.
 */

import Bill from "../models/Bill.js";

export async function deleteBill(req, res) {
    // Find the Bill by ID and delete it.
    await Bill.deleteOne({ _id: req.params.id }).then((deletedBill) => {
        if (!deletedBill.deletedCount) {
            res.status(404).json({
                error: 'Bill not found.'
            });

        } else {
            res.status(200).send({
                message: "Bill deleted",
            });
        }
    }).catch(error => {
        res.status(500).json({
            error: error.message
        });
    });
}