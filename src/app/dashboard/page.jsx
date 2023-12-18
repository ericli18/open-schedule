"use client";
import { useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ShiftForm from "@/components/ShiftForm";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Page() {
  
  return (
    <div className='flex gap-8 p-4 justify-center min-w-full'>
      <ShiftForm />
    </div>
  )
}
