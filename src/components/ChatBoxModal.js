import React, { useState } from 'react';
import { Modal } from 'react-bootstrap/';
import ROBOT from '../assets/robot.png'
import ModalContent from './ModalContent';
import './chatBot.css';



function ChatBoxModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <img src={ROBOT} onClick={handleShow} alt='robot' style={{ width: '60px', cursor: 'pointer' }} />
      <Modal show={show} onHide={handleClose} >
        <ModalContent style={{ margin: 'auto' }} handleClose={handleClose} />
      </Modal>
    </div>
  )
}

export default ChatBoxModal
