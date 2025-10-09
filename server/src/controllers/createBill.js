/**
 * createBill() Controller
 * 
 * Defines the logic for handling the POST request to create a new Bill.
 */

import Bill from "../models/Bill.js";

export const createBill = (req, res) => {
    try {
        // Get the Bill data.
        const { billName, billTaxRate } = req.body;

        // Create a Bill and try to save it to the database.
        const newBill = new Bill({
            billName,
            billTaxRate
        });
        newBill.save();

        // Success.
        res.status(201).json({
            "message": `${billName} bill created.`
        });

    } catch (error) {
        // Error handling.
        res.status(500).send("Internal Server Error");
        console.error('Error in createBill() controller: ', error.message);
    }
}