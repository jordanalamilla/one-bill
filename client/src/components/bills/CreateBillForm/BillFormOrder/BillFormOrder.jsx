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
            name: `order-${orderCount}`
        };

        setOrders(prevOrders => [...prevOrders, newOrder]);
        increaseOrderCount();
    }

    return (
        <div className="bill-container order-inputs-container">
            {orders.map(order => (
                <fieldset key={order.name} className={`row g-3 order-input-row ${order.name}`}>

                    <div className="col-12 order-input-col">
                        <label htmlFor={`${order.name}-name-input`} className="form-label">Order Name</label>
                        <input type='text'
                            className="form-control create-bill-input order-input"
                            id={`${order.name}-name-input`}
                            name={`${order.name}-name-input`} />
                    </div>

                    {/* Items */}
                    <BillFormItem order={order} />
                </fieldset>
            ))}

            {/* Add order button. */}
            <button className="btn btn-secondary" onClick={addOrder}>Add Order</button>
            {console.log(orders)}
        </div>
    )
}

export default BillFormOrder