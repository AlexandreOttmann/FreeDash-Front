import { Card, Typography } from "@mui/material";


export default function ClientCommentary({ client }) {

  return (
    <Card
      sx={{
        my: 3,
        py: 2,
        paddingX: 3,
      }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom marginLeft={5}>
        Commentaire :
      </Typography>
      <Typography variant="body2" marginLeft={5}>
        {client.commentary}
      </Typography>
    </Card >
  )
}