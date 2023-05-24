import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


export default function DateRangeDisplay({ startDate, endDate }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>

        <DemoItem label="Début et fin de mission">
          <DateCalendar
            defaultValue={dayjs('2022-04-17')}
            slotProps={{
              day: {
                selectedDay: [dayjs('2022-04-16'), dayjs('2022-04-20')],
              },
            }}
          />

        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  )

}