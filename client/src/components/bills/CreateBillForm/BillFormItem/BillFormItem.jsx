import { useState } from "react"

const BillFormItem = (props) => {
    const { order } = props;
    const [itemCount, setItemCount] = useState(0);
    const [items, setItems] = useState([]);

    // Increase item count.
    function increaseItemCount() {
        setItemCount(prevCount => prevCount + 1);
    }

    // Add item.
    function addItem() {
        let newItem = {
            orderName: order.name,
            name: `item-${itemCount}`
        };

        setItems(prevItems => [...prevItems, newItem]);
        increaseItemCount();
    }

    return (
        <>
            {items.map(item => (
                <fieldset key={`${item.orderName}-${item.name}`} className={`row g-3 item-input-row ${item.orderName}-${item.name}`}>
                    <div className="col-12 col-sm-6 item-input-col">
                        <label htmlFor={`${item.orderName}-${item.name}-name-input`} className="form-label">Item Name</label>
                        <input type='text'
                            className="form-control create-bill-input item-input"
                            id={`${item.orderName}-${item.name}-name-input`}
                            name={`${item.orderName}-${item.name}-name-input`} />
                    </div>
                    <div className="col-12 col-sm-3 item-input-col">
                        <label htmlFor={`${item.orderName}-${item.name}-price-input`} className="form-label">Price ($)</label>
                        <input type='number'
                            step='0.01'
                            className="form-control create-bill-input item-input"
                            id={`${item.orderName}-${item.name}-price-input`}
                            name={`${item.orderName}-${item.name}-price-input`} />
                    </div>
                    <div className="col-12 col-sm-3 item-input-col">
                        <label htmlFor={`${item.orderName}-${item.name}-quantity-input`} className="form-label">Quantity</label>
                        <input type='text'
                            className="form-control create-bill-input item-input"
                            id={`${item.orderName}-${item.name}-quantity-input`}
                            name={`${item.orderName}-${item.name}-quantity-input`} />
                    </div>
                </fieldset>
            ))}

            {/* Add item button. */}
            <button className="btn btn-secondary" onClick={addItem}>Add Item</button>
            {console.log(items)}
        </>
    )
}

export default BillFormItem