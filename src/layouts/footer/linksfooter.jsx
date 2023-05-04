
import { Link } from "react-router-dom";
// import { styled } from '@mui/material/styles';

export default function LinksFooterLayout(){
return(
    <div>
     <li>
       <Link to="/contact">Contact</Link>
     </li>
    <li>
       <Link to="/about">Mentions Légales</Link>
    </li>
  </div>
  );
}