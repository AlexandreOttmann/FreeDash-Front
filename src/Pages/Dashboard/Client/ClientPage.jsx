import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../api/axios';
import { useCallback, useEffect, useState } from 'react';

import { ClientCard, ClientSearch } from './section';
// mock
// import Account from '../../../_mock/account';
import { retrieveUserId } from '../../../utils/retrieveUserId';
import { UserListToolbar } from '../../../sections/@dashboard/user';

// ----------------------------------------------------------------------


export default function ClientsPage() {

  // const userId = retrieveUserId()

  //! ==============API=================
  const [clients, setClients] = useState([]);

  const getClients = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/user/1/clients');
      // const response = await axiosInstance.get(`/user/${userId}/clients`);
      setClients(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getClients();
  }, [getClients]);

  //==============UTILS FOR STATES====================

  // const [selected, setSelected] = useState([]);
  // const [filterName, setFilterName] = useState('');
  // const [page, setPage] = useState(0);


  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  return (
    <>
      <Helmet>
        <title> Liste des clients </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Liste des clients
          </Typography>
          <Button component={Link} to="/dashboard/newclient" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau Client
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ClientSearch clients={clients} />
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

        </Stack>
        <Grid container spacing={3}>
          {clients.map((client, index) => (
            <ClientCard key={index} client={client} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  )
}