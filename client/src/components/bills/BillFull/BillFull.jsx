import './BillFull.scss'
import { useState, useEffect } from "react"
import axios from 'axios';

const BillFull = (props) => {
    const { billId } = props;
    const [bill, setBill] = useState([]);
    const [orders, setOrders] = useState([]);
    const [fees, setFees] = useState([]);
    const [discounts, setDiscounts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isRateLimited, setIsRateLimited] = useState(false);

    useEffect(() => {
        async function fetchBill() {
            try {
                const response = await axios.get("http://localhost:3001/api/bills/" + billId);
                setBill(response.data);
                setOrders(response.data.billOrders);
                setFees(response.data.billFees);
                setDiscounts(response.data.billDiscounts);

            } catch (error) {
                // Log error.
                console.log(error);

                // Send rate limit error.
                if (error.status === 429) {
                    setIsRateLimited(true);
                    toast.error("Woahh slow down there, chico.");
                }
            } finally {
                // Stop loading.
                setIsLoading(false);
            }
        }
        fetchBill();
    }, []);

    const displayTaxRate = bill.billTaxRate * 100;

    return (
        <div className="card bill">
            {/* Bill name and date */}
            <div className="card-header">
                <h2 className="card-title">{bill.billName}</h2>
                <h6 className="card-subtitle bill-date">{new Date(bill.createdAt).toLocaleString()}</h6>
            </div>

            <div className="card-body">

                {/* Orders */}
                <div className="bill-section orders-section">
                    <h4 className='bill-section-title'>Orders</h4>

                    {orders.map(order => (
                        <div className="order-wrapper">
                            <h4 className="order-owe">{order.orderPersonName} Owes ${order.orderOwe}</h4>

                            <table className='bill-order'>
                                <tbody>
                                    {/* Items */}
                                    {order.orderItems.map(item => (
                                        <tr key={item._id}>
                                            <td className='row-label'>
                                                <h5>{item.itemName} &times; {item.itemQuantity}</h5>
                                            </td>
                                            <td className='row-value'>
                                                <h5>${item.itemSubTotal}</h5>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className='row-label'><h4>Subtotal</h4></td>
                                        <td className='row-value'><h4>${order.orderSubTotal}</h4></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>

                {/* Fees */}
                <div className="bill-section fee-section">
                    <h4 className="bill-section-title">Fees</h4>
                    <table className='bill-fees'>
                        <tbody>
                            {fees.map(fee => (
                                <tr key={fee._id}>
                                    <td className='row-label'>
                                        <h5>{fee.feeName}</h5>
                                    </td>
                                    <td className='row-value'>
                                        <h5>${fee.feeAmount} {fee.feeIsTaxed && <span>(Taxed)</span>}</h5>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* Discounts */}
                <div className="bill-section discount-section">
                    <h4 className="bill-section-title">Discounts</h4>
                    <table className='bill-discounts'>
                        <tbody>
                            {discounts.map(discount => (
                                <tr key={discount._id}>
                                    <td className='row-label'>
                                        <h5>{discount.discountName}</h5>
                                    </td>
                                    <td className='row-value'>
                                        <h5>-{discount.discountAmount < 1 && discount.discountAmount > 0 ?
                                            discount.discountAmount * 100 + '%'
                                            : '$' + discount.discountAmount}
                                        </h5>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* Bill totals */}
                <div className="bill-section bill-info-section">
                    <h4 className="bill-section-title">Bill Totals</h4>
                    <table className='bill-info'>
                        <tbody>
                            <tr>
                                <td className='row-label'>
                                    <h5>Tax Total</h5>
                                </td>
                                <td className='row-value'>
                                    <h5>${bill.billTaxTotal} ({displayTaxRate}%)</h5>
                                </td>
                            </tr>
                            <tr>
                                <td className='row-label'>
                                    <h5>Subtotal</h5>
                                </td>
                                <td className='row-value'>
                                    <h5>${bill.billOrdersSubTotal}</h5>
                                </td>
                            </tr>
                            <tr>
                                <td className='row-label'>
                                    <h5>Fees Total</h5>
                                </td>
                                <td className='row-value'>
                                    <h5>${bill.billFeesTotal}</h5>
                                </td>
                            </tr>
                            <tr>
                                <td className='row-label'>
                                    <h5>Discounts Total</h5>
                                </td>
                                <td className='row-value'>
                                    <h5>${bill.billDiscountsTotal}</h5>
                                </td>
                            </tr>
                            <tr>
                                <td className='row-label'>
                                    <h4>Total</h4>
                                </td>
                                <td className='row-value'>
                                    <h4>${bill.billTotal}</h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default BillFull