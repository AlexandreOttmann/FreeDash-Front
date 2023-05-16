import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateCalendar } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Card } from "@mui/material"

export default function CalendarSection() {
  return (
    <Card>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar sx={{
          //  width: '500px' 
        }} />
      </LocalizationProvider>
    </Card>
  )
}