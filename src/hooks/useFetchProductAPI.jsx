import { useState, useEffect } from 'react';


const useFetchProductAPI = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 // const url = 'https://9wtn88dfcl.execute-api.eu-west-1.amazonaws.com/products'
  useEffect(() => {
    const fetchData = async () => {
      let cachedData = localStorage.getItem('cachedData');
      setLoading(true);
      setError(null);
      if (cachedData) {
        // If cached data exists, parse and use it
        setData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        // If no cached data, make API call and cache the response
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData);
          // Cache the API response
          localStorage.setItem('cachedData', JSON.stringify(responseData));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Clear cache when component unmounts
      localStorage.removeItem('cachedData');
    };

  }, [url]);

  return { data, loading, error };
};

export default useFetchProductAPI;