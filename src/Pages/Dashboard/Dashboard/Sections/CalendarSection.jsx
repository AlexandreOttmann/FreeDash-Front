import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateCalendar } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Card, CardHeader, } from "@mui/material"

export default function CalendarSection() {
  return (
    <Card>
      <CardHeader title={"Votre agenda"} subheader={"sur le mois en cours"} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar sx={{
          minHeight: 250,
          maxHeight: 300,
        }} />
      </LocalizationProvider>
    </Card>
  )
}