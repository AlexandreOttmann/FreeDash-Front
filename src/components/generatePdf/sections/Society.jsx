

const SocietyHeader = {
  color: "grey",
  borderBottom: "1px solid grey",
  letterSpacing: "0.02px",
  marginBottom: "5px",
  width: "100%",
};

const SocietyAdressTitle = {
  color: "#444",
  fontWeight: 600,
  fontSize: "10px",
  marginBottom: "5px",
  width: "100%",
}

const SocietyReferenceList = {
  color: "#000000",
  textAlign: "left",
}

const SocietyAdress = {
  height: "auto",
  display: "block",
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: "auto",
  alignSelf: "auto",
  order: 0,
  flexDirection: "column",
  color: "black",
  textAlign: "left",
  padding: "10px 0px 10px 20px",
}

const SocietyAdressUl = {
  lineHeight: "normal",
}


export const Society = ({ client }) => {

  return (
    <div style={SocietyAdress}>
      <div style={SocietyHeader}>
        <h2 style={SocietyAdressTitle}>ADRESSÉ&nbsp;À</h2>
      </div>
      <ul style={SocietyAdressUl}>
        {/* Adresse client */}
        <li style={SocietyReferenceList}>
          <strong>{client.firstName} {client.lastName}</strong>
        </li>
        <li style={SocietyReferenceList}>{client.address}</li>
        <li style={SocietyReferenceList}>{client.city}</li>
        <li style={SocietyReferenceList}>Contact : {client.phone} {client.email} </li>
        <li style={SocietyReferenceList}>Numéro d'immatriculation : {client.siret}</li>

      </ul>
    </div>
  );
};