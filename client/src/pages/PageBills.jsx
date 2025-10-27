import { useState, useEffect } from 'react'
import Banner from "../components/common/Banner"
import Loader from '../components/common/Loader'
import axios from 'axios'
import toast from "react-hot-toast"

const PageBills = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    async function fetchBills() {
      await axios.get("http://localhost:3001/api/bills")
        .then(response => {
          // Set data.
          setBills(JSON.stringify(response.data));
          console.log(response);
        })
        .catch((error) => {
          // Log error.
          console.log(error);

          // Send rate limit error.
          if (error.status === 429) {
            setIsRateLimited(true);
            toast.error("Woahh slow down there, chico.");
          }
        })
        .finally(() => {
          // Stop loading.
          setIsLoading(false);
        });
    }

    fetchBills();
  }, []);

  return (
    <>
      <Banner title="Bills Page" />
      {isLoading && <Loader />}
      {bills}
      {isRateLimited}
    </>
  )
}

export default PageBills