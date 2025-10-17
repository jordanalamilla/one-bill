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
                item.itemSubTotal = Math.round((itemSubTotal) * 100) / 100;
            });

            billOrdersSubTotal += orderSubTotal;

            // Set the new Order sub total.
            order.orderSubTotal = Math.round((orderSubTotal) * 100) / 100;
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
        bill.billOrdersSubTotal = Math.round((billOrdersSubTotal) * 100) / 100;
        bill.billTaxTotal = Math.round((calculateTaxTotal(bill.billTaxRate, billOrdersSubTotal, bill.billFees)) * 100) / 100;
        bill.billFeesTotal = Math.round((calculateFeesTotal(bill.billFees)) * 100) / 100;
        bill.billDiscountsTotal = Math.round((totalDiscount) * 100) / 100;
        bill.billTotal = Math.round((calculateBillTotal(bill.billOrders, bill.billFees, bill.billDiscounts, bill.billTaxRate)) * 100) / 100;

        // Order Owe recalculation.
        bill.billOrders.forEach(order => {

            // Recalculate order tax total, share of fees, share of discounts and recalculate how much is owed.
            const orderTaxTotal = calculateTaxTotal(bill.billTaxRate, order.orderSubTotal);
            const orderFeesTotal = calculateFeesTotalWithTax(bill.billFees, bill.billTaxRate) * order.orderWeight;
            const orderDiscountTotal = totalDiscount * order.orderWeight;
            const orderOwe = order.orderSubTotal + orderTaxTotal + orderFeesTotal - orderDiscountTotal;

            // Set the amount owed.
            order.orderOwe = Math.round((orderOwe) * 100) / 100;
        });

        // Save all recalculations.
        bill.save();
    });
}