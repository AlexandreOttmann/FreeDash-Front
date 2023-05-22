import { Card, Typography } from "@mui/material";


export default function ClientCommentary({ client }) {

  return (
    <Card
      sx={{
        my: 3,
        py: 2,
        paddingX: 3,
      }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
        Commentaire :
      </Typography>
      <Typography variant="body2">
        {client.commentary}
      </Typography>
    </Card >
  )
}