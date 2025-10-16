/**
 * Calculate Order Owe
 * 
 * Calculate how much an Order owes based on the subtotal, the tax rate and share of weighted fees and discounts
 * then set the orderWeight and orderOwe fields in the Order document.
 * 
 * @param {Object} order 
 * @param {Object} bill 
 */
export function calculateOrderOwe(order, bill) {
    const { orderSubTotal } = order;
    const { billTaxRate, billDiscountsTotal } = bill;

    const orderTaxTotal = calculateTaxTotal(billTaxRate, orderSubTotal);
    const orderWeight = orderSubTotal / bill.billOrdersSubTotal;
    const orderFeesTotal = Math.round((calculateFeesTotalWithTax(bill.billFees, billTaxRate) * orderWeight) * 100) / 100;
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
export function calculateBillTotal(orders, fees, discounts, taxRate) {
    const ordersTotal = calculateOrdersTotal(orders);
    const feesTotal = calculateFeesTotal(fees);
    const discountsTotal = calculateDiscountsTotal(discounts, ordersTotal);
    const taxTotal = calculateTaxTotal(taxRate, ordersTotal, fees);

    return Math.round((ordersTotal - discountsTotal + feesTotal + taxTotal) * 100) / 100;
}

/**
 * Calculate Bill Tax Total
 * 
 * Multiply the tax rate by the orders total to get the tax total for a Bill or an Order.
 * 
 * @param {Number} taxRate 
 * @param {Number} ordersTotal
 * @returns Number
 */
export function calculateTaxTotal(taxRate, total, fees = false) {
    let taxTotal = total * taxRate;

    if (fees) {
        fees.forEach(fee => {
            if (fee.feeIsTaxed) {
                taxTotal += fee.feeAmount * taxRate;
            }
        });
    }

    return Math.round(taxTotal * 100) / 100;
}

/**
 * Calculate Fees Total
 * 
 * Add the amounts for each Fee to get the total fees for a Bill.
 * 
 * @param {Array} fees 
 * @returns Number
 */
export function calculateFeesTotal(fees) {
    return fees.reduce((total, fee) => total + fee.feeAmount, 0);
}

/**
 * Calculate Fees Total With Tax
 * 
 * Add the amounts for each Fee to get the total fees for a Bill.
 * 
 * @param {Array} fees 
 * @returns Number
 */
export function calculateFeesTotalWithTax(fees, taxRate) {
    let feesTotalWithTax = 0;

    fees.forEach(fee => {
        if (fee.feeIsTaxed) {
            feesTotalWithTax += fee.feeAmount + (fee.feeAmount * taxRate);
        } else {
            feesTotalWithTax += fee.feeAmount;
        }
    });

    return feesTotalWithTax;
}

/**
 * Calculate Orders Total
 * 
 * Add the subtotals for each Order in a Bill to get the subtotal for a Bill.
 * 
 * @param {Array} orders 
 * @returns Number
 */
export function calculateOrdersTotal(orders) {
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
export function calculateDiscountsTotal(discounts, ordersTotal) {
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