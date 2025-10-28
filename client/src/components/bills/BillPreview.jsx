import './BillPreview.scss'

const BillPreview = (props) => {
    const { bill } = props;
    const classNamePaid = bill.billPaid ? 'bill-paid' : 'bill-not-paid';

    return (
        <div className="col-12 col-md-4">
            <div className={`card bill ${classNamePaid}`} style={{ width: 100 + '%' }}>
                <div className="card-body">
                    <h2 className="card-title">{bill.billName}</h2>
                    ***
                    <h6>{bill.createdAt}</h6>
                    ---

                    <h4>Amount Owed</h4>
                    <table>
                        <tbody>
                            {bill.billOrders.map(order => (
                                <tr key={order._id}>
                                    <td>{order.orderPersonName}</td>
                                    <td>${order.orderOwe}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table>
                        <tbody>
                            <tr>
                                <td><h4>Total</h4></td>
                                <td>${bill.billTotal}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default BillPreview