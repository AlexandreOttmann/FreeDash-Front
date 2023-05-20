import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../../../api/axios';
import { retrieveUserId } from '../../../utils/retrieveUserId';

// @mui
import {
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
// sections
import DetailsSection from './section/DetailsSection';
import ClientListMission from './section/ClientListMission';
import ClientCommentary from './section/ClientCommentary';
import { set } from 'lodash';

// ----------------------------------------------------------------------

export default function ClientDetailsPage() {
  const { idclient } = useParams();
  const userId = retrieveUserId()
  //! ==============API=================
  const [client, setClient] = useState([]);
  const [missions, setMissions] = useState([]);
  const [missionsNumber, setMissionsNumber] = useState(0);

  //fetching client details
  const getClient = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clients/${idclient}`);
      console.log("client:", response.data)
      setClient(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //fetching mission list from client
  const getMissions = async () => {
    try {
      const response = await axiosInstance.get(`/user/${userId}/mission/${idclient}`);
      console.log("DANS LE FET SA MERE", response.data)
      setMissions(response?.data);
      setMissionsNumber(response?.data?.length)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getClient();
    getMissions();

  }, [getClient]);

  return (
    <>
      <Helmet>
        <title> Liste des clients </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          </Typography>
          <Button component={Link} to="/dashboard/newclient" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau Client
          </Button>
        </Stack>
        <DetailsSection client={client} missionsNumber={missionsNumber} />
        <ClientCommentary client={client} />
        <ClientListMission missions={missions} />
      </Container>
    </>
  );
}