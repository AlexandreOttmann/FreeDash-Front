
import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../../../api/axios";

export default function ClientDetailsPage() {

  const [clients, setClients] = useState([]);

  const getClients = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/user/1/clients');
      // const response = await axiosInstance.get(`/user/${userId}/clients`);
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {
    getClients();
  }, [getClients]);


  return (
    <div>
      <h1>
        je suis là page Client détails Page
      </h1>
    </div>
  )
}