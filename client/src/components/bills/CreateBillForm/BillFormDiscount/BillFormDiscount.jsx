import React, {useState} from 'react'
import BillFormItem from "../BillFormItem/BillFormItem.jsx";

const BillFormDiscount = () => {
    const [discounts, setDiscounts] = useState([]);
    const [discountCount, setDiscountCount] = useState(0);

    // Increase discount count.
    function increaseDiscountCount() {
        setDiscountCount(prevCount => prevCount + 1);
    }

    // Add discount.
    function addDiscount() {
        let newDiscount = {
            name: `bill-discount-${discountCount}`
        };

        setDiscounts(prevDiscounts => [...prevDiscounts, newDiscount]);
        increaseDiscountCount();
    }

    return (
        <div className="bill-input-section">
            {discountCount ? <h4 className="bill-section-title">Discount Details</h4> : null}

            {discounts.map(discount => (
                <div key={discount.name} className={`bill-section-wrapper ${discount.name}`}>
                    <div className="container">
                        <div className="row">

                            {/* Name */}
                            <div className="col-12 col-md-6">
                                <div className="inputs-wrapper discount-inputs-wrapper">
                                    <div className="input-wrapper discount-input-wrapper">
                                        <label htmlFor={`${discount.name}-name-input`} className="form-label">Discount Name</label>
                                        <input type='text'
                                               className="form-control"
                                               id={`${discount.name}-name-input`}
                                               name={`${discount.name}-name-input`}
                                               required />
                                    </div>
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="col-12 col-sm-8 col-md-3">
                                <div className="inputs-wrapper discount-inputs-wrapper">
                                    <div className="input-wrapper discount-input-wrapper">
                                        <label htmlFor={`${discount.name}-amount-input`} className="form-label">Amount</label>
                                        <input type='text'
                                               className="form-control"
                                               id={`${discount.name}-amount-input`}
                                               name={`${discount.name}-amount-input`}
                                               required />
                                    </div>
                                </div>
                            </div>

                            {/* Discount type */}
                            <div className="col-12 col-sm-4 col-md-3">
                                <div className="inputs-wrapper discount-inputs-wrapper">
                                    <div className="input-wrapper discount-input-wrapper">
                                        <label className="form-label">Type</label>

                                        {/* Dollars */}
                                        <div className="form-check">
                                            <input className="form-check-input"
                                                   type="radio"
                                                   name={`${discount.name}-type-input`}
                                                   id={`${discount.name}-type-input-dollars`}
                                                    value="dollars"
                                                   defaultChecked/>

                                            <label className="form-check-label"
                                                   htmlFor={`${discount.name}-type-input-dollars`}>
                                                Dollars
                                            </label>
                                        </div>

                                        {/* Percent */}
                                        <div className="form-check">
                                            <input className="form-check-input"
                                                   type="radio"
                                                   name={`${discount.name}-type-input`}
                                                   id={`${discount.name}-type-input-percent`}
                                                   vallue="percent"/>

                                            <label className="form-check-label"
                                                   htmlFor={`${discount.name}-type-input-percent`}>
                                                Percent
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add discount button. */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-secondary" onClick={addDiscount}>Add Discount</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillFormDiscount