import { useState } from 'react';
import axios from 'axios';
import { iTaskData, iMyState, iTasks } from '../interfaces';

export default function useRequestData(path: string) {
  const initialState: iMyState = { responseData: [], error: '' };

  const [responseDataById, setResponseDataById] = useState<iTasks>({ _id: '', title: '', description: '', completedTask: false });
  const [responsePostData, setResponsePostData] = useState(initialState);
  const [responseDeleteData, setResponseDeleteData] = useState(initialState);
  const [responseUpdateData, setResponseUpdateData] = useState(initialState);

  async function createData(body: iTaskData) {
    try {
      const data = await axios.post<iTasks>(path, body);

      if (data.status !== 200) throw new Error(`can't create data`);
    } catch (error) {
      if (error instanceof Error) {
        setResponsePostData({ ...responsePostData, error: error.message });
      }
    }
  }

  async function deleteData(_id: string) {
    try {
      const data = await axios.delete<iTasks>(path + _id);

      if (data.status !== 200) throw new Error(`can't delete data`);
    } catch (error) {
      if (error instanceof Error) setResponseDeleteData({ ...responseDeleteData, error: error.message });
    }
  }

  async function updateData(_id: string, body: iTaskData) {
    try {
      const data = await axios.put<iTasks[]>(path + _id, body);

      if (data.status !== 200) throw new Error(`can't update data`);
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

  return {
    createData,
    deleteData,
    updateData,
    getByIdData,
    responseDataById,
  };
}
