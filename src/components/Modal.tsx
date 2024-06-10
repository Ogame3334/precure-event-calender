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

interface Event {
  title: string;
  start: Date | string;
  allday: boolean;
  id: number;
}

interface CustomModalProps {
  button: ReactNode;
  opened?: Function;
  closed?: Function;
  width?: string;
  height?: string;
  children?: ReactNode;
  canScroll?: boolean;
}

export default function CustomModal(props: CustomModalProps) {
  const [isOpen, setIsOpen ] = useState(false);
  
  const handleOpen = () => {
    setIsOpen(true);
    if(props.opened) props.opened();
  }
  const handleClose = () => {
    setIsOpen(false);
    if(props.closed) props.closed();
  }
  const ButtonElem = () => {
    return React.cloneElement(props.button as React.ReactElement, {
      onClick: handleOpen
    });
  }

  const modalStyle : ReactModal.Styles = {
    content: {
      // position: 'absolute',
      width: props.width,
      height: props.height,
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      overflow: (props.canScroll) ? 'scroll' : 'hidden', 
      overflowX: 'hidden'
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.2)'
    }
  };
  
  return (
    <>
      <ButtonElem />
      <ReactModal 
        isOpen={isOpen} 
        onRequestClose={handleClose} 
        style={modalStyle}
        >
        <div className='w-full text-right'>
          <button onClick={handleClose} className='w-[3%]'>
              <img src='/close.svg' className='w-full'></img>
          </button>
        </div>
        <div>{props.children}</div>
      </ReactModal>
    </>
  )
}
