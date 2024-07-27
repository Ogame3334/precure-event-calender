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
import CustomMap from './CustomMap';

const Calendar: React.FC<{events: Event[], dateClick: Function}> = ({events, dateClick}) => {
  const searchParams = useSearchParams();
  const id: string = searchParams.get("id") || '';
  const [isOpenEvent, setIsOpenEvent ] = useState(false);
  const [event, setEvent ] = useState<EventImpl>();

  const MinusDate = (date: Date | null) => {
    if(!date) return new Date();
    const temp = date;
    temp.setDate(temp.getDate() - 1);
    return temp;
  }
  const FormatDate = (date: Date | null) => {
    if(!date) return <></>;
    return (
      <p>
        {`${date.getFullYear()}年`}
        <br/>
        {`${date.getMonth()}月${date.getDate()}日`}
      </p>
    )
  };
  const FormatDateLine = (date: Date | null) => {
    if(!date) return <></>;
    return (
      <p>
        {`${date.getFullYear()}年`}
        {`${date.getMonth()}月${date.getDate()}日`}
      </p>
    )
  };
  const FormatDatetime = (date: Date | null) => {
    if(!date) return <></>;
    return (
      <p>
        {`${date.getFullYear()}年`}
        {`${date.getMonth()}月${date.getDate()}日`}
        <br/>
        {`${date.getHours().toString().padStart(2, '0')}時${date.getMinutes().toString().padStart(2, '0')}分`}
      </p>
    )
  };

  let clickCount = 0;
  
  const modalStyle : ReactModal.Styles = {
    content: {
      position: 'absolute',
      // width: '50%',
      // height: '80%',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      overflow: 'scroll', 
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
        height={500}
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
      {event ? 
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
        <div className='h-full'>
          <h1 className='text-center text-2xl'>{(event.title) ? event.title : 'タイトル'}</h1>
          <div className='grid grid-cols-7 text-center my-3'>
            {event.allDay ? 
              (new Date(event.startStr).toDateString() == MinusDate(new Date(event.endStr)).toDateString() ? 
                <div className='col-span-7 text-xl'>{FormatDateLine(event.start)}</div> : 
                <>
                  <div className='col-span-3'>{FormatDate(event.start)}</div>
                  <div className='col-span-1'></div>
                  <div className='col-span-3'>{FormatDate(MinusDate(event.end))}</div>
                </>
              ) : 
              <>
                <div className='col-span-3'>{FormatDatetime(event.start)}</div>
                <div className='col-span-1'></div>
                <div className='col-span-3'>{FormatDatetime(event.end)}</div>
              </>
            }
          </div>
          <div>{event.extendedProps.place}</div>
          <div className='m-10 h-1/2'>
            <CustomMap place_id={event.extendedProps.place_id || 'ChIJTQbYAg2MGGARt22eNwtfGtE'} />
          </div>
        </div>
      </ReactModal> : <></>
      }
    </>
  );
};

export default Calendar;
