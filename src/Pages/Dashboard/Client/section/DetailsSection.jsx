//mui
import { Card, Typography, Grid, CardMedia, Avatar } from "@mui/material";

//utils
import { useParams } from "react-router";
import illustration from '../../../../assets/illustrations/table_illustration.png'
import { retrieveUserId } from '../../../../utils/retrieveUserId';
import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../../../../api/axios';


export default function DetailsSection({ client, missionsNumber }) {

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
          <Typography variant="h5" > {client.provenance} </Typography>
          <Typography variant="h5" > Missions déja effectué avec ce client:  {missionsNumber}</Typography>

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