import { Card, Typography } from "@mui/material";


export default function ClientCommentary({ client }) {

  return (
    <Card
      sx={{
        py: 2,
        paddingX: 3,
        color: 'black',
        bgcolor: '#fff',

      }}>
      <Typography variant="body1">
        {client.commentary}
      </Typography>
    </Card >
  )
}