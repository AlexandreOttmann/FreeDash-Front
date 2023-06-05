
const PaymentContent = {
  fontSize: '6px',
  fontWeight: '400',
  width: '50%',
  textAlign: 'left',
}

const PaymentInformation = {
  display: 'flex',
  flexDirection: 'column',
}

const PaymentInformationLi = {
  marginBottom: '5px',
}


export const PaymentInfos = ({ user }) => {

  return (
    <div style={PaymentContent}>
      Pour payer par virement, veuillez utiliser les coordonnées bancaires ci-dessous en veillant à bien reporter la référence de la transaction :<>{user.firstName} {user.lastName}</>
      <ul style={PaymentInformation}>
        <li style={PaymentInformationLi}>Bénéficiaire : {user.firstName} {user.lastName}</li>
        <li style={PaymentInformationLi}>IBAN : {user.iban}</li>
        <li style={PaymentInformationLi}>BIC :  {user.bic}</li>
      </ul>
    </div>
  );
};