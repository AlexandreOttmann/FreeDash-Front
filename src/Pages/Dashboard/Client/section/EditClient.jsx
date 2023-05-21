import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { axiosInstance } from '../../../../api/axios';

import { Container, Typography, Divider, Stack, Button, Card, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


export default function EditMission({ details }) {

  // const { city, commentary, country, email, firstName, lastName, id, phoneNumber, provenance, address, zipCode, siret } = details


  const [address, setAddress] = useState(details?.address || '')
  const [city, setCity] = useState(details?.city || '')
  const [commentary, setCommentary] = useState(details?.commentary || '')
  const [country, setCountry] = useState(details?.country || '')
  const [email, setEmail] = useState(details?.email || '')
  const [firstName, setFirstName] = useState(details?.firstName || '')
  const [lastName, setLastName] = useState(details?.lastName || '')
  const [phoneNumber, setPhoneNumber] = useState(details?.phoneNumber || '')
  const [provenance, setProvenance] = useState(details?.provenance || '')
  const [zipCode, setZipCode] = useState(details?.zipCode || '')
  const [siret, setSiret] = useState(details?.siret || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEditClient = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.patch(`/clients/${details.id}`, {
        address,
        city,
        commentary,
        country,
        email,
        firstName,
        lastName,
        phoneNumber,
        provenance,
        zipCode,
        siret
      })
      console.log(response.data)
      setSuccess('Le client a bien été modifié')
      setLoading(false)
      window.location.reload();

    } catch (error) {
      console.log(error)
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }



  useEffect(() => {
    setFirstName(details?.firstName || '')
    setLastName(details?.lastName || '')
    setEmail(details?.email || '')
    setPhoneNumber(details?.phoneNumber || 0)
    setAddress(details?.address || '')
    setCity(details?.city || '')
    setCountry(details?.country || '')
    setCommentary(details?.commentary || '')
    setProvenance(details?.provenance || '')
    setZipCode(details?.zipCode || '')
    setSiret(details?.siret || '')



  }, [details])


  return (
    <>
      <Container maxWidth="md">

        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Informations du client
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
              label="Ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              variant="outlined"
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Pays"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Provenance</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={provenance}
                onChange={(e) => setProvenance(e.target.value)}

              >
                <MenuItem value={'Entreprise'}>Entreprise</MenuItem>
                <MenuItem value={'Particulier'}>Particulier</MenuItem>
              </Select>
            </FormControl>
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
              multiline
              rows={4}
              label="Commentaire"
              value={commentary}
              onChange={(e) => setCommentary(e.target.value)}
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