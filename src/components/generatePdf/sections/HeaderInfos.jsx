import dayjs from "dayjs";

const DocumentReference = {
  height: "80px",
  color: "black",
  width: "50%",
};

const DocumentTitle = {
  marginBottom: "4px",
  paddingLeft: "20px",
  fontSize: "15px",
  color: "#000000",
  textAlign: "left",
  fontWeight: "400",
};

const DocumentReferenceUl = {
  marginLeft: "20px",
};

const DocumentAdressUl = {
  lineHeight: "normal",
};

const DocumentReferenceList = {
  color: "#000000",
  textAlign: "left",
};




export const HeaderInfos = ({ user }) => {

  const now = dayjs().format("DD/MM/YYYY");
  const invoiceNumber = dayjs().format("MM-YYYY");
  return (
    <div style={DocumentReference}>
      <div style={DocumentTitle}>Facture</div>
      <ul style={DocumentReferenceUl}>
        <>
          <li style={DocumentReferenceList}>Numéro de facture : {invoiceNumber + now.slice(0, 2)}</li>
          <li style={DocumentReferenceList}>Émise le {now}</li>
          <li style={DocumentReferenceList}>Référence du virement : {user?.firstName} {user?.lastName}</li>
        </>
      </ul>
    </div>
  );
};