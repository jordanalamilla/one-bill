/**
 * Bill Updates
 * 
 * Contains all functions for recalculating all automatically set Bill totals.
 */

import Bill from "../../models/Bill.js"
import { calculateTaxTotal, calculateFeesTotal, calculateFeesTotalWithTax, calculateBillTotal } from "../utilities/billCalculations.js";

export async function recalculateEntireBill(billId) {
    await Bill.findById(billId).then(bill => {

        // Shared costs.
        let feesTotalWithTax = 0;
        let totalDiscount = 0;
        let billOrdersSubTotal = 0;

        // Shared fee recalculations.
        bill.billFees.forEach(fee => {
            if (fee.feeIsTaxed) {
                feesTotalWithTax += fee.feeAmount + (fee.feeAmount * bill.billTaxRate);
            } else {
                feesTotalWithTax += fee.feeAmount;
            }
        });

        // Order recalculations.
        bill.billOrders.forEach(order => {
            let orderSubTotal = 0;

            // Item recalculations.
            order.orderItems.forEach(item => {
                const itemSubTotal = item.itemPrice * item.itemQuantity;
                orderSubTotal += itemSubTotal;

                // Set the new Item sub total.
                item.itemSubTotal = itemSubTotal;
            });

            billOrdersSubTotal += orderSubTotal;

            // Set the new Order sub total.
            order.orderSubTotal = orderSubTotal;
        });

        // Discount recalculations
        bill.billDiscounts.forEach(discount => {
            if (discount.discountAmount < 1) {
                totalDiscount += billOrdersSubTotal * discount.discountAmount;
            } else {
                totalDiscount += discount.discountAmount;
            }
        });

        // Recalculate top level Bill amounts and set them.
        bill.billOrdersSubTotal = billOrdersSubTotal;
        bill.billTaxTotal = calculateTaxTotal(bill.billTaxRate, billOrdersSubTotal, bill.billFees);
        bill.billFeesTotal = calculateFeesTotal(bill.billFees);
        bill.billDiscountsTotal = totalDiscount;
        bill.billTotal = calculateBillTotal(bill.billOrders, bill.billFees, bill.billDiscounts, bill.billTaxRate);

        // Order Owe recalculation.
        bill.billOrders.forEach(order => {

            // Recalculate order tax total, share of fees, share of discounts and recalculate how much is owed.
            const orderTaxTotal = calculateTaxTotal(bill.billTaxRate, order.orderSubTotal);
            const orderFeesTotal = Math.round((calculateFeesTotalWithTax(bill.billFees, bill.billTaxRate) * order.orderWeight) * 100) / 100;
            const orderDiscountTotal = Math.round((totalDiscount * order.orderWeight) * 100) / 100;
            const orderOwe = Math.round((order.orderSubTotal + orderTaxTotal + orderFeesTotal - orderDiscountTotal) * 100) / 100;

            // Set the amount owed.
            order.orderOwe = orderOwe;
        });

        // Save all recalculations.
        bill.save();
    });
}