"use client";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect, useRef, useCallback } from "react";

export default function Page({ shifts, employees }) {
  const localizer = dayjsLocalizer(dayjs)
  const [view, setView] = useState('week')

  const clickRef = useRef(null)

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const onSelectEvent = useCallback((calEvent) => {
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      window.alert(JSON.stringify(calEvent, null, 4))
    }, 250)
  }, [])

  const events = [
    {
      title: 'Morning \n Headcount : 2',
      start: new Date('2023-12-10T13:45:00-05:00'),
      end: new Date('2023-12-10T21:00:00-05:00'),
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
        defaultView="week"
        onSelectEvent={onSelectEvent}
      />
    </div>
  )

  return (
    <>
      <MyCalendar />
    </>
  )
}
