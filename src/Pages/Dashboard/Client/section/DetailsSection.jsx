import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

//mui
import { Card, CardMedia, Typography, Grid, Avatar, Button, Divider, Chip, Stack } from "@mui/material";
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
  console.log(client)

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

      <Grid container margin={1} >


        <Grid item xs={12} sm={5} margin={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 3, zIndex: 3 }}>
          <Avatar alt={client.firstName}
            src={`/assets/images/avatars/avatar_${Math.floor(Math.random() * 23 + 1)}.jpg`}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="caption">Date d'ajout : {fDatefr(client.createdAt)}</Typography>
          <Typography variant="h4">{client.firstName} {client.lastName}</Typography>
          <Typography variant="body1"> {client.provenance ? client.provenance : <em>Provenance non renseignée</em>}</Typography>
          <Typography variant="body1"><Link to={`mailto:${client.email}`}><Iconify icon={'eva:email-outline'} width={17} />  {client.email}</Link></Typography>
          <Typography variant="body1" ><Iconify icon={'eva:phone-call-outline'} width={17} /> {client.phoneNumber ? client.phoneNumber : <em>Numéro de téléphone non renseigné</em>} </Typography>
          <Typography variant="body1" ><strong>SIRET : </strong> {client.siret > 0 ? client.siret : <em>Siret non renseigné</em>} </Typography>
        </Grid>

        <Grid item xs={12} sm={5} margin={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1.5, textAlign: 'left', zIndex: 3 }}>
          <Chip label="Adresse" variant="outlined" sx={{ zIndex: 3 }} />
          <Typography variant="body1" >{client.address}  </Typography>
          <Typography variant="body1" >{client.zipCode}  {client.city} </Typography>
          <Typography variant="body1" >{client.country ? client.country : <em>Pays non renseigné</em>} </Typography>
        </Grid >
      </Grid>
      <Divider sx={{ width: '100%', marginTop: 4 }} />
      <Grid container spacing={4} sx={{ margin: 'auto', my: 2 }}>
        <Grid item xs={12} md={5} sx={{ zIndex: 3 }} >
          <Typography variant="subtitle1">Nombre de missions: {missionsNumber}</Typography>

        </Grid>
        <Grid item xs={12} md={5} sx={{ zIndex: 3 }}>
          <Typography variant="subtitle1">Total des missions avec {client.firstName}: {totalGain}€ HT</Typography>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ padding: 2, zIndex: 3 }}>
        <Button variant="outlined" onClick={handleClickOpen} sx={{ zIndex: 3 }}>Modifier</Button>
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