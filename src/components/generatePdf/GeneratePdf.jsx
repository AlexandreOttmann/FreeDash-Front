import { useState, forwardRef } from "react";
import { jsPDF } from "jspdf";
import { renderToStaticMarkup } from "react-dom/server";


import InvoiceTemplate from "./InvoiceTemplate";
//mui
import { Button, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from "@mui/material"


//utils
import Iconify from "../iconify/Iconify"
import { axiosPrivateInstance } from "../../api/axios";



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GeneratePdf({ missionId, isMissionList }) {

  const [isInfoLoaded, setIsInfoLoaded] = useState(false);


  const [missionInfo, setMissionInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [clientInfo, setClientInfo] = useState({});

  const [alert, setAlert] = useState('');
  const [openModale, setOpenModale] = useState(false);

  const handleCloseModale = () => {
    setOpenModale(false);
  };
  const handleOpenModale = () => {
    setOpenModale(true);
    handleGetInfo(missionId);
  };


  const handleGetInfo = async (missionId) => {
    try {
      // Fetch Mission
      const missionResponse = await axiosPrivateInstance.get(`/mission/${missionId}`);

      // Fetch User
      const userResponse = await axiosPrivateInstance.get(`/user`);

      // Fetch Client user clientId from fetch above
      const idclient = missionResponse.data.clientId;
      const clientResponse = await axiosPrivateInstance.get(`/clients/${idclient}`);
      setMissionInfo(missionResponse.data);
      setUserInfo(userResponse.data);
      setClientInfo(clientResponse.data);
      setIsInfoLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePdf = () => {
    if (!isInfoLoaded) return setAlert('Retentez dans un instant le temps que nous récupérons toutes les informations nécessaires');

    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    const invoiceTemplate = renderToStaticMarkup(<InvoiceTemplate
      mission={missionInfo}
      user={userInfo}
      client={clientInfo}
    />);
    doc.html(invoiceTemplate, {
      async callback(doc) {
        // save the document as a PDF with the name "Invoice"
        doc.save('Invoice');
      },
    });
    handleCloseModale();
  };

  return (
    <>
      {isMissionList ? (
        <MenuItem sx={{ color: 'info.main' }} onClick={handleOpenModale}>
          <Button sx={{ color: 'info.main' }}>
            <Iconify icon={'eva:file-add-outline'} sx={{ mr: 2 }} />
            Générer Pdf
          </Button>
        </MenuItem>
      ) : (
        <Button sx={{ color: 'warning.main', width: 200 }} onClick={handleOpenModale} >
          <Iconify icon={'eva:file-add-outline'} sx={{ mr: 2 }} />
          Générer Pdf
        </Button>
      )}
      <Dialog
        open={openModale}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModale}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="error">{"Facturation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" >
            Voulez-vous générer une facture ? <br />
            <Typography variant="caption" sx={{ color: 'info.main' }}>
              Assurez-vous d'avoir renseigné toutes les informations nécessaires, sur votre profil également.
            </Typography>
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {alert}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModale} color="info">
            Annuler
          </Button>
          <Button onClick={generatePdf} color="success">
            Télécharger la facture
          </Button>
        </DialogActions>
      </Dialog >
    </>
  )
}

