import './BillPreview.scss'

const BillPreview = (props) => {
    const { bill } = props;
    const classNamePaid = bill.billPaid ? 'bill-paid' : 'bill-not-paid';
    const billDate = new Date(bill.createdAt).toLocaleString();

    return (
        <div className="col-12 col-md-4">
            <div className={`card bill ${classNamePaid}`} style={{ width: 100 + '%' }}>

                <div class="card-header">
                    <h2 className="card-title">{bill.billName}</h2>
                    ***
                    <h6 className="card-subtitle">{billDate}</h6>
                </div>

                <div className="card-body">
                    <h4>Amount Owed</h4>
                    <table className='all-order-owe'>
                        <tbody>
                            {bill.billOrders.map(order => (
                                <tr key={order._id}>
                                    <td className='row-label'>
                                        <h6>{order.orderPersonName}</h6>
                                    </td>
                                    <td className='row-value'>
                                        <h6>${order.orderOwe}</h6>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table className='bill-total'>
                        <tbody>
                            <tr>
                                <td className='row-label'><h6>Total</h6></td>
                                <td className='row-value'>${bill.billTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BillPreview