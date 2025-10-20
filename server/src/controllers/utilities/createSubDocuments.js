/**
 * Create Sub Documents
 * 
 * Contains all functions for creating MongoDB sub documents for Bill creation from request data.
 */

import Order from "../../models/Order.js";
import Item from "../../models/Item.js";
import Fee from "../../models/Fee.js";
import Discount from "../../models/Discount.js";

/**
 * Create Fee
 * 
 * Create a Fee document from the request data.
 * 
 * @param {Object} fee 
 * @returns Object
 */
export function createFee(fee) {
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
export function createDiscount(discount) {
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
export function createOrder(order) {
    const orderPersonName = order.orderPersonName;
    const orderItems = [];

    // For each Item in the order ...
    order.orderItems.forEach(item => {
        const { itemName, itemPrice, itemQuantity } = item;

        // ... create an Item ...
        const newItem = new Item({
            itemName,
            itemPrice,
            itemQuantity
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