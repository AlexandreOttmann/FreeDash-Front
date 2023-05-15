import { Link } from 'react-router-dom';


//mui
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Button, Box, Container, Grid, CardMedia } from "@mui/material";

//utils
import Iconify from '../../../../components/iconify/Iconify';

import dashboard from '../../../../assets/illustrations/dashboard_illustration.png'


const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));



export default function WelcomeSection({ color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 2,
        boxShadow: 0,
        paddingX: 3,
        color: (theme) => theme.palette['primary'].darker,
        bgcolor: (theme) => theme.palette['primary'].lighter,

      }}
    >
      <Grid container spacing={3}>

        <Grid item xs={8} margin={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
          <Typography variant="h4" noWrap>Bienvenue sur votre Dashboard</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Wesh Keny
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
          <CardMedia
            component="img"
            image={dashboard}
            height="250"
            alt="illustration" />


        </Grid>
      </Grid>
    </Card>
  )
}