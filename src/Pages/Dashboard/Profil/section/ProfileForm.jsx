/* eslint-disable react/prop-types */
import { useState, useEffect, forwardRef } from 'react';

import { useNavigate } from 'react-router';

import { Container, Typography, Divider, Stack, Button, Card, TextField } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

import { axiosPrivateInstance } from '../../../../api/axios';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfileForm({ profile }) {

  const [firstName, setFirstName] = useState(profile?.firstName || '')
  const [lastName, setLastName] = useState(profile?.lastName || '')
  const [email, setEmail] = useState(profile?.email || '')
  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber || '')
  const [address, setAddress] = useState(profile?.address || '')
  const [zipCode, setZipCode] = useState(profile?.zipCode || 0)
  const [city, setCity] = useState(profile?.city || '')
  const [country, setCountry] = useState(profile?.country || '')
  const [occupation, setOccupation] = useState(profile?.occupation || '')
  const [siret, setSiret] = useState(profile?.siret || 0)
  const [iban, setIban] = useState(profile?.iban || '')
  const [bic, setBic] = useState(profile?.bic || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)


  const [openUserDelete, setOpenUserDelete] = useState(false);

  const navigate = useNavigate();

  const handleDeleteUserClickOpen = () => {
    setOpenUserDelete(true);
  };

  const handleCloseUserDelete = () => {
    setOpenUserDelete(false);
  };

  const handleUserDelete = async () => {
    if (email === "ottmann.alex@gmail.com") {
      setError('Vous ne pouvez pas supprimer ce compte petit malin')
      handleCloseUserDelete()
      return
    } else {

      try {
        await axiosPrivateInstance.delete(`/user`);
        localStorage.removeItem('jwt');
        navigate('/register', { replace: true });
      } catch (error) {
        console.log("La mission n'a pas pu être supprimée", error);
      }
    }
  };


  const handleEditUser = async () => {

    setLoading(true)
    try {
      const response = await axiosPrivateInstance.patch(`/user`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        zipCode,
        city,
        country,
        occupation,
        siret,
        iban,
        bic
      })
      setSuccess('Votre profil a bien été modifié')
      setLoading(false)
      window.location.reload();

    } catch (error) {
      console.log(error)
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }


  useEffect(() => {
    setFirstName(profile?.firstName || '')
    setLastName(profile?.lastName || '')
    setEmail(profile?.email || '')
    setPhoneNumber(profile?.phoneNumber || '')
    setAddress(profile?.address || '')
    setZipCode(profile?.zipCode || 0)
    setCity(profile?.city || '')
    setCountry(profile?.country || '')
    setOccupation(profile?.occupation || '')
    setIban(profile?.iban || '')
    setBic(profile?.bic || '')
    setSiret(profile?.siret || 0)

  }, [profile])


  return (
    <>
      <Container maxWidth="md">

        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Modification de mon compte
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              disabled={email === "ottmann.alex@gmail.com"}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Numéro de téléphone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              type='number'
              label="Code postal"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              variant="outlined"
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Pays"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              variant="outlined"
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Poste"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              variant="outlined"
            />

            <TextField
              fullWidth
              type='number'
              label="Siret"
              value={siret}
              onChange={(e) => setSiret(e.target.value)}
              variant="outlined"
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="IBAN"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="BIC"
              value={bic}
              onChange={(e) => setBic(e.target.value)}
              variant="outlined"
            />
          </Stack>

          <Typography variant="caption" gutterBottom color={"error"}>
            Ces informations servent uniquement à pouvoir remplir la facture de votre client lors de son émission.
          </Typography>


          <Typography variant="h6" gutterBottom color={theme => theme.palette['warning'].main}>
            {error ? error : ''}
          </Typography>
          <Typography variant="h6" gutterBottom textAlign={'left'} color={theme => theme.palette['primary'].main}>
            {success && 'Modifications enregistrées'}
          </Typography>


          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {loading && 'Chargement...'}
            </Typography>
          </Stack>



          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} sx={{ mb: 3 }}>
            <Button

              variant="contained"
              color="primary"
              onClick={handleEditUser}
            >
              Modifier
            </Button>
            <Button

              variant="outlined"
              color="error"
              onClick={handleDeleteUserClickOpen}
            >
              Supprimer le compte
            </Button>
          </Stack>
        </Card>


      </Container >

      <Dialog
        open={openUserDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseUserDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="error">{"Supprimer le compte"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" >
            Êtes-vous sûr de vouloir supprimer votre compte ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDelete} color="success">
            Annuler
          </Button>
          <Button onClick={handleUserDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}