import './CreateBillForm.scss';
import './BillFormOrder/BillFormOrder.jsx';
import BillFormOrder from './BillFormOrder/BillFormOrder.jsx';

const CreateBillForm = () => {

    // Handle submission.
    function handleSubmission(e) {
        e.preventDefault();
        const newBillData = new FormData(e.target);
    }

    return (
        <form onSubmit={handleSubmission}>

            {/* Bill inputs. */}
            <div className="input-section bill-input-section">
                <div className="container px-0">
                    <div className="row">
                        <div className="col-12 col-sm-9">
                            <div className="input-wrapper">
                                <label htmlFor="bill-name-input" className="form-label">Bill Name</label>
                                <input type='text'
                                    className="form-control create-bill-input bill-input"
                                    id='bill-input-name'
                                    name='bill-input-name' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-3">
                            <div className="input-wrapper">
                                <label htmlFor="bill-tax-rate-input" className="form-label">Tax Rate (%)</label>
                                <input type='number'
                                    step='0.01'
                                    className="form-control create-bill-input bill-input"
                                    id='bill-input-tax-rate'
                                    name='bill-input-tax-rate'
                                    placeholder='0.13' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order inputs. */}
            <BillFormOrder />

            {/* Fees */}

            {/* Discounts */}

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default CreateBillForm