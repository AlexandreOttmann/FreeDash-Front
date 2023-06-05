

const FreelanceHeader = {
  color: "grey",
  borderBottom: "1px solid grey",
  letterSpacing: "0.02px",
  marginBottom: "5px",
  width: "100%",
};

const FreelanceAdressTitle = {
  color: "#444",
  fontWeight: 600,
  fontSize: "10px",
  marginBottom: "5px",
  width: "100%",
};
const FreelanceReferenceList = {
  color: "#000000",
  textAlign: "left",
};
const FreelanceAdress = {
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
};

const FreelanceAdressUl = {
  lineHeight: "normal",
};


export const Freelance = ({ user }) => {


  return (
    <div style={FreelanceAdress}>
      <div style={FreelanceHeader}>
        <h2 style={FreelanceAdressTitle}>AU&nbsp;NOM&nbsp;ET&nbsp;POUR&nbsp;LE&nbsp;COMPTE&nbsp;DE</h2>
      </div>
      <ul style={FreelanceAdressUl}>
        {/* Adresse freelance */}
        <li style={FreelanceReferenceList}>
          <strong>{user?.firstName} {user?.lastName}</strong>
        </li>
        <li style={FreelanceReferenceList}>{user?.address}</li>
        <li style={FreelanceReferenceList}>{user?.city}</li>
        <li style={FreelanceReferenceList}>SIRET : {user?.siret}</li>
      </ul>
    </div>
  );
};