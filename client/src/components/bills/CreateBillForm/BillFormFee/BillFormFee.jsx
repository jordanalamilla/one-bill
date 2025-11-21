import React, {useState} from 'react'
import BillFormItem from "../BillFormItem/BillFormItem.jsx";

const BillFormFee = () => {
    const [fees, setFees] = useState([]);
    const [feeCount, setFeeCount] = useState(0);

    // Increase fee count.
    function increaseFeeCount() {
        setFeeCount(prevCount => prevCount + 1);
    }

    // Add fee.
    function addFee() {
        let newFee = {
            name: `bill-fee-${feeCount}`
        };

        setFees(prevFees => [...prevFees, newFee]);
        increaseFeeCount();
    }

    return (
        <div className="bill-input-section">
            {feeCount ? <h4 className="bill-section-title">Fee Details</h4> : null}

            {fees.map(fee => (
                <div key={fee.name} className={`bill-section-wrapper ${fee.name}`}>
                    <div className="container">
                        <div className="row">

                            <div className="col-8">
                                <div className="inputs-wrapper fee-inputs-wrapper">
                                    <div className="input-wrapper fee-input-wrapper">
                                        <label htmlFor={`${fee.name}-name-input`} className="form-label">Fee Name</label>
                                        <input type='text'
                                               className="form-control"
                                               id={`${fee.name}-name-input`}
                                               name={`${fee.name}-name-input`} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-4">
                                <div className="inputs-wrapper fee-inputs-wrapper">
                                    <div className="input-wrapper fee-input-wrapper">
                                        <label htmlFor={`${fee.name}-name-input`} className="form-label">Fee Price</label>
                                        <input type='text'
                                               className="form-control"
                                               id={`${fee.name}-name-input`}
                                               name={`${fee.name}-name-input`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add fee button. */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-secondary" onClick={addFee}>Add Fee</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillFormFee