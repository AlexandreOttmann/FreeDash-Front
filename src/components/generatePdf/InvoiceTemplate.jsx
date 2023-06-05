
import { FooterInvoice } from "./sections/FooterInvoice";
import { HeaderInfos } from './sections/HeaderInfos';
import { HeaderLogo } from './sections/HeaderLogo';

import { Freelance } from './sections/Freelance';
import { Society } from './sections/Society';

import { Prestations } from './sections/Prestations';

import { PaymentInfos } from './sections/PaymentInfos'



const Container = {
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  width: '450px',
};

const Content = {
  color: "#000000",
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  alignContent: 'stretch',
  fontSize: '7px',
  fontWeight: 400,
};


const InvoiceTemplate = ({ user, client, mission }) => {


  return (
    <div style={Container}>
      {/* REFERENCE & LOGO */}
      <div style={Content}>
        <HeaderInfos user={user} />
        <HeaderLogo />
      </div>

      {/* ADRESS */}
      <div style={Content}>
        <Freelance user={user} />
        <Society client={client} />
      </div>

      {/* PRESTATION */}
      <div style={Content}>
        <Prestations mission={mission} />
      </div>
      {/* PAYMENT */}
      <div style={Content}>
        <PaymentInfos user={user} />
      </div>
      {/* FOOTER */}
      <div style={Content}>
        <FooterInvoice user={user} />
      </div>
    </div>
  );
};

export default InvoiceTemplate;