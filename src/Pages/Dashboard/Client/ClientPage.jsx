import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { Link } from 'react-router-dom';
import { axiosPrivateInstance } from '../../../api/axios';
import { useCallback, useEffect, useState } from 'react';

import { ClientCard, ClientSearch } from './section';


// ----------------------------------------------------------------------


export default function ClientsPage() {

  //! ==============API=================
  const [clients, setClients] = useState([]);

  const getClients = useCallback(async () => {
    try {
      const response = await axiosPrivateInstance.get(`/clients`);
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
        {clients.length === 0 ? (
          <>
            <Typography variant="h4" sx={{ my: 5 }} align="center">Vous n'avez pas encore ajouté de client</Typography>
            <Link to='/dashboard/newclient'><Typography variant='body1' align="center">Voulez-vous ajouter un premier client ?</Typography></Link>
          </>
        ) : (
          <>
            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
              <ClientSearch clients={clients} />
              {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
            </Stack>
            <Grid container spacing={3}>
              {clients.map((client, index) => (
                <ClientCard key={index} client={client} index={index} />
              ))}
            </Grid>
          </>
        )}
      </Container>
    </>
  )
}