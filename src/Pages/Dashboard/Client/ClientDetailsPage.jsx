import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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

// ----------------------------------------------------------------------

export default function ClientDetailsPage() {

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
        <DetailsSection />
        <ClientCommentary />
        <ClientListMission />
      </Container>
    </>
  );
}