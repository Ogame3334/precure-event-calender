"use client"
import React, { useState } from 'react'
import ReactModal from 'react-modal'
import ToggleButton from './ToggleButton'
import Event from '../libs/Event'
import RoundedButton from './RoundedButton'
import './Modal.css'

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
  const [place, setPlace] = useState("");
  const [url, setUrl] = useState("");

  const [tempId, setTempId] = useState(1100);

  const modalStyle: ReactModal.Styles = {
    content: {
      position: 'absolute',
      // width: '90%',
      // height: '90%',
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
    if (!date) return new Date();
    const temp = date;
    temp.setDate(temp.getDate() + 1);
    return temp;
  }

  const encodeForGoogleMaps = (str: string): string => {
    return encodeURIComponent(str).replace(/%20/g, '+');
  };

  
  const searchPlace = async (place_name: string) => {
    const PLACE_API_URL = `/api/googlemap/place?query=${encodeForGoogleMaps(place_name)}&key=${process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}`;
    try {
      const response = await fetch(PLACE_API_URL);
      const data = await response.json();
      if (data) {
        return data.place_id;
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  }

  return (
    <>
      <ReactModal
        isOpen={props.isOpen}
        onRequestClose={() => { props.handleClose() }}
        style={modalStyle}
        className="modal-content"
        onAfterOpen={() => {
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
          <div className='grid grid-cols-6 grid-rows-6 items-center'>
            <div>タイトル</div>
            <input
              name='title'
              id='id-add-event'
              type='text'
              value={title}
              placeholder='イベント'
              onChange={(e) => { setTitle(e.target.value) }}
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
              onChange={(e) => { 
                const temp = new Date(endDate);
                temp.setDate(temp.getDate() - (new Date(startDate).getTime() - new Date(e.target.value).getTime()) / 86400000);
                setEndDate(temp.toLocaleDateString('sv-SE')); 
                setStartDate(e.target.value); 
              }} 
              className='col-span-3' />
            {(isAllDay) ?
              <div /> :
              <input
                name="starttime"
                type='time'
                value={startTime}
                onChange={(e) => { setStartTime(e.target.value); }}
              />
            }

            <div />
            <div>終了</div>
            <input name="enddate" type='date' value={endDate}
              onChange={(e) => { setEndDate(e.target.value) }} className='col-span-3' />
            {(isAllDay) ?
              <div /> :
              <input
                name="endtime"
                type='time'
                value={endTime}
                onChange={(e) => { setEndTime(e.target.value) }}
              />
            }

            <div>場所</div>
            <input
              name='place'
              type='text'
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder='プリキュアプリティストア大阪店'
              className='h-10 border-black border col-span-5'
            />
            <div>URL</div>
            <input
              name='url'
              type='url'
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
              placeholder='https://example.com'
              className='h-10 border-black border col-span-5'
            />

            <div />
            <div className='col-span-4'>
            {/* <button
              className="bg-pink-400 hover:bg-pink-500 w-full text-white rounded-full px-4 py-2 border border-black my-10 mx-10 active:bg-pink-600"
              onClick={async () => {
                const start = new Date(isAllDay ? startDate : startDate + 'T' + startTime);
                const end = new Date(isAllDay ? PlusDate(new Date(endDate)) : endDate + 'T' + endTime);
                const title: string = document.getElementById('id-add-event')?.getAttribute('value') || 'イベント';
                const event: Event = {
                  id: String(tempId),
                  title: title,
                  start: start.toISOString(),
                  end: end.toISOString(),
                  allDay: isAllDay,
                  place: place,
                  place_id: await searchPlace(place),
                  url: url
                }
                props.setEvents([...props.events, event]);
                props.handleClose();
                setTempId(tempId + 1);
              }}
              role="button"
            >
              予定追加
            </button> */}
            <RoundedButton 
              onClick={async () => {
                const start = new Date(isAllDay ? startDate : startDate + 'T' + startTime);
                const end = new Date(isAllDay ? PlusDate(new Date(endDate)) : endDate + 'T' + endTime);
                const title: string = document.getElementById('id-add-event')?.getAttribute('value') || 'イベント';
                const event: Event = {
                  id: String(tempId),
                  title: title,
                  start: start.toISOString(),
                  end: end.toISOString(),
                  allDay: isAllDay,
                  place: place,
                  place_id: await searchPlace(place),
                  url: url
                }
                props.setEvents([...props.events, event]);
                props.handleClose();
                setTempId(tempId + 1);
              }}
              >
              予定追加
            </RoundedButton>
            </div>
            <div />
          </div>
        </div>
      </ReactModal>
    </>
  );
}
