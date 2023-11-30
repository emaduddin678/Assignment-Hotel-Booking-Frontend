import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        // console.log(res)

        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    // console.log("hello")
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
