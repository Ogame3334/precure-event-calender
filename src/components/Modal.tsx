"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
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
  isOpen: boolean;
  closeFunc: Function;
  width?: string;
  height?: string;
  children?: ReactNode;
  canScroll?: boolean;
}

// export default function CustomModal({isOpen, closeFunc, width, height}: CustomModalProps) {
//   const modalStyle : ReactModal.Styles = {
//     content: {
//       // position: 'absolute',
//       width: width,
//       height: height,
//       top: '50%',
//       left: '50%',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//       borderRadius: '20px',
//       overflow: 'hidden'
//       // transition: 'opacity 1s ease-in-out'
// //      marginRight: '-50%',
// //      transform: 'translate(-50%, -50%)'
//     },
//     // 親ウィンドウのスタイル（ちょっと暗くする）
//     overlay: {
//       background: 'rgba(0, 0, 0, 0.2)'
//     }
//   };
  
//   return (
//     <>
//       <ReactModal isOpen={isOpen} onRequestClose={() => {closeFunc();}} style={modalStyle}>
//         <div className='w-full text-right'>
//           <button onClick={() => closeFunc()} className='w-[3%]'>
//               <img src='/close.svg' className='w-full'></img>
//           </button>
//         </div>
//       </ReactModal>
//     </>
//   )
// }
export default function CustomModal(props: CustomModalProps) {
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
      // transition: 'opacity 1s ease-in-out'
//      marginRight: '-50%',
//      transform: 'translate(-50%, -50%)'
    },
    // 親ウィンドウのスタイル（ちょっと暗くする）
    overlay: {
      background: 'rgba(0, 0, 0, 0.2)'
    }
  };
  
  return (
    <>
      <ReactModal 
        isOpen={props.isOpen} 
        onRequestClose={() => {props.closeFunc();}} 
        style={modalStyle}
        >
        <div className='w-full text-right'>
          <button onClick={() => props.closeFunc()} className='w-[3%]'>
              <img src='/close.svg' className='w-full'></img>
          </button>
        </div>
        <div>{props.children}</div>
      </ReactModal>
    </>
  )
}
