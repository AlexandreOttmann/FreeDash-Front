import { Helmet } from "react-helmet-async"
import { useState, useEffect } from "react";

//mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button, Card, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

//mui date
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import fr from 'dayjs/locale/fr'
import { frFR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
//hooks
import useResponsive from '../../../hooks/useReponsive';
import { retrieveUserId } from '../../../utils/retrieveUserId';
import { axiosInstance } from '../../../api/axios'

//styles
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


export default function NewMissionPage() {

  const userId = retrieveUserId()

  const now = dayjs()
  const weekLater = dayjs().add(7, 'day')

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState(now)
  const [endDate, setEndDate] = useState(weekLater)
  const [status, setStatus] = useState('En Cours')
  const [totalPrice, setTotalPrice] = useState(0)
  const [tva, setTva] = useState(0)
  const [commentary, setCommentary] = useState('')
  const [declarate, setDeclarate] = useState(false)
  const [clientId, setClientId] = useState('')
  const [clientList, setClientList] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)



  const GetClientList = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/user/${userId}/clients`)
      // const response = await axiosInstance.get(`/user/1/clients`)
      console.log(response.data)
      setClientList(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  const handleAddMission = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.post(`/user/${userId}/mission`, {
        // const response = await axiosInstance.post(`/user/1/mission`, {
        name, //string
        startDate, //date
        endDate, //date
        status, //string
        totalPrice, //number
        tva, //number
        commentary, //string
        declarate, //boolean
        clientId,
      })
      console.log('requête lancée avec les données : ', response)
      setSuccess('La mission a bien été ajoutée')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  useEffect(() => {
    GetClientList()
    console.log(clientList)
  }, [])


  return (
    <>
      <Helmet>
        <title> Nouvelle mission | DashFree </title>
      </Helmet>

      <StyledRoot>

        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Créer une nouvelle mission
          </Typography>

          {!clientList ?
            (<Typography variant="h1" gutterBottom position={'center'}>
              Vous devez d'abord créer un client
            </Typography>) : (


              <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Informations de la mission
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Nom"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                </Stack>

                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>

                  <LocalizationProvider dateAdapter={AdapterDayjs}
                    adapterLocale="fr"
                    localeText={frFR}>
                    <DatePicker
                      fullWidth
                      label="Date de début"
                      value={startDate}
                      onChange={(e) => (
                        console.log(e),
                        setStartDate(e))}
                    />
                    <DatePicker
                      fullWidth
                      label="Date de fin"
                      value={endDate}
                      onChange={(e) => setEndDate(e)}
                    />
                  </LocalizationProvider>

                </Stack>

                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value={'En Cours'}>En cours</MenuItem>
                      <MenuItem value={'Terminé'}>Terminé</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Prix total"
                    type="number"
                    variant="outlined"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="TVA"
                    variant="outlined"
                    value={tva}
                    onChange={(e) => setTva(e.target.value)}
                  />
                </Stack>

                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                  <TextField

                    fullWidth
                    label="Commentaire"
                    variant="outlined"
                    value={commentary}
                    onChange={(e) => setCommentary(e.target.value)}
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Déclaré</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={declarate}
                      onChange={(e) => setDeclarate(e.target.value)}
                      label="Déclaré"
                    >

                      <MenuItem value={true}>Oui</MenuItem>
                      <MenuItem value={false}>Non</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Client</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      label="Client"
                      required
                    >
                      {/* MAP des CLIENTS */}

                      {clientList.map((client) => (
                        <MenuItem key={client.id} value={client.id}>{client.firstName} {client.lastName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    onClick={handleAddMission}
                  >
                    Créer une nouvelle mission
                  </Button>
                </Stack>

              </Card>

            )}
        </Container>
      </StyledRoot>

    </>
  )
}