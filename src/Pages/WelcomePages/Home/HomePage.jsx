import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Card, Container, Typography, Button, Paper } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';

// Images
import preview from '../../../assets/preview.jpg';

// ----------------------------------------------------------------------

export default function HomePage() {

  return (
    <>
      <Helmet>
        <title>
          HomePage - FreeDash
        </title>
      </Helmet>

      <Paper sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // backgroundImage: `url(${'../../../../public/assets/preview.jpg'})`,
      }}>
        <Container
          sx={{
            marginX: { xs: "0.05rem", md: "auto" }
          }}
        >


          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            FreeDash
          </Typography>


          <Typography
            variant="h4"
            sx={{
              marginTop: "3rem",
              marginBottom: "5rem"
            }}
          >
            Vous êtes freelance et vous cherchez à optimiser votre activité ?<br />
            Découvrez comment FreeDash vous aide à gérer vos projets, vos clients et votre facturation en toute simplicité.
          </Typography>

          <Link
            to="/register"
          >
            <Button
              variant="contained"
              sx={{
                marginBottom: "5rem"
              }}
              startIcon={<Iconify icon="bi:lightning-charge-fill" />}
            >
              Rejoignez-nous
            </Button>
          </Link>

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
                <Card>
                  <img src={preview} alt="Dashboard preview" />
                </Card>
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
                <Typography variant="h5">
                  Accédez à toutes les informations nécessaires pour une bonne gestion de votre activité, le tout centralisé et accessible sur une seule et même page.
                </Typography>
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
                <Typography variant="h5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis facere placeat nobis doloremque recusandae fuga ut animi tenetur at saepe.
                </Typography>
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
                <Card>
                  <img src={preview} alt="Dashboard preview" />
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Paper>
    </>
  )
}
