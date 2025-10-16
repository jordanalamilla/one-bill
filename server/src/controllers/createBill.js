/**
 * createBill() Controller
 * 
 * Defines the logic for handling the POST request to create a new Bill.
 */

import Bill from "../models/Bill.js";
import Order from "../models/Order.js";
import Item from "../models/Item.js";
import Fee from "../models/Fee.js";
import Discount from "../models/Discount.js";
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
            billOrdersSubTotal: calculateOrdersTotal(orders),
            billTaxTotal: calculateTaxTotal(billTaxRate, calculateOrdersTotal(orders), fees),
            billFeesTotal: calculateFeesTotal(fees),
            billDiscountsTotal: calculateDiscountsTotal(discounts, calculateOrdersTotal(orders)),
            billTotal: calculateBillTotal(orders, fees, discounts, billTaxRate),
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
 * Create Fee
 * 
 * Create a Fee document from the request data.
 * 
 * @param {Object} fee 
 * @returns Object
 */
function createFee(fee) {
    const { feeName, feeAmount, feeIsTaxed } = fee;

    const newFee = new Fee({
        feeName,
        feeAmount,
        feeIsTaxed
    });

    return newFee;
}

/**
 * Create Discount
 * 
 * Create a Discount document from the request data.
 * 
 * @param {Object} discount 
 * @returns Object
 */
function createDiscount(discount) {
    const { discountName, discountAmount } = discount;

    const newDiscount = new Discount({
        discountName,
        discountAmount
    });

    return newDiscount;
}

/**
 * Create Order
 * 
 * Create an Order document from the request data, including creating each Item subdocument in the Order.
 * 
 * @param {Object} order 
 * @returns Object
 */
function createOrder(order) {
    const orderPersonName = order.orderPersonName;
    const orderItems = [];

    // For each Item in the order ...
    order.orderItems.forEach(item => {
        const { itemName, itemPrice, itemQuantity } = item;

        // ... create an Item ...
        const newItem = new Item({
            itemName,
            itemPrice,
            itemQuantity,
            itemSubTotal: itemPrice * itemQuantity
        });

        // ... and add it to the orderItems array.
        orderItems.push(newItem);
    });

    // Create the Order, add the Items and return it.
    const newOrder = new Order({
        orderPersonName,
        orderItems,
        orderSubTotal: orderItems.reduce((total, item) => total + item.itemSubTotal, 0)
    });

    return newOrder;
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