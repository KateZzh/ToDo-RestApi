import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useRequestData(path: string, method: string, body: any) {
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const { data } = await axios({ method, url: path, data: body });
        setLoading(false);

        setResponseData(data);
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    }

    getData();
  }, [path, method, body, responseData]);

  return { responseData, error, loading };
}
