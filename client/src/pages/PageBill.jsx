import React, { useEffect, useState } from 'react'
import Banner from '../components/common/Banner'
import { useParams } from "react-router";
import axios from 'axios';
import Loader from '../components/common/Loader';
import toast from "react-hot-toast"

const PageBill = () => {
  const { id } = useParams();
  const [bill, setBill] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    async function fetchBill() {
      try {
        const response = await axios.get(`http://localhost:3001/api/bills/${id}`);
        // console.log(response.data);
        setBill(response.data);

      } catch (error) {
        // Log error.
        console.log(error);

        // Send rate limit error.
        if (error.status === 429) {
          setIsRateLimited(true);
          toast.error("Woahh slow down there, chico.");
        }
      } finally {
        // Stop loading.
        setIsLoading(false);
      }
    }

    fetchBill();

  }, []);

  return (
    <>
      <Banner title="Bills Page" />
      {isLoading && <Loader />}

      {!isRateLimited && (
        <section className="bills-container">
          <div className="container">
            <div className="row">
              <div className="col-12">

                {bill.billName}

              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default PageBill