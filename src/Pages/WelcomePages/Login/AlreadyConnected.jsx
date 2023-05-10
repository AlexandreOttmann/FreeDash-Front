import { Container, Typography, Card } from "@mui/material"
import styled from "@emotion/styled"

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  height: 550,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: 'auto',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

export default function AlreadyConnected() {

  return (

    <Container maxWidth="sm">
      <StyledSection>
        <Typography variant='h3'
          align="center"
          sx={{ px: 5, mt: 10, mb: 5 }}
        >
          Vous êtes déjà connecté 👹!
        </Typography>
      </StyledSection>
    </Container >

  )

}