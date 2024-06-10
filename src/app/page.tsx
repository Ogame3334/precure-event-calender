"use client"
import { Fragment, useEffect, useState } from 'react'
import Calendar from '../components/Calendar'
import ReactModal from 'react-modal'
import AddEventModal from '../components/AddEventModal'
import RoundedButton from '../components/RoundedButton'
import Event from '../libs/Event'

ReactModal.setAppElement('body');

export default function Home() {
  const [ events, setEvents ] = useState<Event[]>([
    { id: '1000', title: 'イベント 1', start: '2024-06-01', end: '2024-06-05', allDay: true },
    { id: '1001', title: 'イベント 3', start: '2024-06-01', end: '2024-06-05', allDay: true },
    { id: '1003', title: 'イベント 2', start: '2024-06-11', end: '2024-06-15', allDay: true }
  ]);
  const [ isOpenAddEventModal, setIsOpenAddEventModal ] = useState(false);
  const [ startDateAddEvent, setStartDateAddEvent ] = useState<Date>(new Date());
  const handleOpenAddEventModal = (date?: Date) => {
    if(date) setStartDateAddEvent(date);
    setIsOpenAddEventModal(true);
  }
  const handleCloseAddEventModal = () => {
    setIsOpenAddEventModal(false);
  }

  return (
    <>
      <nav className="mb-12 bg-pink-200 border-b border-violet-100 p-4">
        <h1 className="text-center font-bold text-2xl text-gray-700">
          プリキュアイベントカレンダー
        </h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-10">
        <div className="grid grid-cols-10 w-full">
          <div className="col-span-2">
          </div>
          <div className="col-span-6">
            <Calendar 
              dateClick={handleOpenAddEventModal} 
              events={events} />
          </div>
          <div className="col-span-2">
          <RoundedButton
            onClick={()=>{setStartDateAddEvent(new Date()); handleOpenAddEventModal();}}
            >
            追加
          </RoundedButton>
          <button onClick={()=>console.log(events)}>表示</button>
          {/* <CustomModal 
            button={<button className="bg-pink-400 hover:bg-pink-500 w-10/12 text-white rounded-full px-4 py-2 border border-black my-5 mx-10 active:bg-pink-600" role="button">追加</button>}
            width='50%'
            height='50%'
            // canScroll={true}
          >
            <div id='createEventModalContainer' className='text-center'>
              <h1 className='text-center text-2xl'>イベント作成</h1>
            </div>
          </CustomModal> */}
          <AddEventModal 
            isOpen={isOpenAddEventModal}
            handleOpen={()=>{handleOpenAddEventModal()}}
            handleClose={handleCloseAddEventModal}
            startDate={startDateAddEvent}
            setEvents={setEvents}
            events={events}
          />
          </div>
        </div>
      </main>
    </>
  );
}
   