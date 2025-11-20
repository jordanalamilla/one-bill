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
        <>
            <div className="input-section order-input-section">
                {orders.map(order => (
                    <div key={order.name} className={`order-inputs ${order.name}`}>

                        <h4 className="input-row-title order-input-row-title">Order</h4>

                        <div className="inputs-wrapper order-inputs-wrapper">
                            <div className="input-wrapper order-input-wrapper">
                                <label htmlFor={`${order.name}-name-input`} className="form-label">Order Name</label>
                                <input type='text'
                                    className="form-control"
                                    id={`${order.name}-name-input`}
                                    name={`${order.name}-name-input`} />
                            </div>

                            {/* Items */}
                            <BillFormItem order={order} />

                        </div>
                    </div>
                ))}
            </div>

            {/* Add order button. */}
            <div className="btn-add-row btn-add-row-order">
                <button className="btn btn-secondary" onClick={addOrder}>Add Order</button>
            </div>
        </>
    )
}

export default BillFormOrder