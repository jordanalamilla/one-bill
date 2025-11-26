import React from 'react'

const BillFormBill = () => {
    return (
        <div className="bill-input-section">
            <h4 className="bill-section-title">Bill Details</h4>

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-9">
                        <div className="input-wrapper">
                            <label htmlFor="bill-name-input" className="form-label">Bill Name</label>
                            <input type='text'
                                   className="form-control create-bill-input bill-input"
                                   id='bill-input-name'
                                   name='bill-input-name'
                                   required />
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="input-wrapper">
                            <label htmlFor="bill-tax-rate-input" className="form-label">Tax Rate (%)</label>
                            <input type='number'
                                   step='0.01'
                                   className="form-control create-bill-input bill-input"
                                   id='bill-input-tax-rate'
                                   name='bill-input-tax-rate'
                                   placeholder='0.13'
                                   required />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillFormBill