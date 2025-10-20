/**
 * Create Bill
 * 
 * Defines the logic for handling the POST request to create a new Bill.
 */

import Bill from "../models/Bill.js";
import { createFee, createDiscount, createOrder } from "./utilities/createSubDocuments.js";
import { calculateOrdersTotal, calculateTaxTotal, calculateFeesTotal, calculateDiscountsTotal, calculateBillTotal, calculateOrderOwe } from "./utilities/billCalculations.js";

export const createBill = (req, res) => {
    try {
        const { billName, billTaxRate, billPaid } = req.body;
        let orders = [];
        let fees = [];
        let discounts = [];

        // Create Orders for each Order in the request and add them to the orders array.
        req.body.billOrders.forEach(order => {
            orders.push(createOrder(order));
        });

        // Create Fees for each Fee in the request and add them to the fees array.
        req.body.billFees.forEach(fee => {
            fees.push(createFee(fee));
        });

        // Create Discounts for each Discount in the request and add them to the discounts array.
        req.body.billDiscounts.forEach(discount => {
            discounts.push(createDiscount(discount));
        });

        // Assemble the Bill.
        const newBill = new Bill({
            billName,
            billTaxRate,
            billOrders: orders,
            billFees: fees,
            billDiscounts: discounts,
            billOrdersCount: orders.length,
            billOrdersSubTotal: Math.round((calculateOrdersTotal(orders)) * 100) / 100,
            billTaxTotal: Math.round((calculateTaxTotal(billTaxRate, calculateOrdersTotal(orders), fees)) * 100) / 100,
            billFeesTotal: Math.round((calculateFeesTotal(fees)) * 100) / 100,
            billDiscountsTotal: Math.round((calculateDiscountsTotal(discounts, calculateOrdersTotal(orders))) * 100) / 100,
            billTotal: Math.round((calculateBillTotal(orders, fees, discounts, billTaxRate)) * 100) / 100,
            billPaid,
        });

        // Calculate what everyone owes.
        newBill.billOrders.forEach(order => {
            calculateOrderOwe(order, newBill, fees);
        });

        // Save the Bill to the database.
        newBill.save();

        // Success.
        res.status(201).json({
            "message": `${billName} bill created.`,
            "Bill": newBill
        });

    } catch (error) {
        // Error handling.
        res.status(500).send("Internal Server Error");
        console.error('Error in createBill() controller: ', error);
    }
}

/** 
 * skip doesnt tax service fee
 * uber taxes delivery fee, service fee, NOT tip
 * 
 * Example Bill + 

{
    "billName": "Taka Sushi",
    "billTaxRate": 0.13,
    "billOrders": [
        {
            "orderPersonName": "Jordan",
            "orderItems": [
                {
                    "itemName": "Salmon roll",
                    "itemPrice": 6.95,
                    "itemQuantity": 1
                },
                {
                    "itemName": "Spicy salmon roll",
                    "itemPrice": 6.95,
                    "itemQuantity": 1
                },
                {
                    "itemName": "Spicy salmon hand roll",
                    "itemPrice": 4.95,
                    "itemQuantity": 2
                }
            ]
        },
        {
            "orderPersonName": "Velle",
            "orderItems": [
                {
                    "itemName": "Spicy tuna roll",
                    "itemPrice": 6.95,
                    "itemQuantity": 1
                },
                {
                    "itemName": "Eel sushi",
                    "itemPrice": 4.50,
                    "itemQuantity": 1
                }
            ]
        },
        {
            "orderPersonName": "Sabrina",
            "orderItems": [
                {
                    "itemName": "Yummy roll",
                    "itemPrice": 13.95,
                    "itemQuantity": 1
                },
                {
                    "itemName": "Salmon dragon roll",
                    "itemPrice": 15.95,
                    "itemQuantity": 1
                }
            ]
        }
    ],
    "billFees": [
        {
            "feeName": "Service fee",
            "feeAmount": 4
        },
        {
            "feeName": "Delivery fee",
            "feeAmount": 0.99
        },
        {
            "feeName": "Tip",
            "feeAmount": 3
        }
    ],
    "billDiscounts": [
        {
            "discountName": "Promotion",
            "discountAmount": 20
        }
    ],
    "billPaid": false
}

*/