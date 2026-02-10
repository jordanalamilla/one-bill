import './CreateBillForm.scss';
import './BillFormOrder/BillFormOrder.jsx';
import BillFormOrder from './BillFormOrder/BillFormOrder.jsx';
import BillFormFee from "./BillFormFee/BillFormFee.jsx";
import BillFormBill from "./BillFormBill/BillFormBill.jsx";
import BillFormDiscount from "./BillFormDiscount/BillFormDiscount.jsx";
import {useState} from "react";
import ErrorList from "./ErrorList/ErrorList.jsx";

const CreateBillForm = () => {
    const [errors, setErrors] = useState([]);

    function addErrorMessage(errorMessage) {
        if ( ! errors.includes(errorMessage) ) {
            setErrors((prevErrors) => [...prevErrors, errorMessage]);
        }
    }

    function removeErrorMessage(errorMessage) {
        if ( errors.includes(errorMessage) ) {
            setErrors(prevErrors => prevErrors.filter(error => error !== errorMessage));
        }
    }

    // Handle submission.
    function handleSubmission(e) {
        e.preventDefault();
        const newBillData = new FormData(e.target);

        // Error messages
        const emOneOrder = "The bill must have at least one order.";
        const emOneItem = "Each order must have at least one item.";

        for (const pair of newBillData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        /**
         * Error checks
         */

        // Check for at least one order.
        if ( document.getElementById('bill-order-0') ) {
            removeErrorMessage(emOneOrder);

            // Check for at least one item in each order

        } else {
            addErrorMessage(emOneOrder);
        }


        let itemExists = document.getElementById('bill-order-0-item-0');
        itemExists ? removeErrorMessage(emOneItem) : addErrorMessage(emOneItem);
    }

    return (
        <form onSubmit={handleSubmission}>

            {errors && <ErrorList errors={errors} />}

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