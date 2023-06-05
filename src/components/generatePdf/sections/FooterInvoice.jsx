import { styled } from '@mui/material/styles';

// const Footer = styled('div')({
//   display: 'flex',
//   gap: '6px',
//   flexDirection: 'row',
// })

// const FooterMention = styled('div')({
//   fontSize: '5px',
//   textAlign: 'left',
// });

// const FooterObligation = styled('div')({

//   fontSize: '5px',
//   textAlign: 'left',
// })
const Footer = {
  display: 'flex',
  gap: '6px',
  flexDirection: 'row',
}

const FooterMention = {
  fontSize: '5px',
  textAlign: 'left',
};

const FooterObligation = {
  fontSize: '5px',
  textAlign: 'left',
}



export const FooterInvoice = ({ user }) => {

  return (
    <div style={Footer}>
      <div style={FooterMention}>
        {user.firstName}  {user.lastName} Micro entrepreneur enregistré sous le numéro {user.siret}. Exonéré de TVA en vertu des articles 151-0 et 293 B du CGI, dans la mesure où l'entreprise
        respecte les limites de chiffres d'affaires qui y sont fixées. Numéro de TVA Intracommunautaire : non renseigné
      </div>
      <div style={FooterObligation}>
        La facture est payable sous 60 jours. Tout règlement effectué après expiration du délai donnera lieu, à titre de pénalité de retard, à la facturation d'un intérêt de retard égal à trois fois
        le taux d'intérêt légal en vigueur en France, à compter de la date d'exigibilité de cette présente facture jusqu'à la date de paiement effectif, ainsi qu'à une indemnité forfaitaire pour frais
        de recouvrement d'un montant de 40 Euros. Les pénalités de retard sont exigibles sans qu'un rappel soit nécessaire.
      </div>
    </div>
  );
};