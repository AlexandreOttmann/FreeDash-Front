import { forwardRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../components/iconify/Iconify';
import { axiosInstance } from '../../../../api/axios';

export default function MissionDeleteButton({ missionId, link }) {
  const [openDelete, setOpenDelete] = useState(false);

  //Handle slide up transition
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/mission/${missionId}`);
      window.location.reload();
    } catch (error) {
      console.log("La mission n'a pas pu être supprimée", error);
    }
  };

  return (
    <>
      <Tooltip title="Supprimer">
        <IconButton size="large" color="inherit" onClick={handleDeleteClickOpen}>
          <Iconify icon={'eva:trash-2-outline'} />
        </IconButton>
      </Tooltip>

      {/* Modal for deletion confirmation */}
      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="error">{"Supprimer la mission"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" >
            Êtes-vous sûr de vouloir supprimer cette mission ?
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
  );
}
