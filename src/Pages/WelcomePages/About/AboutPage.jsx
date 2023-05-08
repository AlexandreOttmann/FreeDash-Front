/* eslint-disable react/no-unescaped-entities */
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Grid } from '@mui/material';
import team from '../../../_mock/team';
import TeamCard from './TeamCard'
export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>
          A propos - FreeDash
        </title>
      </Helmet>
      <Container>
        <Typography variant="h2">A propos de nous </Typography>
        <Typography variant="body1">Description à venir</Typography>
        <Grid container spacing={3}>
          {team.map((team) => (
            <TeamCard key={team.avatar} post={team} />
          ))}
        </Grid>
        <Typography variant="h2">Mentions légales</Typography>
        <Typography variant="body1">
          Nom de l'entreprise : FreeDash
          Adresse : [Adresse de l'entreprise]

          Téléphone : [Numéro de téléphone de l'entreprise]

          Directeur de publication : [Nom du directeur de publication]
        </Typography>

        <Typography variant='h3'>Conditions d'utilisation :</Typography>
        <Typography variant="body1">
          En utilisant ce site internet de dashboard, vous acceptez les conditions d'utilisation suivantes :
          Vous acceptez de ne pas utiliser ce site internet de dashboard à des fins illégales ou interdites.
          Vous acceptez de ne pas nuire au fonctionnement de ce site internet de dashboard ou de causer des dommages à d'autres utilisateurs.
          Vous acceptez de ne pas utiliser ce site internet de dashboard pour collecter ou stocker des données personnelles sans le consentement des utilisateurs concernés.
          Vous acceptez de ne pas copier, reproduire ou distribuer le contenu de ce site internet de dashboard sans autorisation préalable de l'entreprise.
        </Typography>
        <Typography variant='h3'>Politique de confidentialité :</Typography>
        <Typography variant="body1">Ce site internet de dashboard collecte des données personnelles telles que des adresses e-mail et des noms d'utilisateur pour permettre aux utilisateurs de se connecter et d'utiliser les services de dashboard. Nous nous engageons à protéger les données personnelles des utilisateurs conformément à la réglementation en vigueur et à ne pas les vendre, louer ou transmettre à des tiers. Les utilisateurs ont le droit de demander la suppression de leurs données personnelles à tout moment.
        </Typography>

        <Typography variant='h3'>Cookies :</Typography>
        <Typography variant="body1">
          Ce site internet de dashboard utilise des cookies pour améliorer l'expérience utilisateur et fournir des informations sur la manière dont les utilisateurs interagissent avec le site. Les cookies peuvent être désactivés dans les paramètres du navigateur.
        </Typography>
        <Typography variant='h3'>Propriété intellectuelle :</Typography>
        <Typography variant="body1">
          Tous les contenus et éléments de ce site internet de dashboard, y compris les marques, les brevets et les droits d'auteur, sont la propriété exclusive de l'entreprise. Toute utilisation non autorisée de ces éléments est interdite.
        </Typography>
        <Typography variant='h3'>Responsabilité :</Typography>
        <Typography variant="body1">
          L'entreprise ne peut être tenue responsable des dommages directs ou indirects causés par l'utilisation de ce site internet de dashboard, y compris la perte de données ou de revenus.
        </Typography>
        <Typography variant='h3'>Loi applicable et juridiction compétente :</Typography>
        <Typography variant="body1">
          Les présentes mentions légales sont régies par la loi française. Tout litige relatif à l'utilisation de ce site internet de dashboard sera soumis à la juridiction compétente de la ville de [Ville de la juridiction compétente].
        </Typography>
      </Container >
    </>
  )
}