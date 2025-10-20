/**
 * getAllBills() Controller
 * 
 * Defines the logic for handling the GET request to retreive all Bills.
 */

import Bill from "../models/Bill.js";

export async function getAllBills(req, res) {
    try {
        // Find all Bills and display them.
        const bills = await Bill.find().sort({ createdAt: -1 });
        res.status(200).json(bills);

    } catch (error) {
        // Error handling.
        res.status(500).send("Internal Server Error");
        console.error('Error in getAllBills() controller: ', error.message);
    }
}