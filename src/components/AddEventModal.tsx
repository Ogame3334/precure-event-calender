"use client"
import React, { useState } from 'react'
import ReactModal from 'react-modal'
import ToggleButton from './ToggleButton'
import Event from '../libs/Event'

interface AddEventModalProperty {
  isOpen: boolean;
  handleOpen: Function;
  handleClose: Function;
  startDate: Date;
  setEvents: Function;
  events: Event[];
}

export default function AddEventModal(props: AddEventModalProperty) {
  const [isAllDay, setIsAllDay] = useState(false);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(props.startDate.toLocaleDateString('sv-SE'));
  const [endDate, setEndDate] = useState(props.startDate.toLocaleDateString('sv-SE'));
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");

  const [tempId, setTempId] = useState(1100);
  
  const modalStyle: ReactModal.Styles = {
    content: {
      // position: 'absolute',
      width: '50%',
      height: '80%',
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

  const PlusDate = (date: Date | null) => {
    if(!date) return new Date();
    const temp = date;
    temp.setDate(temp.getDate() + 1);
    return temp;
  }

  return (
    <>
      <ReactModal
        isOpen={props.isOpen}
        onRequestClose={() => { props.handleClose() }}
        style={modalStyle}
        onAfterOpen={()=>{
          setStartDate(props.startDate.toLocaleDateString('sv-SE')); 
          setEndDate(props.startDate.toLocaleDateString('sv-SE')); 
        }}
      >
        <div className='w-full text-right'>
          <button onClick={() => { props.handleClose() }} className='w-[3%]'>
            <img src='/close.svg' className='w-full'></img>
          </button>
        </div>
        <div>
          <div className='grid grid-cols-6 grid-rows-5 items-center'>
            <div>タイトル</div>
            <input
              name='title'
              id='id-add-event'
              type='text'
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
              className='h-10 border-black border mx-10 my-2 w-auto col-span-5'
            />

            <div>終日</div>
            <div className='col-span-4' />
            <ToggleButton
              id='allday'
              color='pink'
              className='col-span-1'
              onChange={(cond: boolean) => { setIsAllDay(cond); }} />

            <div />
            <div>開始</div>
            <input name="startdate" type='date' value={startDate} 
              onChange={(e)=>{setStartDate(e.target.value)}} className='col-span-3' />
            {(isAllDay) ? 
              <div /> : 
              <input 
                name="starttime" 
                type='time' 
                value={startTime}
                onChange={(e)=>{setStartTime(e.target.value);}}
                />
            }

            <div />
            <div>終了</div>
            <input name="enddate" type='date' value={endDate} 
              onChange={(e)=>{setEndDate(e.target.value)}} className='col-span-3' />
            {(isAllDay) ? 
              <div /> : 
              <input 
                name="endtime" 
                type='time' 
                value={endTime}
                onChange={(e)=>{setEndTime(e.target.value)}}
                />
            }

            <div>場所</div>
            <input
              name='place'
              type='text'
              defaultValue={'プリキュアプリティストア大阪店'}
              className='h-10 border-black border col-span-5'
            />
            <div>URL</div>
            <input
              name='url'
              type='url'
              defaultValue={''}
              className='h-10 border-black border col-span-5'
            />

            <div />
            <button
              className="bg-pink-400 hover:bg-pink-500 w-10/12 text-white rounded-full px-4 py-2 border border-black my-5 mx-10 active:bg-pink-600 col-span-4"
              onClick={()=>{
                const start = new Date(isAllDay ? startDate : startDate + 'T' + startTime);
                const end = new Date(isAllDay ? PlusDate(new Date(endDate)) : endDate + 'T' + endTime);
                const title: string = document.getElementById('id-add-event')?.getAttribute('value') || 'イベント';
                const event: Event = {
                  id: String(tempId),
                  title: title,
                  start: start.toISOString(),
                  end: end.toISOString(),
                  allDay: isAllDay,
                  place: '九州工業大学'
                }
                props.setEvents([...props.events, event]); 
                props.handleClose();
                setTempId(tempId+1);
              }}
              role="button"
            >
              予定追加
            </button>
            <div />
          </div>
        </div>
      </ReactModal>
    </>
  );
}
