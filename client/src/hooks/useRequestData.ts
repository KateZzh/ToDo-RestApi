import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useRequestData(path: string) {
  const [responseData, setResponseData] = useState([]);
  const [responseDataById, setResponseDataById] = useState({});
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

  async function deleteData(_id: string) {
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

  async function updateData(_id: string, body) {
    try {
      setLoading(true);

      const data = await axios.put(path + _id, body);

      if (data.status !== 200) throw new Error('can`t update data');
      await getData();

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  async function getByIdData(_id: string) {
    try {
      setLoading(true);

      const data = await axios.get(path + _id);

      if (data.status !== 200) throw new Error('can`t find data by id');

      setResponseDataById(data.data[0])

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { responseData, error, loading, responseDataById, setResponseDataById, createData, deleteData, updateData, getByIdData };
}
