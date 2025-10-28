const BillPreview = (props) => {
    const { bill } = props;

    return (
        <div className="col-12 col-md-4 col-lg-3">
            {bill.billName}
        </div>
    )
}

export default BillPreview