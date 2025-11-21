import './CreateBillForm.scss';
import './BillFormOrder/BillFormOrder.jsx';
import BillFormOrder from './BillFormOrder/BillFormOrder.jsx';
import BillFormFee from "./BillFormFee/BillFormFee.jsx";
import BillFormBill from "./BillFormBill/BillFormBill.jsx";

const CreateBillForm = () => {

    // Handle submission.
    function handleSubmission(e) {
        e.preventDefault();
        const newBillData = new FormData(e.target);
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

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default CreateBillForm