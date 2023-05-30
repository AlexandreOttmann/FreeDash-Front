import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Card, Container, Typography, Button, Stack, Box } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';

//store
import { useSelector } from 'react-redux';
//utils
import useResponsive from '../../../hooks/useReponsive';

// ----------------------------------------------------------------------

export default function HomePage() {
  const isDarkMode = useSelector(state => state.user.isDarkMode)

  const isDesktop = useResponsive('up', 'md');
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
            py: { sm: 15, md: 10 },
            paddingY: 5,
            minHeight: '100%',
            wordWrap: 'break-word',
            minWidth: '100%',
            bgcolor: !isDarkMode ? (theme) => theme.palette['info'].lighter : (theme) => theme.palette['success'].main,


          }}>
            <Grid item xs={6} sx={{ maxWidth: '730px' }}>
              <Typography variant="h1" sx={{ mb: 3 }} textAlign={
                { xs: 'center', md: 'left' }

              }>
                FreeDash
              </Typography>
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
              <Stack direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3, gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/register"
                >
                  S'inscrire
                </Button>
                <Button
                  variant={isDarkMode ? "contained" : "outlined"}
                  color={isDarkMode ? "error" : "primary"}
                  component={Link}
                  to="/login"

                >
                  Se connecter
                </Button>
              </Stack>


              <Stack direction={{ xs: 'column', md: 'row' }} sx={{ my: 5, gap: 2, flexWrap: 'wrap' }}>
                <Stack direction="row" alignItems={"center"} gap={1}>
                  <Iconify icon="eva:gift-fill" width={15} />
                  <Typography
                    variant="body2"
                    align='start'
                  >
                    Sans engagement
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems={"center"} gap={1} >
                  <Iconify icon="eva:flash-outline" width={15} />
                  <Typography
                    variant="body2"
                    align='start'
                  >
                    Prise en main rapide
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems={"center"} gap={1} >
                  <Iconify icon="eva:smiling-face-fill" width={15} />
                  <Typography
                    variant="body2"
                    align='start'
                  >
                    Suivi détailé
                  </Typography>
                </Stack>
              </Stack>

            </Grid>
            {isDesktop && (

              <Grid item sx={{ height: '670px', marginTop: { sm: 0, md: -15 }, marginBottom: { sm: 0, md: -15 } }} xs={6}>
                <Container sx={{
                  position: 'relative',

                }}>
                  <Box sx={{
                    position: { sm: 'relative', md: 'absolute' },
                    height: { sm: '500px', md: '670px' },
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
            )}
          </Grid>
        </Container>

        {!isDesktop && (
          <Card sx={{
            height: '100%',
            // maxWidth: '582px',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: (theme) => theme.palette['primary'].lighter,
          }}>
            <img style={{ objectFit: 'contain', width: '600px' }} src="/assets/illustrations/dashboard_illustration.png" alt="illustration" />
          </Card>


        )}
      </Container>

    </>
  )
}
