

//div
const PrestationHeader = {
  color: 'grey',
  borderBottom: '1px solid grey',
  letterSpacing: '0.02px',
  marginBottom: '5px',
  width: '100%',
};


//h2
const DocumentPrestationTitle = {
  textAlign: 'left',
  color: '#444',
  fontWeight: 600,
  letterSpacing: '0.02px',
  fontSize: '10px',
  marginBottom: '5px',
  width: '100%',
};

//h3
const DocumentPrestationItem = {
  marginTop: '0',
  height: '20px',
};


//div
const DocumentPrestation = {
  height: 'auto',
  display: 'block',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',
  alignSelf: 'auto',
  order: 0,
  flexDirection: 'column',
  color: 'black',
  textAlign: 'left',
  padding: '10px 0px 10px 20px',
};

//table
const PrestationTable = {
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: '0',
  marginBottom: '20px',
  fontSize: '6px',
  color: '#000',
};

//thead
const PrestationTableThead = {
  height: '20px',
};

//th
const PrestationTableTh = {
  height: '20px',
  fontWeight: 700,
  fontSize: '7px',
  textAlign: 'left',
  '&:firstOfType': {
    width: '60%',
  },
};

//tr
const PrestationTableTr = {
  height: '20px',
};

//tr
const PrestationTableTrTwo = {
  borderBottomWidth: '0.1em',
};

//td
const PrestationTableTd = {
  height: '20px',
  textAlign: 'left',
  margin: '0 0 0 10px',
  '&:nthOfType(2)': {
    textAlign: 'center',
  },
  '&:nthOfType(3)': {
    textAlign: 'right',
  },
  '&:nthOfType(4)': {
    textAlign: 'right',
  },
};

//div 
const TotalPrice = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-end',
  alignContent: 'stretch',
  margin: '10px 0 10px 0',
  fontSize: '7px',
  fontWeight: 400,
};

//table
const TablePrice = {
  width: '100px',
  borderCollapse: 'collapse',
  borderSpacing: '0',
  fontSize: '6px',
  color: '#000',
};

//tr
const TablePriceTr = {
  height: '15px',
  '&:lastChild': {
    fontSize: '10px',
    fontWeight: 700,
  },
};

//td
const TablePriceTdOne = {
  height: '15px',
  fontWeight: 700,
  fontSize: '8px',
  textAlign: 'left',
};

//td  
const TablePriceTdTwo = {
  height: '15px',
  textAlign: 'right',
};

//tbody
const PrestationTBody = {
  height: '20px',
}


export const Prestations = ({ mission }) => {

  // const prestationsPriceTotal = context.prestations?.reduce(
  //   (acc, prestation) => {
  //     return acc + prestation.totalHT;
  //   },
  //   0
  // );

  // const prestationsPriceTVA = context.prestations?.reduce(
  //   (acc, prestation) => {
  //     return acc + prestation.totalTVA;
  //   },
  //   0
  // );

  // const prestationsPriceTTC = context.prestations?.reduce(
  //   (acc, prestation) => {
  //     return acc + prestation.totalTTC;
  //   },
  //   0
  // );

  return (
    <div style={DocumentPrestation}>
      <div style={PrestationHeader}>
        <h2 style={DocumentPrestationTitle}>PRESTATION</h2>
      </div>
      <table style={PrestationTable}>
        <thead style={PrestationTableThead}>
          <tr style={PrestationTableTr}>
            <th style={PrestationTableTh}>Détail</th>
            <th style={PrestationTableTh}>Quantité</th>
            <th style={{ textAlign: 'right', ...PrestationTableTh }} >
              Prix unitaire (HT)
            </th>
            <th style={{ textAlign: 'right', ...PrestationTableTh }}>
              TOTAL &nbsp; (HT)
            </th>
          </tr>
        </thead>
        <tbody style={PrestationTBody}>

          <tr style={PrestationTableTrTwo}>
            <td style={PrestationTableTd}>{mission.name}</td>
            <td style={{ textAlign: 'center', ...PrestationTableTd }}>
              1
            </td>
            <td style={PrestationTableTd}>{mission.totalPrice}</td>
            <td style={PrestationTableTd}>
              {/* {+prestation?.totalHT.toFixed(2)}  */}
              {mission.totalPrice} TTC
              €
            </td>
          </tr>

        </tbody>
      </table>

      <div style={TotalPrice}>
        <table style={TablePrice}>
          <tbody style={PrestationTBody}>
            <tr style={TablePriceTr}>
              <td style={TablePriceTdOne}>Total (HT)</td>
              <td style={TablePriceTdTwo}>
                {/* {prestationsPriceTTC ? prestationsPriceTotal?.toFixed(2) : 0}  */}
                {mission.totalPrice}
                €
              </td>
            </tr>
            <tr style={TablePriceTr}>
              <td style={TablePriceTdOne}>TVA</td>
              <td style={TablePriceTdTwo}>
                0.00%
                {/* {prestationsPriceTVA ? prestationsPriceTVA?.toFixed(2) : 0}€ */}
              </td>
            </tr>
            <tr style={TablePriceTr}>
              <td style={TablePriceTdOne}>Total (TTC&nbsp;)</td>
              <td style={TablePriceTdTwo}>
                {mission.totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};