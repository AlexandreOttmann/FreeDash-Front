import { Helmet } from "react-helmet-async"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Card, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

//hooks
import MotionSection from "../../../sections/@dashboard/user/MotionSection";

//utils
import { axiosPrivateInstance } from '../../../api/axios'

//styles
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


export default function NewClientPage() {
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [address, setAddress] = useState('')
  const [zipCode, setZipCode] = useState(75000)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [siret, setSiret] = useState(0)
  const [provenance, setProvenance] = useState('')
  const [commentary, setCommentary] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)


  const handleAddClient = async () => {
    if (email == '' || lastName == '' || firstName == '') {
      setSuccess('Veuillez remplir les champs obligatoires')
    }
    setLoading(true)
    if (error == '') {
      try {
        const response = await axiosPrivateInstance.post(`/clients`, {
          email,
          firstName,
          lastName,
          address,
          zipCode,
          city,
          country,
          phoneNumber,
          siret,
          provenance,
          commentary,
        })
        setSuccess('Le client a bien été ajouté')
        setLoading(false)
        navigate('/dashboard/client')

      } catch (error) {
        console.log(error.data)
        setError('Une erreur est survenue')
        setLoading(false)
      }
    } else {
      setLoading(false)
      setError('Veuillez corriger les erreurs')
    }

  }


  useEffect(() => {
    if (email && !EMAIL_REGEX.test(email)) {
      setError('Email invalide')
    } else {
      setError('')
    }
  }, [email])
  return (

    <>
      <Helmet>
        <title> Nouveau Client | DashFree </title>
      </Helmet>

      <StyledRoot>

        <Container maxWidth="md">
          <MotionSection delayTime={0.2}>
            <Typography variant="h4" gutterBottom>
              Ajouter un nouveau client
            </Typography>

            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Informations du client
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Prénom"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Stack>

              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  variant="outlined"
                  helperText={error}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="tel"
                  label="Téléphone"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Stack>

              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Adresse"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <TextField

                  fullWidth
                  label="Code Postal"
                  type="number"
                  variant="outlined"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <TextField

                  fullWidth
                  label="Ville"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <TextField

                  fullWidth
                  label="Pays"
                  variant="outlined"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />

              </Stack>


              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="SIRET"
                  type="number"
                  variant="outlined"
                  value={siret}
                  onChange={(e) => setSiret(e.target.value)}
                />
              </Stack>



              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type de client</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={provenance}
                    label="Type de client"
                    onChange={(e) => setProvenance(e.target.value)}
                  >

                    <MenuItem value={'Particulier'}>Particulier</MenuItem>
                    <MenuItem value={'Entreprise'}>Entreprise</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Commentaire"
                  variant="outlined"
                  value={commentary}
                  onChange={(e) => setCommentary(e.target.value)}
                />
              </Stack>
              <Stack>
                <Typography variant="body" sx={{ pb: 3, color: (theme) => theme.palette.error.main }}>
                  {success}
                </Typography>
              </Stack>
              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                <Button
                  disabled={error != ''}
                  variant="contained"
                  color="primary"
                  onClick={handleAddClient}
                >
                  Ajouter le client
                </Button>
              </Stack>

            </Card>


          </MotionSection>
        </Container>
      </StyledRoot>

    </>

  )
}