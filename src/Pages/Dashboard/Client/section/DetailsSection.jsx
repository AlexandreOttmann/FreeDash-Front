import { useCallback, useEffect, useState, forwardRef } from 'react';


import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
//mui
import { Card, Typography, Grid, CardMedia, Avatar, Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Container, Divider, Stack, CardContent, Box } from '@mui/material';

//utils
import { useParams } from "react-router";
import illustration from '../../../../assets/illustrations/table_illustration.png'
import { retrieveUserId } from '../../../../utils/retrieveUserId';
import { axiosInstance } from '../../../../api/axios';

import EditClient from './EditClient';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DetailsSection({ client, missionsNumber, totalGain }) {

  const [open, setOpen] = useState(false);

  console.log('client', client)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        py: 2,
        paddingX: 3,
      }}
    >
      <Grid container spacing={3}>

        <Grid item xs={6} margin={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 3, }}>
          <Avatar alt={client.firstName}
            src={`/assets/images/avatars/avatar_${Math.floor(Math.random() * 23 + 1)}.jpg`}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h4">{client.firstName} {client.lastName}</Typography>
          <Typography variant="body1"> {client.email}</Typography>

          <Typography variant="body1" > {client.provenance} </Typography>
          <Typography variant="body1" > Nombre de missions :  {missionsNumber}</Typography>
          <Typography variant="body1" > Total des missions avec {client.firstName} : {totalGain}€ HT</Typography>
        </Grid>

        <Grid item xs={4} margin={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 3 }}>
          <Typography variant="body1" >Adresse: {client.address}  </Typography>
          <Typography variant="body1" >{client.zipCode} | {client.city} </Typography>
          <Typography variant="body1" >{client.country} </Typography>
          <Typography variant="body1" >{client.phoneNumber} </Typography>
          <Typography variant="body1" >SIRET : {client.siret} </Typography>

        </Grid>
        <Grid item xs={2} margin={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
          <Button variant="outlined" onClick={handleClickOpen}>Modifier</Button>
        </Grid>
      </Grid>


      <Dialog
        scroll="body"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Modifier la mission</DialogTitle>
        <DialogContent>
          <EditClient details={client} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}