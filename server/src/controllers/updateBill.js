/**
 * updateBill() Controller
 * 
 * Defines the logic for handling the PUT request to update an existing Bill.
 */

import Bill from "../models/Bill.js";

export async function updateBill(req, res) {
    const { billName } = req.body;

    try {

        /**
         * For Order updates.
         */
        if (req.body.orderId !== undefined) {

            // Get the front end request data.
            const { orderId, orderPersonName } = req.body;

            // Find the Bill, find the Order and update the desired fields.
            await Bill.updateOne(
                { _id: req.params.id, 'billOrders._id': orderId },
                {
                    $set: {
                        'billOrders.$.orderPersonName': orderPersonName
                    }
                },
                { new: true }

            ).then(updatedBill => {

                // Success response.
                res.status(201).json({
                    "message": `Order updated.`,
                    "Bill": updatedBill
                });
            });
        }

        /**
         * For Fee updates.
         */
        if (req.body.feeId !== undefined) {

            // Get the front end request data.
            const { feeId, feeName, feeAmount, feeIsTaxed } = req.body;

            // Find the Bill, find the Fee and update the desired fields.
            await Bill.updateOne(
                { _id: req.params.id, 'billFees._id': feeId },
                {
                    $set: {
                        'billFees.$.feeName': feeName,
                        'billFees.$.feeAmount': feeAmount,
                        'billFees.$.feeIsTaxed': feeIsTaxed
                    }
                },
                { new: true }

            ).then(updatedBill => {

                // Success response.
                res.status(201).json({
                    "message": `Fee updated.`,
                    "Bill": updatedBill
                });
            });
        }

    } catch (error) {
        // Error handling.
        res.status(404).json({ message: "Bill not found." });
        console.error("Error caught in updateBill() controller: ", error);
    }
}