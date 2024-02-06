import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useRequestData(path: string) {
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      setLoading(true);
      const { data } = await axios.get(path);
      setLoading(false);

      setResponseData(data);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  async function createData(body) {
    try {
      setLoading(true);

      const data = await axios.post(path, body);

      if (data.status !== 200) throw new Error('can`t create data');
      await getData();

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  async function deleteData(_id) {
    try {
      setLoading(true);

      const data = await axios.delete(path + _id);

      if (data.status !== 200) throw new Error('can`t delete data');
      await getData();

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { responseData, error, loading, createData, deleteData };
}
