import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function HomePage() {

  return (
    <>
    <Helmet>
      <title>
        HomePage - FreeDash
      </title>
    </Helmet>
   <Container>
      <h1>
        FREEDASH CROLLOT
      </h1>


      <ul>
        <li>
          <Link to="/register">Créer un compte</Link>
        </li>

        <li>
          <Link to="/login">Se connecter</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/about">A propos</Link>
        </li>

        <li>
          <Link to="/dashboard">dashboard</Link>
        </li>
      </ul>
    </Container>
    
    </>
  )
}
