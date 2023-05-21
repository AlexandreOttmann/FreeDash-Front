import { useState, useEffect } from "react";


//mui

import { Container, Typography, Divider, Stack, Button, Card, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Scrollbar from "../../../../components/scrollbar/Scrollbar";
//mui date
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import fr from 'dayjs/locale/fr'
import { frFR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

//hooks

import { retrieveUserId } from '../../../../utils/retrieveUserId';
import { axiosInstance } from "../../../../api/axios";




export default function EditMission({ details, missionId, handleClose }) {
  console.log('detail', details)


  const userId = retrieveUserId()

  const now = dayjs()
  const weekLater = dayjs().add(7, 'day')

  const [name, setName] = useState(details?.name || '')
  const [startDate, setStartDate] = useState(details?.startDate || now)
  const [endDate, setEndDate] = useState(details?.endDate || weekLater)
  const [status, setStatus] = useState('En Cours')
  const [totalPrice, setTotalPrice] = useState(details?.totalPrice || 0)
  const [tva, setTva] = useState(0)
  const [commentary, setCommentary] = useState(details?.commentary || '')
  const [declarate, setDeclarate] = useState(false)
  const [clientId, setClientId] = useState(details?.clientId || '')
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

  const handleEditMission = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.patch(`/mission/${missionId}`, {
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
      setSuccess('La mission a bien été modifiée')
      setLoading(false)
      window.location.reload();
      handleClose()
    } catch (error) {
      console.log(error)
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  useEffect(() => {
    GetClientList()
    setName(details.name)
    setTotalPrice(details.totalPrice)
    setTva(details.tva)
    setCommentary(details.commentary)
    setDeclarate(details.declarate)
    setClientId(details.clientId)
    setStatus(details.status)

    const formattedStartDate = dayjs(details.startDate, "YYYY-MM-DD");
    const formattedEndDate = dayjs(details.endDate, "YYYY-MM-DD");
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);


  }, [details])

  return (
    <>

      <Container maxWidth="md">


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
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Nom de la mission"
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
                    onChange={(date) => setStartDate(date.format("YYYY-MM-DD"))}
                  />
                  <DatePicker
                    fullWidth
                    label="Date de fin"
                    value={endDate}
                    onChange={(date) => setEndDate(date.format("YYYY-MM-DD"))}
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
              </Stack>
              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
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
                  onClick={handleEditMission}
                >
                  Modifier la mission
                </Button>
              </Stack>

            </Card>
          )}

      </Container>

    </>

  )
}