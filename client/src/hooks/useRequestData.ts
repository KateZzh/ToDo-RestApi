import { useState, useEffect } from 'react';
import axios from 'axios';
import { iTaskData, iMyState } from '../interfaces';

export default function useRequestData(path: string) {
  const initialState: iMyState = { responseData: [], error: '' };

  const [responseDataById, setResponseDataById] = useState({});
  const [responseGetData, setResponseGetData] = useState<iMyState>(initialState);
  const [responsePostData, setResponsePostData] = useState<iMyState>(initialState);
  const [responseDeleteData, setResponseDeleteData] = useState<iMyState>(initialState);
  const [responseUpdateData, setResponseUpdateData] = useState<iMyState>(initialState);

  async function getData() {
    try {
      const { data } = await axios.get(path);

      setResponseGetData({ ...responseGetData, responseData: data });
    } catch (error) {
      if (error instanceof Error) setResponseGetData({ ...responseGetData, error: error.message });
    }
  }

  async function createData(body: iTaskData) {
    try {
      const data = await axios.post(path, body);

      if (data.status !== 200) throw new Error(`can't create data`);

      await getData();
    } catch (error) {
      if (error instanceof Error) {
        setResponsePostData({ ...responsePostData, error: error.message });
      }
    }
  }

  async function deleteData(_id: string) {
    try {
      const data = await axios.delete(path + _id);

      if (data.status !== 200) throw new Error(`can't delete data`);

      await getData();
    } catch (error) {
      if (error instanceof Error) setResponseDeleteData({ ...responseDeleteData, error: error.message });
    }
  }

  async function updateData(_id: string, body: iTaskData) {
    try {
      const data = await axios.put(path + _id, body);

      if (data.status !== 200) throw new Error(`can't update data`);

      await getData();
    } catch (error) {
      if (error instanceof Error) setResponseUpdateData({ ...responseUpdateData, error: error.message });
    }
  }

  async function getByIdData(_id: string) {
    try {
      const data = await axios.get(path + _id);

      if (data.status !== 200) throw new Error(`can't find data by id`);

      setResponseDataById(data.data[0]);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    responseGetData,
    responseDataById,
    responsePostData,
    responseDeleteData,
    responseUpdateData,
    setResponseDataById,
    createData,
    deleteData,
    updateData,
    getByIdData,
  };
}
