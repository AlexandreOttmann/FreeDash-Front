import { useState, useEffect, forwardRef } from "react";
import { Helmet } from "react-helmet-async"
import { useParams } from 'react-router';
//utils
import { axiosInstance } from '../../../api/axios'
import { retrieveUserId } from '../../../utils/retrieveUserId';

//mui
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Avatar, Container, Typography, Divider, Stack, Button, Card, CardContent, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

//Component
import EditMission from "./Sections/EditMission";
import SvgColor from "../../../components/svg-color/SvgColor";
import Iconify from "../../../components/iconify/Iconify";

//Handle slide up transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


// -----------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
  zIndex: 0,
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  position: 'absolute',
  zIndex: 10,
  left: theme.spacing(3.8),
  bottom: theme.spacing(-6),
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));




export default function MissionDetailsPage() {

  const [mission, setMission] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [open, setOpen] = useState(false)

  const { idmission } = useParams()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const GetMission = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/mission/${idmission}`)
      // const response = await axiosInstance.get(`/user/1/clients`)
      console.log(response.data)
      setMission(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }


  useEffect(() => {
    GetMission()
    console.log(mission)
  }, [])

  return (

    <>
      <Helmet>
        <title> Détails de la mission | DashFree </title>
      </Helmet>

      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Détails de la mission
        </Typography>
        {/* <Card sx={{ mt: 3, p: 3 }}> */}

        <Card sx={{ position: 'relative' }}>
          <StyledCardMedia
            sx={{
              pt: {
                xs: 'calc(100% * 2 / 3)',
                sm: 'calc(100% * 1 / 4.66)',
              },
            }}>
            <SvgColor
              color="paper"
              src="/assets/icons/shape-avatar.svg"
              sx={{
                width: 80 * 3,
                height: 36 * 3,
                zIndex: 9,
                left: -40,
                bottom: -47,
                position: 'absolute',
                color: 'background.paper',
              }}
            />
            <StyledAvatar alt={mission?.clientFirstName} src="/src/assets/images/avatars/1.jpg" sx={{
              width: 100, height: 100,
            }} />
            <Typography variant="h6" gutterBottom sx={{ zIndex: 10 }}>
              {mission?.clientFirstName} {mission?.clientLastName}
            </Typography>

            <StyledCover alt={mission?.clientFirstName} src="/src/assets/images/covers/cover_12.jpg" />

            <StyledInfo>
              <Button variant="outline" sx={{ minHeight: 50 }} onClick={handleClickOpen}>Modifier la mission</Button>
            </StyledInfo>
          </StyledCardMedia>


          <Stack spacing={3} sx={{ mt: 3, p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ pt: 3 }}>
              {mission?.name}
            </Typography>
            <Divider />

            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mt: 3 }}>
              <Stack spacing={2} sx={{ width: { md: '50%' } }}>
                <Typography variant="subtitle2" gutterBottom>
                  Date de début
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {mission?.startDate}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Date de fin
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {mission?.endDate}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Statut
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {mission?.status}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Prix total
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {mission?.totalPrice}€
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Tva
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {mission?.tva}%
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Déclarée
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {mission?.declared ? 'Oui' : 'Non'}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Commentaire
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {mission?.commentary}
                </Typography>

              </Stack>

            </Stack>






          </Stack>

        </Card>
        {/* </Card > */}


        <Dialog
          scroll="body"
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Modifier la mission</DialogTitle>
          <DialogContent>
            <EditMission details={mission} missionId={idmission} handleClose={handleClose} />
          </DialogContent>
        </Dialog>


      </Container >
    </>
  )
}