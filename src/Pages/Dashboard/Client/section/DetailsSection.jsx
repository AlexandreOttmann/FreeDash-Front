//mui
import { Card, Typography, Grid, CardMedia, Avatar } from "@mui/material";

//utils
import { useParams } from "react-router";
import illustration from '../../../../assets/illustrations/table_illustration.png'
import { retrieveUserId } from '../../../../utils/retrieveUserId';
import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../../../../api/axios';


export default function DetailsSection() {
  const { idclient } = useParams();
  const userId = retrieveUserId()
  //! ==============API=================
  const [client, setClient] = useState([]);
  const getClient = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clients/${idclient}`);
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

      }}
    >
      <Grid container spacing={3}>

        <Grid item xs={8} margin={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
          <Avatar alt={name}
            src={`/assets/images/avatars/avatar_${Math.floor(Math.random() * 23 + 1)}.jpg`}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h4" >{client.firstName} {client.lastName}</Typography>
          <Typography variant="h5" >Localisation: {client.city} </Typography>
          <Typography variant="h5" > Particulier / Société: {client.role} </Typography>
          <Typography variant="h5" > Missions déja effectué avec ce client:  </Typography>

        </Grid>

        <Grid item>
          <CardMedia
            component="img"
            image={illustration}
            height="250"
            alt="illustration" />
        </Grid>
      </Grid>
    </Card>
  )
}