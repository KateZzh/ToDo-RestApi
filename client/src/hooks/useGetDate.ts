import { useState, useEffect } from 'react';
import axios from 'axios';

import { iMyState, iTasks } from '../interfaces';

export default function useGetDate(path: string) {
  const initialState: iMyState = { responseData: [], error: '' };

  const [responseGetData, setResponseGetData] = useState(initialState);

  async function getData() {
    try {
      const { data } = await axios.get<iTasks[]>(path);

      setResponseGetData({ ...responseGetData, responseData: data });
    } catch (error) {
      if (error instanceof Error) setResponseGetData({ ...responseGetData, error: error.message });
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return {
    getData,
    responseGetData,
  };
}
