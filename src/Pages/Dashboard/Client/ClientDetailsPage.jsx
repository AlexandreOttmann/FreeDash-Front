import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useCallback, useEffect, useState, forwardRef } from 'react';

//hooks
import { axiosPrivateInstance } from '../../../api/axios';
import { retrieveUserId } from '../../../utils/retrieveUserId';

// @mui
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

import {
  Button,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';

// sections
import DetailsSection from './section/DetailsSection';
import ClientListMission from './section/ClientListMission';
import ClientCommentary from './section/ClientCommentary';


// ----------------------------------------------------------------------

//Handle slide up transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));


export default function ClientDetailsPage() {

  // Getting hooks
  const navigate = useNavigate();
  const { idclient } = useParams();

  // ==============States API=================
  const [client, setClient] = useState([]);
  const [missions, setMissions] = useState([]);
  const [missionsNumber, setMissionsNumber] = useState(0);

  // ==============States UTILS=================
  const [totalGain, setTotalGain] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);

  //handle modal
  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      await axiosPrivateInstance.delete(`/clients/${idclient}`)
      navigate('/dashboard/client')
    } catch (error) {
      console.log("La mission n'a pas pu être supprimée", error)
    }
  }

  //fetching client details
  const getClient = useCallback(async () => {
    try {
      const response = await axiosPrivateInstance.get(`/clients/${idclient}`);
      setClient(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //fetching mission list from client
  const getMissions = async () => {
    try {
      const response = await axiosPrivateInstance.get(`/missions/${idclient}`);
      setMissions(response?.data);
      console.log(response?.data);
      setMissionsNumber(response?.data?.length)
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = useCallback(() => {
    let total = 0;
    missions?.forEach((mission) => {
      total += +mission.totalPrice;
    });
    setTotalGain(total);
  }, [missions]);


  useEffect(() => {
    getClient();
    getMissions();
  }, []);


  useEffect(() => {
    getTotal();
  }, [missions]);

  return (
    <>
      <Helmet>
        <title> Détails du client </title>
      </Helmet>

      {client.length != 0 ? (
        <>
          <Container>

            <DetailsSection client={client} missionsNumber={missionsNumber} totalGain={totalGain} />
            <ClientCommentary client={client} />

            {/* Check if there is mission with this client */}
            {missions.length == 0 ? (
              <>
                <Typography variant="h4" sx={{ my: 5 }} align="center">Vous n'avez pas encore de mission avec ce client</Typography>
                <Link to='/dashboard/newmission'><Typography variant='body1' align="center">Voulez-vous ajouter une première mission ?</Typography></Link>
              </>
            ) : (
              <ClientListMission missions={missions} />
            )}

            {/* Delete client button */}
            <StyledInfo>
              <Button variant="contained"
                onClick={handleDeleteClickOpen}
              >Supprimer le client</Button>
            </StyledInfo>
          </Container>

          {/* Modal for deletion confirmation */}
          <Dialog
            open={openDelete}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDelete}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle color="error">{"Supprimer le client"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description" >
                Êtes-vous sûr de vouloir supprimer ce client ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} color="success">
                Annuler
              </Button>
              <Button onClick={handleDelete} color="error">
                Supprimer
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography variant="h4" sx={{ my: 5 }} align="center">Aucun client correspondant...</Typography>
      )}
    </>
  );
}