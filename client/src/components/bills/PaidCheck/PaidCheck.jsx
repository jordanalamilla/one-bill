import React, {useEffect, useState} from 'react'
import axios from "axios";

const PaidCheck = ({billId, billPaidProp}) => {
    const [billPaid, setBillPaid] = useState(false);

    useEffect(() => {
        setBillPaid(billPaidProp);
        console.log("useeffect");
    }, []);

    console.log("Initial billPaid", billPaid);

    function updatePaid() {
        setBillPaid(!billPaid);

        axios.put(`http://localhost:3001/api/bills/${billId}`, {
            billPaid: billPaid

        }).then(response => {
            console.log(`updatePaid ${!billPaid} to ${billPaid}`, response.data.Bill.billPaid);

        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <button onClick={updatePaid}>{billPaid ? "Not Paid" : "Paid"}</button>
    )
}

export default PaidCheck