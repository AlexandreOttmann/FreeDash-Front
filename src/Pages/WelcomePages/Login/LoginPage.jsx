import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Card } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useReponsive';
import { useOutletContext } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
// components

import Iconify from '../../../components/iconify';
import Logo from '../../../components/logo/Logo';
import LoginForm from './LoginForm';

import AlreadyConnected from './AlreadyConnected';
//utils
import isLogged from '../../../utils/isLogged';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: 'auto',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.paper,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 20,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const onLoginClick = useOutletContext()


  const user = isLogged()

  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | DashFree </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Content de vous revoir !
            </Typography>
            <img src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        {user ? (<AlreadyConnected />) : (

          <Container maxWidth="sm">
            <Card>
              <StyledContent>
                <Typography variant="h4" gutterBottom>
                  Se connecter à FreeDash
                </Typography>

                <Typography variant="body2" >
                  Vous n'avez pas de compte ? {''}

                  <Link variant="subtitle2" to='/register' component={RouterLink}>S'inscrire</Link>
                </Typography>
                <Divider sx={{ my: 3 }}>
                  {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography> */}
                </Divider>
                <LoginForm />
              </StyledContent>
            </Card>
          </Container>
        )}
      </StyledRoot>
    </>
  );
}
