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
    res.status(201).json({
        "message": "Bill created."
    });
}

// PUT
export const updateBill = (req, res) => {
    res.status(200).json({
        "message": "Bill updated."
    });
}

// DELETE
export const deleteBill = (req, res) => {
    res.status(200).json({
        "message": "Bill deleted."
    });
}