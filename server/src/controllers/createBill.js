/**
 * createBill() Controller
 * 
 * Defines the logic for handling the POST request to create a new Bill.
 */

import Bill from "../models/Bill.js";
import Order from "../models/Order.js";
import Item from "../models/Item.js";

export const createBill = (req, res) => {
    try {
        let orders = [];

        // Create Order documents for each Order in the request and add them to the orders array.
        req.body.billOrders.forEach(order => {

            orders.push(createOrder(order));
        });

        console.log(orders);




        // Get the Bill data.
        const { billName, billTaxRate, billPaid } = req.body;

        res.send(req.body.billOrders);

        // // Create a Bill and try to save it to the database.
        // const newBill = new Bill({
        //     billName,
        //     billTaxRate,
        //     billOrders: ["TODO: Create an Order document"],
        //     billFees: ["TODO: Create a Fee document"],
        //     billDiscounts: ["TODO: Create a Discount document"],
        //     billPaid,
        //     billTotal: 0 // TODO: Calculate the total
        // });
        // newBill.save();

        // // Success.
        // res.status(201).json({
        //     "message": `${billName} bill created.`
        // });

    } catch (error) {
        // Error handling.
        res.status(500).send("Internal Server Error");
        console.error('Error in createBill() controller: ', error.message);
    }
}

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

    // Create the Order and return it.
    const newOrder = new Order({
        orderPersonName,
        orderItems,
        orderSubTotal: orderItems.reduce((total, item) => total + item.itemSubTotal, 0)
    });

    return newOrder;
}

/**
 * Example Bill


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
    "billPaid": true
}

*/