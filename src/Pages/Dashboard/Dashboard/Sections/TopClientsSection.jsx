import { Box, Card, CardHeader, Divider, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from '../../../../components/iconify/Iconify';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';

import { alpha, styled } from '@mui/material/styles';


const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: '3em',
  height: '3em',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

export default function TopClientsSection({ clients }) {

  return (
    <Card sx={{
      height: 'fit-content', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      minHeight: 250,

    }}>

      <CardHeader title={"Top Clients"} />

      {clients.length == 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', p: 3 }}>
          Vous n'avez pas encore ajouté de client
        </Typography>
      ) : (
        <Stack spacing={3} sx={{ p: 3 }} >
          {clients.map((client, index) => {
            while (index < 5) {
              return (
                <ClientItem client={client} index={index} key={index} />
              )
            }
          }
          )}
        </Stack>
      )}


      <Divider />

      <Link to='/dashboard/client' >
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button size="small" color="inherit" underline="hover" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            Tous les clients
          </Button>
        </Box>
      </Link>

    </Card>

  )


}


function ClientItem({ client, index }) {

  const { name, missions } = client;
  return (
    <Stack direction="row" alignItems="center" spacing={2} key={index}>

      <Box component="img" alt={name} src={`/src/assets/images/avatars/avatar_${Math.floor(Math.random() * (24 - 1) + 1)
        }.jpg`} sx={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" to={`/dashboard/client/${missions[0].clientId}`}>
          {name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          Nombre de missions: {missions.length}
        </Typography>
      </Box>
      {/* Displaying trophy for 3 first clients */}
      {index < 3 && (
        <StyledIcon
          sx={{
            ...(index == 0 && {
              color: (theme) => theme.palette['primary'].dark,
              backgroundColor: (theme) => theme.palette['primary'].light,
            }),
            ...(index == 1 && {
              color: (theme) => theme.palette['secondary'].dark,
              backgroundColor: (theme) => theme.palette['secondary'].light,
            }),
            ...(index == 2 && {
              color: (theme) => theme.palette['warning'].dark,
              backgroundColor: (theme) => theme.palette['warning'].light,
            }),
          }}
        >
          <Iconify icon={'ant-design:trophy-outlined'} width={24} height={24} />
        </StyledIcon>
      )

      }
    </Stack>
  )
}