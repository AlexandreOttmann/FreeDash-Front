/* eslint-disable react/no-unescaped-entities */
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Grid } from '@mui/material';
import team from '../../../_mock/team';
import TeamCard from './TeamCard'

const styles = {
  section: {
    marginBottom: '40px',
  },
  title: {
    marginBottom: '20px',
  },
  paragraph: {
    marginBottom: '20px',
  },
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>
          A propos - FreeDash
        </title>
      </Helmet>
      <Container>
        <section style={styles.section}>
          <Typography variant="h2" style={styles.title}>A propos de nous </Typography>
          <Typography variant="body1" style={styles.paragraph}>FreeDash a été créé par un groupe de quatre personnes désireuses de changer de carrière.<br />
            Après avoir suivi une formation intensive de quatre mois à l'école O'clock, ils ont lancé ce projet, fruit de leur apprentissage et de leur travail acharné.<br />
            Nous espérons que FreeDash vous aidera au quotidien dans le suivi de vos projets.</Typography>
          <Grid container spacing={3}>
            {team.map((team) => (
              <TeamCard key={team.avatar} post={team} />
            ))}
          </Grid>
        </section>
        <section style={styles.section}>
          <Typography variant="h2" style={styles.title}>Mentions légales</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            Nom de l'entreprise : FreeDash<br />
            Adresse : [Adresse de l'entreprise]<br />

            Téléphone : [Numéro de téléphone de l'entreprise]<br />

            Directeur de publication : [Nom du directeur de publication]
          </Typography>

          <Typography variant='h3' style={styles.title}>Conditions d'utilisation :</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            En utilisant ce site internet de dashboard, vous acceptez les conditions d'utilisation suivantes :<br />
            Vous acceptez de ne pas utiliser ce site internet de dashboard à des fins illégales ou interdites.<br />
            Vous acceptez de ne pas nuire au fonctionnement de ce site internet de dashboard ou de causer des dommages à d'autres utilisateurs.<br />
            Vous acceptez de ne pas utiliser ce site internet de dashboard pour collecter ou stocker des données personnelles sans le consentement des utilisateurs concernés.<br />
            Vous acceptez de ne pas copier, reproduire ou distribuer le contenu de ce site internet de dashboard sans autorisation préalable de l'entreprise.
          </Typography>
          <Typography variant='h3' style={styles.title}>Politique de confidentialité :</Typography>
          <Typography variant="body1" style={styles.paragraph}>Ce site internet de dashboard collecte des données personnelles telles que des adresses e-mail et des noms d'utilisateur pour permettre aux utilisateurs de se connecter et d'utiliser les services de dashboard. <br />
            Nous nous engageons à protéger les données personnelles des utilisateurs conformément à la réglementation en vigueur et à ne pas les vendre, louer ou transmettre à des tiers. Les utilisateurs ont le droit de demander la suppression de leurs données personnelles à tout moment.<br />
          </Typography>
          <Typography variant='h3' style={styles.title}>Cookies :</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            Ce site internet de dashboard utilise des cookies pour améliorer l'expérience utilisateur et fournir des informations sur la manière dont les utilisateurs interagissent avec le site. <br />
            Les cookies peuvent être désactivés dans les paramètres du navigateur.
          </Typography>
          <Typography variant='h3' style={styles.title}>Propriété intellectuelle :</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            Tous les contenus et éléments de ce site internet de dashboard, y compris les marques, les brevets et les droits d'auteur, sont la propriété exclusive de l'entreprise.<br />
            Toute utilisation non autorisée de ces éléments est interdite.
          </Typography>
          <Typography variant='h3' style={styles.title}>Responsabilité :</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            L'entreprise ne peut être tenue responsable des dommages directs ou indirects causés par l'utilisation de ce site internet de dashboard, y compris la perte de données ou de revenus.
          </Typography>
          <Typography variant='h3' style={styles.title}>Loi applicable et juridiction compétente :</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            Les présentes mentions légales sont régies par la loi française. <br />
            Tout litige relatif à l'utilisation de ce site internet de dashboard sera soumis à la juridiction compétente de la ville de [Ville de la juridiction compétente].
          </Typography>
        </section>
        <Grid container spacing={3}>
          {team.map((team) => (
            <TeamCard key={team.avatar} post={team} />
          ))}
        </Grid>
      </Container >
    </>
  )
}