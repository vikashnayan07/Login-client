import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";

axios.defaults.baseURL = "http://localhost:3000";

export default function useFetchData(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        let url = `/api/${query}`;
        if (!query) {
          const username = await getUsername();
          url = `/api/user/${username}`;
        }

        const response = await axios.get(url);
        const { data, status } = response;

        if (status === 200) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: data,
            status: status,
          }));
        } else {
          setData((prev) => ({ ...prev, isLoading: false, status: status }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
}
