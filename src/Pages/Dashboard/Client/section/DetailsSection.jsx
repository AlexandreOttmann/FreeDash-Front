import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

//mui
import { Card, Typography, Grid, Avatar, Button, Divider, Chip, Stack } from "@mui/material";
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
//components
import EditClient from './EditClient';
//utils
import Iconify from '../../../../components/iconify/Iconify';
import { fDatefr } from '../../../../utils/formatTime';
import { Link } from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

DetailsSection.propTypes = {
  client: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    createdAt: PropTypes.string,
    email: PropTypes.string,
    provenance: PropTypes.string,
    address: PropTypes.string,
    zipCode: PropTypes.number,
    city: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string,
    siret: PropTypes.string,
  }),
  missionsNumber: PropTypes.number,
  totalGain: PropTypes.number,
};

export default function DetailsSection({ client, missionsNumber, totalGain }) {

  const [open, setOpen] = useState(false);

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
        paddingX: 4,
      }}
    >
      <Grid container margin={1}>


        <Grid xs={12} sm={5} margin={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 3, }}>
          <Avatar alt={client.firstName}
            src={`/assets/images/avatars/avatar_${Math.floor(Math.random() * 23 + 1)}.jpg`}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="caption">Date d'ajout : {fDatefr(client.createdAt)}</Typography>
          <Typography variant="h4">{client.firstName} {client.lastName}</Typography>
          <Typography variant="body1"> {client.provenance}</Typography>
          <Typography variant="body1"><Link to={`mailto:${client.email}`}><Iconify icon={'eva:email-outline'} width={17} />  {client.email}</Link></Typography>
          <Typography variant="body1" ><Iconify icon={'eva:phone-call-outline'} width={17} /> {client.phoneNumber} </Typography>
          <Typography variant="body1" ><strong>SIRET : </strong> {client.siret} </Typography>
        </Grid>

        <Grid xs={12} sm={5} margin={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1.5, textAlign: 'center' }}>
          <Chip label="Adresse" variant="outlined" />
          <Typography variant="body1" >{client.address}  </Typography>
          <Typography variant="body1" >{client.zipCode} | {client.city} </Typography>
          <Typography variant="body1" >{client.country} </Typography>
        </Grid >
      </Grid>
      <Divider sx={{ width: '100%', marginTop: 4 }} />
      <Grid container spacing={4} sx={{ margin: 'auto', my: 2 }}>
        <Grid item xs={12} md={5}>
          <Typography variant="subtitle1">Nombre de missions: {missionsNumber}</Typography>

        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="subtitle1">Total des missions avec {client.firstName}: {totalGain}€ HT</Typography>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ padding: 2 }}>
        <Button variant="outlined" onClick={handleClickOpen}>Modifier</Button>
      </Stack>

      <Dialog
        scroll="body"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Modifier les informations du client</DialogTitle>
        <DialogContent>
          <EditClient details={client} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Card >
  )
}