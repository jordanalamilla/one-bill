import Banner from '../components/global/Banner/Banner'
import CreateBillForm from '../components/bills/CreateBillForm/CreateBillForm';

const PageCreateBill = () => {
  return (
    <>
      <Banner title="Create a Bill" />

      <section className="create-bill-form-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <CreateBillForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PageCreateBill