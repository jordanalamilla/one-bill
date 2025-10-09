/**
 * updateBill() Controller
 * 
 * Defines the logic for handling the PUT request to update an existing Bill.
 */

import Bill from "../models/Bill.js";

export async function updateBill(req, res) {

    // Get the Bill data from the client.
    const { billName, billTaxRate } = req.body;

    try {
        // Find the Bill by ID and update it with the new data.
        await Bill.findByIdAndUpdate(
            req.params.id,
            { billName, billTaxRate },
            { new: true }

        ).then(updatedBill => {
            res.status(200).json({ updatedBill });
        });

    } catch (error) {
        // Error handling.
        res.status(404).json({ message: "Bill not found." });
        console.error("Error caught in updateBill() controller: ", error);
    }
}