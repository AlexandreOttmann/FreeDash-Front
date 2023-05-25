import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Typography, CardContent, Button, Stack } from '@mui/material';

// utils
import { fDatefr } from '../../../../utils/formatTime';
import SvgColor from '../../../../components/svg-color';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});


const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const cardStyles = {
  position: 'relative',
  transition: 'transform 0.25s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    zIndex: 1,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
};

// ----------------------------------------------------------------------

ClientCard.propTypes = {
  client: PropTypes.object.isRequired,
};

export default function ClientCard({ client }) {

  const { firstName, lastName, createdAt, id, email } = client;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative', ...cardStyles }}>
        <Link to={`/dashboard/client/${id}`} >
          <StyledCardMedia>
            <SvgColor
              color="paper"
              src="/assets/icons/shape-avatar.svg"
              sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: 'absolute',
                color: 'background.paper',
              }}
            />
            <StyledAvatar
              alt={firstName}
              src={`/src/assets/images/avatars/avatar_${Math.floor(Math.random() * 23 + 1)}.jpg`}
            />

            <StyledCover alt={firstName} src={`/src/assets/images/covers/cover_${Math.floor(Math.random() * 23 + 1)}.jpg`} />
          </StyledCardMedia>


          <CardContent sx={{ height: '15em', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h4">
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
              Date de création : {fDatefr(createdAt)}
            </Typography>
            <StyledInfo>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 1.5,
                }}
              >
              </Box>

            </StyledInfo>
            <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 1 }}>
              <Typography variant="caption">{email}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button size="medium" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
                  Détails du client
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Link>
      </Card>
    </Grid >
  );
}