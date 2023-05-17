import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Button } from '@mui/material';

// utils
import { fDatefr } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
//
import SvgColor from '../../../../components/svg-color';
import Iconify from '../../../../components/iconify';
import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../../../../api/axios';
import { retrieveUserId } from '../../../../utils/retrieveUserId';

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

  const { firstName, lastName, createdAt, id } = client;


  const userId = retrieveUserId()

  const [missionsNumber, setMissionsNumber] = useState(0);

  const getMissionsNumber = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`user/1/mission`);
      // const response = await axiosInstance.get(`user/${userId}/mission`);

      const filteredList = response.data.filter(mission => mission.clientId !== id)

      console.log('la reponse', filteredList)

      setMissionsNumber(response.data);

    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {
    getMissionsNumber()
  }, [getMissionsNumber])


  //! number à modifier pour prendre le nombre de missions du client ici j'ai mis id en attendant pour afficher un nombre
  const POST_INFO = [
    { number: id, icon: 'eva:file-text-outline' },
  ];

  console.log(client)
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative', ...cardStyles }}>
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
            src={`../../../../assets/images/avatars/avatar_${Math.floor(Math.random() * 23 + 1)}.jpg`}
          />

          <StyledCover alt={firstName} src={`/src/assets/images/covers/cover_${Math.floor(Math.random() * 23 + 1)}.jpg`} />
        </StyledCardMedia>

        <CardContent>

          <Typography variant="h4">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            Date de création : {fDatefr(createdAt)}
          </Typography>


          <StyledInfo>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 1.5,
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </StyledInfo>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Link href={`/dashboard/client/${id}`} underline="none">
              <Button size="medium" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
                Détails du client
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Grid >
  );
}