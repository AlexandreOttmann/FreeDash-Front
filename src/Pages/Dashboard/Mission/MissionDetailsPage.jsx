import { useState, useEffect, forwardRef } from "react";
import { Helmet } from "react-helmet-async"
import { useParams } from 'react-router';
//utils
import { axiosInstance } from '../../../api/axios'
import { retrieveUserId } from '../../../utils/retrieveUserId';

//mui
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Container, Typography, Divider, Stack, Button, Card, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

//Component
import EditMission from "./Sections/EditMission";

//Handle slide up transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


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

        <Button variant="outlined" onClick={handleClickOpen}>Modifier la mission</Button>

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
            <EditMission details={mission} missionId={idmission} />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button> */}
          </DialogActions>
        </Dialog>



      </Container>
    </>
  )
}