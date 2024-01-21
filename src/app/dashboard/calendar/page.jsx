import ShiftCalendar from "@/components/Calendar"
import { getShifts } from "@/lib/data"

export default async function Page() {
  const shifts = await getShifts()
  shifts.forEach(shift => {
    shift.start = new Date(shift.start_timedate) //timedate because start is protected in postgres
    shift.end = new Date(shift.end_timedate)
  }
  )
  return (
    <>
      <ShiftCalendar shifts={shifts}/>
    </>
  )
}