import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { axiosInstance } from '../../../../api/axios';

import { Container, Typography, Divider, Stack, Button, Card, TextField } from '@mui/material';


export default function ProfileForm({ profile }) {


  const [firstName, setFirstName] = useState(profile?.firstName || '')
  const [lastName, setLastName] = useState(profile?.lastName || '')
  const [email, setEmail] = useState(profile?.email || '')
  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber || '')
  const [address, setAddress] = useState(profile?.address || '')
  const [zipCode, setZipCode] = useState(profile?.zipCode || '')
  const [city, setCity] = useState(profile?.city || '')
  const [country, setCountry] = useState(profile?.country || '')
  const [siret, setSiret] = useState(profile?.siret || '')
  const [iban, setIban] = useState(profile?.iban || '')
  const [bic, setBic] = useState(profile?.bic || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEditClient = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.patch(`/user/${profile.id}`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        zipCode,
        city,
        country,
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
    setPhoneNumber(profile?.phoneNumber || 0)
    setAddress(profile?.address || '')
    setZipCode(profile?.zipCode || '')
    setCity(profile?.city || '')
    setCountry(profile?.country || '')
    setIban(profile?.iban || '')
    setBic(profile?.bic || '')
    setSiret(profile?.siret || '')

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
              onChange={(e) => setSiret(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="BIC"
              value={bic}
              onChange={(e) => setSiret(e.target.value)}
              variant="outlined"
            />
          </Stack>







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
              onClick={handleEditClient}
            >
              Modifier
            </Button>
          </Stack>
        </Card>


      </Container>
    </>
  )
}