import './CreateBillForm.scss';
import './BillFormOrder/BillFormOrder.jsx';
import BillFormOrder from './BillFormOrder/BillFormOrder.jsx';
import BillFormFee from "./BillFormFee/BillFormFee.jsx";
import BillFormBill from "./BillFormBill/BillFormBill.jsx";
import BillFormDiscount from "./BillFormDiscount/BillFormDiscount.jsx";

const CreateBillForm = () => {

    // Handle submission.
    function handleSubmission(e) {
        e.preventDefault();
        const newBillData = new FormData(e.target);

        for (const pair of newBillData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    }

    return (
        <form onSubmit={handleSubmission}>

            {/* Bill inputs. */}
            <BillFormBill />

            {/* Order inputs. */}
            <BillFormOrder />

            {/* Fees */}
            <BillFormFee />

            {/* Discounts */}
            <BillFormDiscount />

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateBillForm