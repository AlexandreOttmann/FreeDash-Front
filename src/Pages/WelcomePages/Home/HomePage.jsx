import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Card, Container, Typography, Button } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';

import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledCard = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '10px',
  alignItems: 'center',
  width: theme.spacing(50),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  backgroundColor: 'red'
}));

// ----------------------------------------------------------------------

export default function HomePage() {

  return (
    <>
    <Helmet>
      <title>
        HomePage - FreeDash
      </title>
    </Helmet>
   <Container>
    
      <h1>
        FreeDash
      </h1>

      <Typography 
        variant="body1"
      >
        Soyez en total contrôle, en permanence.<br/>
        Gérez vos missions à la perfection avec FreeDash.
      </Typography>

      <Link 
        to="/register"
      >
          <Button
            variant="contained"
            startIcon={<Iconify icon="bi:lightning-charge-fill" />}
            >
            Get started
          </Button>
      </Link>

        
      <Container>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
                <Typography variant="button">
                  Photo
                </Typography>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
                <Typography variant="button">
                  Photo
                </Typography>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
                <Typography variant="button">
                  Photo
                </Typography>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
                <Typography variant="button">
                  Photo
                </Typography>
            </StyledCard>
          </Grid>
          
        </Grid>
      </Container>


      <ul>
        <li>
          <Link to="/register">Créer un compte</Link>
        </li>

        <li>
          <Link to="/login">Se connecter</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/about">A propos</Link>
        </li>

        <li>
          <Link to="/dashboard">dashboard</Link>
        </li>
      </ul>
    </Container>
    
    </>
  )
}
