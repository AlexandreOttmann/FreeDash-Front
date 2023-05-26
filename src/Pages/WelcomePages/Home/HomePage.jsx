import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Card, Container, Typography, Button } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';

// Images
import dashboard from '/src/assets/illustrations/dashboard_illustration.png'
import dashboard2 from '/src/assets/illustrations/like_illustration.png'

// ----------------------------------------------------------------------

export default function HomePage() {

  return (
    <>
      <Helmet>
        <title>
          HomePage - FreeDash
        </title>
      </Helmet>

      <Card>
        <Container sx={{
          height: '20em',
          width: '200vw',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          // backgroundPosition: 'center',
          backgroundImage: `url(${'/src/assets/illustrations/herosection2.png'})`,
          filter: 'blur(5px)',
        }}
          maxWidth="xl" />
        <Container
          sx={{
            marginTop: '-1em',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Link
            to="/register"
          >
            <Button
              variant="contained"
              sx={{
                marginBottom: "2rem",
                height: '70%',

              }}
              startIcon={<Iconify icon="bi:lightning-charge-fill" />}
            >
              Rejoignez-nous
            </Button>
          </Link>
        </Container>

        <Container
          sx={{
            marginX: { xs: "0.05rem", md: "auto" },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            FreeDash
          </Typography>
          <Card
            sx={{
              py: 2,
              paddingX: 3,
              my: 5,
              textAlign: 'center',
              minHeight: '100%',
              minWidth: '100%',
              bgcolor: (theme) => theme.palette['info'].main,

            }}>
            <Typography
              variant="h4"
              sx={{
                marginTop: "3rem",
                marginBottom: "3rem",
                color: 'white'
              }}
            >
              Vous êtes freelance et vous cherchez à optimiser votre activité ?<br />
              Découvrez comment FreeDash vous aide à gérer vos projets, vos clients et votre facturation en toute simplicité.
            </Typography>
          </Card>

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
                    bgcolor: (theme) => theme.palette['warning'].main,
                    minHeight: '100%',
                    minWidth: '100%',
                    color: 'white'
                  }}>
                  <Typography variant="h5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis facere placeat nobis doloremque recusandae fuga ut animi tenetur at saepe.
                  </Typography>
                </Card>
              </Grid>


            </Grid>
          </Container>
        </Container>
      </Card>

    </>
  )
}
