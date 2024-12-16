"use client"

import { useState } from 'react'
import Calendar from '../../../../components/Calendar'
import ReactModal from 'react-modal'
import AddEventModal from '../../../../components/AddEventModal'
import RoundedButton from '../../../../components/RoundedButton'
import Event from '../../../../libs/Event'
import { Session } from 'inspector'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/libs/next-auth-options'
import { useRouter } from 'next/navigation'

ReactModal.setAppElement('body');

export default function Home() {
  const [ events, setEvents ] = useState<Event[]>([
    { id: '1000', title: 'イベント 1', start: '2024-06-01T00:00:00', end: '2024-06-06T00:00:00', allDay: true },
    { id: '1001', title: 'イベント 2', start: '2024-06-01', end: '2024-06-05', allDay: true },
    { id: '1002', title: 'イベント 3', start: '2024-06-07', end: '2024-06-08', allDay: true },
    { id: '1003', title: 'イベント 4', start: '2024-06-11T00:00:00', end: '2024-06-11T08:30:00', allDay: false },
    { id: '1004', title: 'イベント 5', start: '2024-06-13T08:00:00', end: '2024-06-13T10:30:00', allDay: false }
  ]);

  const router = useRouter();


  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-10">
        <div className="md:grid grid-cols-10 w-full">
          <div className="col-span-2">
          </div>
          <div className="col-span-6">
            <Calendar 
              dateClick={()=>router.push("/create")} 
              events={events} />
          </div>
          <div className="col-span-2">
            {/* {session ?  */}
          <RoundedButton
            onClick={()=>router.push("/create")}
            >
            追加
          </RoundedButton>
          {/* :
          <></>} */}
          {/* <input type='range' min={0} max={360} onChange={(e)=>{
            document.body.style.setProperty('--color-v', e.target.value);
            document.documentElement.style.setProperty('--color-v', e.target.value);
          }}></input> */}
          {/* <button onClick={()=>console.log(events)}>表示</button> */}
          </div>
        </div>
      </main>
    </>
  );
}
   