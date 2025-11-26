import { useState } from "react";
import BillFormItem from "../BillFormItem/BillFormItem.jsx";

const BillFormOrder = () => {
    const [orderCount, setOrderCount] = useState(0);
    const [orders, setOrders] = useState([]);

    // Increase order count.
    function increaseOrderCount() {
        setOrderCount(prevCount => prevCount + 1);
    }

    // Add order.
    function addOrder() {
        let newOrder = {
            name: `bill-order-${orderCount}`
        };

        setOrders(prevOrders => [...prevOrders, newOrder]);
        increaseOrderCount();
    }

    return (
        <div className="bill-input-section">
            {orderCount ? <h4 className="bill-section-title">Order Details</h4> : null}
            {orders.map(order => (
                <div key={order.name} className={`bill-section-wrapper ${order.name}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="inputs-wrapper order-inputs-wrapper">
                                    <div className="input-wrapper order-input-wrapper">
                                        <label htmlFor={`${order.name}-name-input`} className="form-label">Order Name</label>
                                        <input type='text'
                                            className="form-control"
                                            id={`${order.name}-name-input`}
                                            name={`${order.name}-name-input`}
                                            required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <BillFormItem order={order} />
                    </div>
                </div>
            ))}

            {/* Add order button. */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-secondary" onClick={addOrder}>Add Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillFormOrder