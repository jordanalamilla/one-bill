/**
 * getBill() Controller
 * 
 * Defines the logic for handling the GET /:id request to retreive a single Bill.
 */

import Bill from "../models/Bill.js";

export async function getBill(req, res) {
    try {
        // Find and display the requested Bill.
        const requestedBill = await Bill.findById(req.params.id);
        res.status(200).json(requestedBill);

    } catch (error) {
        // Error handling.
        res.status(500).send("Bill not found.");
        console.error('Error in getAllBills() controller: ', error.message);
    }
}