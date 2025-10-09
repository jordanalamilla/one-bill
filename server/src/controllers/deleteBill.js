/**
 * deleteBill() Controller
 * 
 * Defines the logic for handling the DELETE request to delete a Bill.
 */

import Bill from "../models/Bill.js";

export async function deleteBill(req, res) {
    try {
        // Find the Bill by ID and delete it.
        await Bill.findByIdAndDelete(req.params.id).then(deletedBill => {
            res.status(200).json({ deletedBill });
        });

    } catch (error) {
        // Error handling.
        res.status(404).json({ message: "Bill not found." });
        console.error("Error caught in updateBill() controller: ", error);
    }
}