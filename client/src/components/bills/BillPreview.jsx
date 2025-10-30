import './BillPreview.scss'

const BillPreview = (props) => {
    const { bill } = props;
    const classNamePaid = bill.billPaid ? 'bill-paid' : 'bill-not-paid';
    const billDate = new Date(bill.createdAt).toLocaleString();

    return (
        <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className={`card bill ${classNamePaid}`} style={{ width: 100 + '%' }}>

                <div class="card-header">
                    <h2 className="card-title">{bill.billName}</h2>
                    <h6 className="card-subtitle bill-date">{billDate}</h6>
                </div>

                <div className="card-body">
                    <h4 className='title-amount-owed'>Amount Owed</h4>
                    <table className='all-order-owe'>
                        <tbody>
                            {bill.billOrders.map(order => (
                                <tr key={order._id}>
                                    <td className='row-label'>
                                        <h5>{order.orderPersonName}</h5>
                                    </td>
                                    <td className='row-value'>
                                        <h5>${order.orderOwe}</h5>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table className='bill-total'>
                        <tbody>
                            <tr>
                                <td className='row-label'><h4>Total</h4></td>
                                <td className='row-value'><h4>${bill.billTotal}</h4></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BillPreview