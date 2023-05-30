import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Card, Container, Typography, Button, Stack, Box } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';

// Images
import dashboard from '/assets/illustrations/dashboard_illustration.png'
import dashboard2 from '/assets/illustrations/like_illustration.png'

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

        <Container
          sx={{
            marginX: { xs: "0.05rem", md: "auto" },
            justifyContent: 'center',
            alignItems: 'stretch',
            paddingY: '3.75rem',
            width: '100%',
          }}
        >


          <Grid container columns={{ sm: 4, md: 12 }} sx={{
            paddingLeft: 8,
            paddingRight: 8,
            py: 10,
            minHeight: '100%',
            wordWrap: 'break-word',
            minWidth: '100%',
            bgcolor: (theme) => theme.palette['info'].lighter,

          }}>
            <Grid item xs={6} sx={{ maxWidth: '730px' }}>
              <Stack direction='column' sx={{ mb: 3, maxWidth: '730px', alignItems: 'start' }}>
                <Typography
                  variant="h3"
                  align='start'
                >
                  Vous êtes freelance et vous cherchez à optimiser votre activité ?
                </Typography>
                <Typography
                  variant="body"
                  align='start'
                >
                  Découvrez comment FreeDash vous aide à gérer vos projets, vos clients et votre facturation en toute simplicité.
                </Typography>
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/register"
                >
                  S'inscrire
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/login"

                >
                  Se connecter
                </Button>
              </Stack>
            </Grid>
            <Grid item sx={{ height: '670px', marginTop: -15, marginBottom: -15, }} xs={6}>
              <Container sx={{
                position: 'relative',

              }}>
                <Box sx={{
                  position: 'absolute',
                  height: '670px',

                  top: 0,
                  left: 0,

                  zIndex: 1,


                }} >
                  <Card sx={{
                    height: '100%',
                    maxWidth: '582px',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: (theme) => theme.palette['primary'].lighter,
                  }}>
                    <img style={{ objectFit: 'contain', width: '600px' }} src="/assets/illustrations/dashboard_illustration.png" alt="illustration" />
                  </Card>
                </Box>
              </Container>


            </Grid>
          </Grid>





        </Container>






        <Container>
          <Grid container
            spacing={10}
            sx={{
              marginBottom: "5rem"
            }}
          >
            <Grid item
              xs={12}
              sm={6}
              md={6}
              sx={{
                width: "100%",
                margin: "auto"
              }}
            >
              <img src={dashboard} alt="Dashboard preview" />
            </Grid>

            <Grid item
              xs={12}
              sm={6}
              md={6}
              sx={{
                width: "100%",
                margin: "auto"
              }}
            >
              <Card
                sx={{
                  py: 2,
                  paddingX: 3,
                  bgcolor: (theme) => theme.palette['primary'].main,
                  minHeight: '100%',
                  minWidth: '100%',
                  color: 'white'
                }}>
                <Typography variant="h5" >
                  Accédez à toutes les informations nécessaires pour une bonne gestion de votre activité, le tout centralisé et accessible sur une seule et même page.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Container>
          <Grid container spacing={10}>
            <Grid item
              xs={12}
              sm={6}
              md={6}
              sx={{
                width: "100%",
                margin: "auto"
              }}
            >
              <img src={dashboard2} alt="Dashboard preview" />
            </Grid>
          </Grid>
        </Container>

      </Container>

    </>
  )
}
