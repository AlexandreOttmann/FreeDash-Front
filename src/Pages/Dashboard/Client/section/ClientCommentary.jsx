import { Card, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { retrieveUserId } from "../../../../utils/retrieveUserId";
import { axiosInstance } from "../../../../api/axios";

export default function ClientCommentary() {

  // const { idclient } = useParams();
  // const userId = retrieveUserId()
  //! ==============API=================
  const [client, setClient] = useState([]);
  const getClient = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clients/2`);
      // const response = await axiosInstance.get(`/user/${userId}/clients/${idclient}`);
      console.log("client:", response.data)
      setClient(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getClient();
  }, [getClient]);

  return (
    <Card
      sx={{
        py: 2,
        paddingX: 3,
        color: 'black',
        bgcolor: '#fff',

      }}>
      <Typography variant="body1">
        {client.commentary}
      </Typography>
    </Card >
  )
}