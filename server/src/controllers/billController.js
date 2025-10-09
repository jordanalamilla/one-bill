import mongoose from "mongoose";
import Bill from "../models/Bill.js";

// GET
export async function getAllBills(req, res) {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);

    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error('Error in getAllBills() controller: ', error.message);
    }
}

// POST
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

// PUT
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

// DELETE
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