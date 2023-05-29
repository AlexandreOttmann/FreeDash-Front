/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { axiosPrivateInstance } from '../../../../api/axios';

import { Container, Typography, Divider, Stack, Button, Card, TextField } from '@mui/material';


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
      console.log(response.data)
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






          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {error && 'erreur'}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {success && 'success'}
            </Typography>
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {loading && 'loading'}
            </Typography>
          </Stack>



          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Button

              variant="contained"
              color="primary"
              onClick={handleEditUser}
            >
              Modifier
            </Button>
          </Stack>
        </Card>


      </Container >
    </>
  )
}