import { useState } from "react"

const BillFormItem = ({order}) => {
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
                <div key={`${item.orderName}-${item.name}`} className="row item-row">

                    {/* Name */}
                    <div className="col-12 col-md-6">
                        <div className="inputs-wrapper">
                            <label htmlFor={`${item.orderName}-${item.name}-name-input`} className="form-label">Item Name</label>
                            <input type='text'
                                className="form-control create-bill-input item-input"
                                id={`${item.orderName}-${item.name}-name-input`}
                                name={`${item.orderName}-${item.name}-name-input`}
                                required/>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="inputs-wrapper">
                            <label htmlFor={`${item.orderName}-${item.name}-price-input`} className="form-label">Price ($)</label>
                            <input type='number'
                                step='0.01'
                                className="form-control create-bill-input item-input"
                                id={`${item.orderName}-${item.name}-price-input`}
                                name={`${item.orderName}-${item.name}-price-input`}
                                required />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="inputs-wrapper">
                            <label htmlFor={`${item.orderName}-${item.name}-quantity-input`} className="form-label">Quantity</label>
                            <input type='text'
                                className="form-control create-bill-input item-input"
                                id={`${item.orderName}-${item.name}-quantity-input`}
                                name={`${item.orderName}-${item.name}-quantity-input`}
                                required />
                        </div>
                    </div>
                </div>
            ))}

            {/* Add item button. */}
            <div className="row item-row">
                <div className="col-12">
                    <div className="inputs-wrapper">
                        <button type="button" className="btn btn-secondary" onClick={addItem}>Add Item</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BillFormItem