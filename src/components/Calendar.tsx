// components/Calendar.tsx
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import ReactModal from 'react-modal';
import { EventImpl } from '@fullcalendar/core/internal';
import { useSearchParams } from 'next/navigation';
import Event from '../libs/Event';

const Calendar: React.FC<{events: Event[], dateClick: Function}> = ({events, dateClick}) => {
  const searchParams = useSearchParams();
  const id: string = searchParams.get("id") || '';
  const [isOpenEvent, setIsOpenEvent ] = useState(false);
  const [event, setEvent ] = useState<EventImpl>();

  let clickCount = 0;
  
  const modalStyle : ReactModal.Styles = {
    content: {
      // position: 'absolute',
      width: '50%',
      height: '50%',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      overflow: 'hidden', 
      overflowX: 'hidden'
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.2)'
    }
  };
  
  return (
    <>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin
        ]}
        headerToolbar={{
          left: 'prev next today',
          center: 'title',
          right: 'dayGridMonth timeGridWeek'
        }}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale="ja"
        dayCellContent={(args) => {
          return args.dayNumberText.replace('日', '');
        }}
        events={events}
        selectable={true}
        height={700}
        dateClick={(e)=>{
          clickCount++;
          if(clickCount <= 2){
            setTimeout(()=>{
              if(clickCount == 2){
                dateClick(e.date);
                clickCount = 0;
              }
              else{
                clickCount = 0;
              }
            }, 200);
          }
        }}
        eventClick={(e)=>{setIsOpenEvent(true); setEvent(e.event)}}
      />
      <ReactModal 
        isOpen={isOpenEvent} 
        onRequestClose={()=>{setIsOpenEvent(false);}} 
        style={modalStyle}
        id='event'
        >
        <div className='w-full text-right'>
          <button onClick={()=>{setIsOpenEvent(false);}} className='w-[3%]'>
              <img src='/close.svg' className='w-full'></img>
          </button>
        </div>
        <div>
          <h1 className='text-center text-2xl'>{(event) ? event.title : 'タイトル'}</h1>
        </div>
      </ReactModal>
    </>
  );
};

export default Calendar;
