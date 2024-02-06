import { useState } from 'react';
import axios from 'axios';

export default function useOtherRequestData(path: string, method: string, body: any) {
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function changeData(id: string = '') {
    try {
      setLoading(true);
      const { data } = await axios({ method, url: path + id, data: body });
      setLoading(false);

      setResponseData(data);
    } catch (e: any) {
      console.log(e.message);

      setLoading(false);
      setError(e.message);
    }
  }

  return { responseData, error, loading, changeData };
}
