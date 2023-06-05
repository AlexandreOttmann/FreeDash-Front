import { Link } from 'react-router-dom';
import * as LottiePlayer from "@lottiefiles/lottie-player";

//mui
import { Card, Typography, Button, Grid } from "@mui/material";

//utils
import Iconify from '../../../../components/iconify/Iconify';


export default function WelcomeSection({ sx, ...other }) {
  return (
    <Card
      sx={{
        py: 2,
        paddingX: 3,
        color: 'black',
        bgcolor: (theme) => theme.palette['primary'].lighter,
        minHeight: '100%',
        minWidth: '100%',
      }}
    >
      <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>

        <Grid item xs={12} md={6} margin={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyItems: 'space-between', gap: 3 }}>
          <Typography variant="h4" >Bienvenue sur votre Dashboard</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Nous espérons que vous trouverez ici toutes les informations dont vous avez besoin.
          </Typography>

          <Link to='/dashboard/newmission'>
            <Button
              variant="contained"
              sx={{
                marginY: "1rem",
              }}
              startIcon={<Iconify icon="bi:add-fill" />}
            >
              Nouvelle mission
            </Button>
          </Link>
        </Grid>

        <Grid item>
          <lottie-player
            autoplay
            loop
            mode="normal"
            style={{ height: "250px" }}
            src="https://assets6.lottiefiles.com/packages/lf20_BgywoUBeiL.json"
          />

        </Grid>
      </Grid>
    </Card>
  )
}