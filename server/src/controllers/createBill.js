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

export const createBill = (req, res) => {
    try {
        const { billName, billTaxRate, billPaid } = req.body;
        let orders = [];
        let fees = [];
        let discounts = [];

        // Create Orders for each Order in the request and add them to the orders array.
        req.body.billOrders.forEach(order => {
            orders.push(addOrder(order));
        });

        // Create Fees for each Fee in the request and add them to the fees array.
        req.body.billFees.forEach(fee => {
            fees.push(addFee(fee));
        });

        // Create Discounts for each Discount in the request and add them to the discounts array.
        req.body.billDiscounts.forEach(discount => {
            discounts.push(addDiscount(discount));
        });

        // Create a Bill and try to save it to the database.
        const newBill = new Bill({
            billName,
            billTaxRate,
            billOrders: orders,
            billFees: fees,
            billDiscounts: discounts,
            billOrdersCount: orders.length,
            billOrdersSubTotal: calculateOrdersTotal(orders),
            billTaxTotal: calculateTaxTotal(billTaxRate, calculateOrdersTotal(orders)),
            billFeesTotal: calculateFeesTotal(fees),
            billDiscountsTotal: calculateDiscountsTotal(discounts, calculateOrdersTotal(orders)),
            billTotal: calculateBillTotal(orders, fees, discounts, billTaxRate),
            billPaid,
        });

        // newBill.save();

        newBill.billOrders.forEach(order => {
            youOweMe(order, newBill);
        });

        // // Success.
        // res.status(201).json({
        //     "message": `${billName} bill created.`
        // });

        res.status(201).json({ newBill });

    } catch (error) {
        // Error handling.
        res.status(500).send("Internal Server Error");
        console.error('Error in createBill() controller: ', error.message);
    }
}

/**
 * You Owe Me
 * 
 * Calculate how much an Order owes based on the subtotal, the tax rate, share of fees and weighted discounts
 * then set the orderWeight and orderOwe fields in the Order document.
 * 
 * @param {Object} order 
 * @param {Object} bill 
 */
function youOweMe(order, bill) {
    const { orderSubTotal } = order;
    const { billTaxRate, billOrdersCount, billFeesTotal, billDiscountsTotal } = bill;

    const orderTaxTotal = calculateTaxTotal(billTaxRate, orderSubTotal);
    const orderFeesTotal = Math.round((billFeesTotal / billOrdersCount) * 100) / 100;
    const orderWeight = orderSubTotal / bill.billOrdersSubTotal;
    const orderDiscountTotal = Math.round((billDiscountsTotal * orderWeight) * 100) / 100;
    const orderOwe = Math.round((orderSubTotal + orderTaxTotal + orderFeesTotal - orderDiscountTotal) * 100) / 100;

    order.orderWeight = orderWeight;
    order.orderOwe = orderOwe;
}

/**
 * Calculate Bill Total
 * 
 * Add the totals for orders, fees and taxes and subtract the total for discounts to get the total amount for a Bill.
 * 
 * @param {Array} orders 
 * @param {Array} fees 
 * @param {Array} discounts 
 * @param {Number} taxRate 
 * @returns Number
 */
function calculateBillTotal(orders, fees, discounts, taxRate) {
    const ordersTotal = calculateOrdersTotal(orders);
    const taxTotal = calculateTaxTotal(taxRate, ordersTotal);
    const feesTotal = calculateFeesTotal(fees);
    const discountsTotal = calculateDiscountsTotal(discounts, ordersTotal);

    return Math.round((ordersTotal - discountsTotal + feesTotal + taxTotal) * 100) / 100;
}

/**
 * Calculate Tax Total
 * 
 * Multiply the tax rate by the orders total to get the tax total for a Bill or an Order.
 * 
 * @param {Number} taxRate 
 * @param {Number} ordersTotal
 * @returns Number
 */
function calculateTaxTotal(taxRate, total) {
    return Math.round((total * taxRate) * 100) / 100;
}

/**
 * Calculate Fees Total
 * 
 * Add the amounts for each Fee to get the total fees for a Bill.
 * 
 * @param {Array} fees 
 * @returns Number
 */
function calculateFeesTotal(fees) {
    return fees.reduce((total, fee) => total + fee.feeAmount, 0);
}

/**
 * Calculate Orders Total
 * 
 * Add the subtotals for each Order in a Bill to get the subtotal for a Bill.
 * 
 * @param {Array} orders 
 * @returns Number
 */
function calculateOrdersTotal(orders) {
    return orders.reduce((total, order) => total + order.orderSubTotal, 0)
}

/**
 * Calculate Discounts Total
 * 
 * Add the amounts for each Discount to get the total discount for a Bill.
 * If a discount amount is less than 1, treat it as a percentage.
 * 
 * @param {Array} discounts 
 * @param {Number} ordersTotal 
 * @returns Number
 */
function calculateDiscountsTotal(discounts, ordersTotal) {
    let totalDiscount = 0;

    discounts.forEach(discount => {
        if (discount.discountAmount < 1) {
            totalDiscount += ordersTotal * discount.discountAmount;
        } else {
            totalDiscount += discount.discountAmount;
        }
    });

    return Math.round(totalDiscount * 100) / 100;
}

/**
 * Add Order
 * 
 * Create an Order document from the request data, including creating each Item subdocument in the Order.
 * 
 * @param {Object} order 
 * @returns Object
 */
function addOrder(order) {
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
 * Add Fee
 * 
 * Create a Fee document from the request data.
 * 
 * @param {Object} fee 
 * @returns Object
 */
function addFee(fee) {
    const { feeName, feeAmount } = fee;

    const newFee = new Fee({
        feeName,
        feeAmount
    });

    return newFee;
}

/**
 * Add Discount
 * 
 * Create a Discount document from the request data.
 * 
 * @param {Object} discount 
 * @returns Object
 */
function addDiscount(discount) {
    const { discountName, discountAmount } = discount;

    const newDiscount = new Discount({
        discountName,
        discountAmount
    });

    return newDiscount;
}

/** Example Bill + 

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