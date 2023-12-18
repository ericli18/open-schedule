"use client";
import { useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ShiftForm from "@/components/ShiftForm";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Page() {

  // const currentDate = dayjs().format("YYYY-MM-DD");
  // const currentTime = dayjs().format("HH:mm");
  // const nextDay = dayjs().add(8, "hour");
  // const nextDate = nextDay.format("YYYY-MM-DD");
  // const nextTime = nextDay.format("HH:mm");


  // return (
  //   <form>
  //     <div className='rounded-md p-4 md:p-6 flex-col gap-8 sm:gap-4'>
  //       <div className='mb-4 flex'>
  //         <label className='block sr-only' htmlFor='title'>Shift title</label>
  //         <input
  //           className='block border-b border-gray-300 focus:border-b-2 focus:border-blue-800 outline-none'
  //           type='text'
  //           name='title'
  //           id='title'
  //           placeholder='Shift Title'
  //         />
  //         <button className='ml-4 bg-blue-800 text-white px-4 py-2 rounded-md'>
  //           Add
  //         </button>
  //       </div>
  //       <div className='flex flex-col sm:flex-row gap-4'>
  //         <div className='flex flex-wrap gap-2'>
  //           <label htmlFor='startDate' className="sr-only">starting date</label>
  //           <input type='date' id='startDate' defaultValue={currentDate} />
  //           <label htmlFor='startTime' className="sr-only">starting time</label>
  //           <input type='time' id='startTime' defaultValue={currentTime}/>
  //         </div>
  //         <span>to</span>
  //         <div className=''>
  //           <div className='flex flex-wrap gap-2'>
  //             <label htmlFor='endTime' className="sr-only">Ending time</label>
  //             <input type='time' id='endTime' defaultValue={nextTime}/>
  //             <label htmlFor='endDate' className="sr-only">Ending time</label>
  //             <input type='date' id='endDate' defaultValue={nextDate} />
  //           </div>
  //         </div>
  //       </div>
  //       {/* <fieldset>
  //         <legend>Choose the positions on this shift: </legend>
  //         {positions.map((position) => {
  //           return (
  //             <div key={position}>
  //               <input type='checkbox' name={position} id={position} className="mr-2"/>
  //               <label htmlFor={position}>{position}</label>
  //             </div>
  //           );
  //         })}
  //       </fieldset> */}
  //       <div className="flex flex-col sm:flex-row gap-4 sm:gap-1">
  //         <label htmlFor="headcount">Headcount</label>
  //         <input type='number' name='headcount' id='headcount' min='1' max='100' defaultValue='1' className='w-16' />
  //       </div>
  //     </div>
  //   </form>
  // );

  return (
    <div className='flex flex-col gap-8 p-4 justify-center'>
      <ShiftForm />
    </div>
  )
}
