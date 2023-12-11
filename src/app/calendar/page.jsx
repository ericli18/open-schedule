"use client";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

export default function Page({ shifts, employees }) {
  const localizer = dayjsLocalizer(dayjs)
  const [view, setView] = useState('week')


  const events = [
    {
      title: 'Headcount : 2',
      start: new Date('2023-12-10T13:45:00-05:00'),
      end: new Date('2023-12-11T01:00:00-05:00'),
      resourceId: 1,
    }
  ]


  const MyCalendar = props => (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 500, width: "80%"}}
        views={['week', 'day']}
        view="week"
      />
    </div>
  )

  return (
    <>
      <MyCalendar />
    </>
  )
}
