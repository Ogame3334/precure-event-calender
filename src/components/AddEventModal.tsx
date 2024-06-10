"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import jaLocale from '@fullcalendar/core/locales/ja';
import Calendar from '../components/Calendar'
import ReactModal from 'react-modal'
import { ReactNode } from 'react'
import ToggleButton from './ToggleButton'
import CustomModal from './Modal'
import Event from '../libs/Event'
import { title } from 'process'

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
  const [startDate, setStartDate] = useState(props.startDate.toLocaleDateString('en-CA'));
  const [endDate, setEndDate] = useState(props.startDate.toLocaleDateString('en-CA'));

  const modalStyle: ReactModal.Styles = {
    content: {
      // position: 'absolute',
      width: '50%',
      height: '50%',
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
      <ReactModal
        isOpen={props.isOpen}
        onRequestClose={() => { props.handleClose() }}
        style={modalStyle}
        onAfterOpen={()=>{
          setStartDate(props.startDate.toLocaleDateString('en-CA')); 
          setEndDate(props.startDate.toLocaleDateString('en-CA')); 
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
              defaultValue={'タイトル'}
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
            {(isAllDay) ? <div /> : <input name="starttime" type='time' />}

            <div />
            <div>終了</div>
            <input name="enddate" type='date' value={endDate} 
              onChange={(e)=>{setEndDate(e.target.value)}} className='col-span-3' />
            {(isAllDay) ? <div /> : <input name="endtime" type='time' />}

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
                const title: string = document.getElementById('id-add-event')?.getAttribute('value') || 'イベント';
                const event: Event = {
                  id: '1004',
                  title: title,
                  start: startDate,
                  end: endDate,
                  allDay: isAllDay
                }
                props.setEvents([...props.events, event]); 
                props.handleClose();
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
