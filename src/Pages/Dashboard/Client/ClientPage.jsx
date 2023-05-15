import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../api/axios';
import { useCallback, useEffect, useState } from 'react';

// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import { ClientCard, ClientSearch, ClientSort } from '../../../sections/@dashboard/user/clients';
// mock
import Account from '../../../_mock/account';
import { retrieveUserId } from '../../../utils/retrieveUserId';


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------


export default function ClientsPage() {

  const userId = retrieveUserId()

  //! ==============API=================
  const [clients, setClients] = useState([]);

  const getClients = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/user/1/client');
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(clients);

  useEffect(() => {
    getClients();
  }, [getClients]);

  //========================================
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
          <ClientSearch clients={Account} />
          {/* <ClientSort options={SORT_OPTIONS} /> */}
        </Stack>

        {/* <Grid container spacing={3}>
          {Account.map((post, index) => (
            <ClientCard key={post.id} post={post} index={index} />
          ))}
        </Grid> */}
      </Container>
    </>
  )
}