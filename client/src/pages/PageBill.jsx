import Banner from '../components/global/Banner/Banner'
import { useParams } from "react-router";
import BillFull from '../components/bills/BillFull/BillFull';

const PageBill = () => {
  const { id } = useParams();

  return (
    <>
      <Banner title="View / Edit Bill" />

      <section className="bills-container">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <BillFull billId={id} />

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PageBill