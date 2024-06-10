"use client"
import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { ReactNode } from 'react'

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
