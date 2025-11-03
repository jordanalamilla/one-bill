// import './BillFull.scss'
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

    return (
        <div className="card bill" style={{ width: 100 + '%' }}>
            {/* Bill name and date */}
            <div className="card-header">
                <h2 className="card-title">{bill.billName}</h2>
                <h6 className="card-subtitle bill-date">{new Date(bill.createdAt).toLocaleString()}</h6>
            </div>

            {/* Orders */}
            {orders.map(order => (
                <h4 key={order._id}>
                    {order.orderPersonName}
                </h4>
            ))}

            {/* Fees */}
            {fees.map(fee => (
                <h4 key={fee._id}>
                    {fee.feeName}
                </h4>
            ))}

            {/* Discounts */}
            {discounts.map(discount => (
                <h4 key={discount._id}>
                    {discount.discountName}
                </h4>
            ))}
        </div>
    )
}

export default BillFull