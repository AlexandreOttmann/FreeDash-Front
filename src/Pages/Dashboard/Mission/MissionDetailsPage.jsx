import { useState, useEffect, forwardRef } from "react";
import { Helmet } from "react-helmet-async"
import { useParams } from 'react-router';
import { useNavigate, Link } from "react-router-dom";
//utils
import { axiosPrivateInstance } from '../../../api/axios'


//mui
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Avatar, Container, Typography, Divider, Stack, Button, Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
//Component
import EditMission from "./Sections/EditMission";
import SvgColor from "../../../components/svg-color/SvgColor";
import Label from "../../../components/label/Label";
import { fDatefr } from "../../../utils/formatTime";
import MotionSection from "../../../sections/@dashboard/user/MotionSection";
import GeneratePdf from "../../../components/generatePdf/GeneratePdf";
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

const StyledButton = styled('span')(({ theme }) => ({
  mixBlendMode: 'difference',
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));



export default function MissionDetailsPage() {
  //hooks
  const theme = useTheme()
  const navigate = useNavigate();

  const [mission, setMission] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      await axiosPrivateInstance.delete(`/mission/${idmission}`)
      navigate('/dashboard/mission')
    } catch (error) {
      console.log("La mission n'a pas pu être supprimée", error)
    }
  }


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
      const response = await axiosPrivateInstance.get(`/mission/${idmission}`)
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
        <MotionSection delayTime={0.3}>
          {mission.length !== 0 ? (
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
                <StyledAvatar alt={mission?.clientFirstName} src={`/assets/images/avatars/avatar_${Math.floor(Math.random() * (24 - 1 + 1) + 1)}.jpg`} sx={{
                  width: 100, height: 100,
                }} />


                <StyledCover alt={mission?.clientFirstName} src={`/assets/images/covers/cover_${Math.floor(Math.random() * (24 - 1 + 1) + 1)}.jpg`} />

                <StyledInfo>
                  <StyledButton>
                    <Button variant="text" sx={{ minHeight: 50 }} onClick={handleClickOpen}>Modifier la mission</Button>
                  </StyledButton>
                </StyledInfo>
              </StyledCardMedia>
              <Stack spacing={3} sx={{ mt: 3, p: 3 }}>
                <Stack direction="row" spacing={2} sx={{ mt: 3, p: 3, justifyContent: 'space-between' }}>
                  <Typography variant="h6" gutterBottom >
                    {mission?.name}
                  </Typography>
                  <Stack direction={'column'} alignItems={'start'}>
                    <Typography variant="h6" gutterBottom sx={{ zIndex: 10 }}>
                      Client :
                      <Link to={`/dashboard/client/${mission?.client_id}`}>{' '}{mission?.clientFirstName} {mission?.clientLastName}</Link>
                    </Typography>
                    <GeneratePdf missionId={idmission} isMissionList={false} />
                  </Stack>
                </Stack>
                <Divider />
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Date de début
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {fDatefr(mission?.startDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Date de fin
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {fDatefr(mission?.endDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Prix total
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {mission?.totalPrice}€ HT
                    </Typography>
                    {mission?.tva > 0 && (
                      <Typography variant="body2" gutterBottom>
                        {mission?.totalPrice - (mission?.totalPrice * mission?.tva / 100)}€ TTC
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Tva
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {mission?.tva}%
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Statut
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <Label color={(mission?.status === 'En Cours' && 'warning') || 'success'}>{mission?.status}</Label>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Déclarée
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <Label color={(mission?.declarate === 'Non' && 'success') || 'error'}>{mission?.declarate ? 'Oui' : 'Non'}</Label>

                    </Typography>
                  </Grid>
                  <Divider sx={{ width: '100%', my: 2 }} />
                  <Grid item xs={12} sm={6}>

                    <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom >
                      Commentaire
                    </Typography>
                    <Typography variant="body2">
                      {mission?.commentary ? mission?.commentary : 'Aucun commentaire'}
                    </Typography>
                  </Grid>
                </Grid>
                <StyledInfo>
                  <Button onClick={handleDeleteClickOpen} color="error">
                    Supprimer la mission
                  </Button>
                </StyledInfo>
              </Stack>
            </Card>) : (
            <Typography variant="h4" sx={{ my: 5 }} align="center">Aucune mission correspondante...</Typography>
          )}
        </MotionSection>

        <Dialog
          open={openDelete}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDelete}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle color="error">Supprimer la mission</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Êtes-vous sûr de vouloir supprimer cette mission ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="success">Annuler</Button>
            <Button onClick={handleDelete} color="error">Supprimer</Button>
          </DialogActions>
        </Dialog>


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