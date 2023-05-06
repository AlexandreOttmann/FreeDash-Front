import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

import illustration from '../../../assets/illustrations/404_illustration.png';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Page Introuvable | FreeDash </title>
      </Helmet>

      <Container>

        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Oups, page introuvable!
          </Typography>

          <Box
            component="img"
            src={illustration}
            alt="404 Illustration"
            sx={{ mx: 'auto',  mb: '2rem', maxHeight: '30rem' }} 
          />

          <Typography variant="h6" sx={{ color: 'text.secondary', mb: '2rem'}}>
            Nous sommes désolés, nous n'arrivons pas à trouver la page que vous recherchez.<br/> Peut-être que vous avez tapé la mauvaise URL? Vérifiez le lien et réessayez.
          </Typography>

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Accueil
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
