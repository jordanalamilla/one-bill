// GET
export const getAllBills = (req, res) => {
    res.status(200).send("This is the api page. Made by jord.");
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