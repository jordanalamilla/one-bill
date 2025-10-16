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
         * For Bill updates.
         */
        if (
            req.body.billName !== undefined ||
            req.body.billTaxRate !== undefined ||
            req.body.billPaid !== undefined
        ) {

            // Get the front end request data.
            const { billName, billTaxRate, billPaid } = req.body;

            // Find the Bill and update the desired fields.
            await Bill.findByIdAndUpdate(
                req.params.id,
                {
                    billName,
                    billTaxRate,
                    billPaid
                },
                { new: true }

            ).then(updatedBill => {

                // Success response.
                res.status(200).json({
                    "message": `Bill updated.`,
                    "Bill": updatedBill
                });
            });
        }

        /**
         * For Order updates.
         */
        if (req.body.orderId !== undefined && req.body.itemId === undefined) {

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
                res.status(200).json({
                    "message": `Order updated.`,
                    "Bill": updatedBill
                });
            });
        }

        /**
         * For Item updates.
         */
        if (req.body.itemId !== undefined && req.body.orderId !== undefined) {

            // Get the front end request data.
            const { itemId, orderId, itemName, itemPrice, itemQuantity } = req.body;

            // Find the Bill, find the Order, find the Item and update the desired fields.
            await Bill.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        'billOrders.$[order].orderItems.$[item].itemName': itemName,
                        'billOrders.$[order].orderItems.$[item].itemPrice': itemPrice,
                        'billOrders.$[order].orderItems.$[item].itemQuantity': itemQuantity
                    }
                },
                {
                    arrayFilters: [{ 'order._id': orderId }, { 'item._id': itemId }],
                    new: true
                }

            ).then(updatedBill => {

                // Success response.
                res.status(200).json({
                    "message": `Item updated.`,
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
                res.status(200).json({
                    "message": `Fee updated.`,
                    "Bill": updatedBill
                });
            });
        }

        /**
         * For Discount updates.
         */
        if (req.body.discountId !== undefined) {

            // Get the front end request data.
            const { discountId, discountName, discountAmount } = req.body;

            // Find the Bill, find the Discount and update the desired fields.
            await Bill.updateOne(
                { _id: req.params.id, 'billDiscounts._id': discountId },
                {
                    $set: {
                        'billDiscounts.$.discountName': discountName,
                        'billDiscounts.$.discountAmount': discountAmount,
                    }
                },
                { new: true }

            ).then(updatedBill => {

                // Success response.
                res.status(200).json({
                    "message": `Discount updated.`,
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