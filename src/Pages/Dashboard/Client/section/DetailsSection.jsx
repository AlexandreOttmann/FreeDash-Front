//mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Grid, CardMedia, Avatar } from "@mui/material";

//utils

import illustration from '../../../../assets/illustrations/table_illustration.png'
import { retrieveUserId } from '../../../../utils/retrieveUserId';
import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../../../../api/axios';


export default function DetailsSection() {

  const userId = retrieveUserId()
  //! ==============API=================
  const [clients, setClients] = useState([]);
  const getClients = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/user/1/clients');
      // const response = await axiosInstance.get(`/user/${userId}/clients`);
      console.log(response.data)
      console.log(clients);
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getClients();
  }, [getClients]);

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
          <Typography variant="h4" >Détails du client</Typography>
          <Typography variant="h5" >Localisation: </Typography>
          <Typography variant="h5" >Particulier ou société </Typography>
          <Typography variant="h5" >Missions déja effectué avec ce client: </Typography>

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