import './chatBot.css';
import { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BiBot, BiUser } from 'react-icons/bi';
import { IoCloseSharp } from "react-icons/io5";
import invokeChatBotService from '../services/apiService';



function ModalContent({ handleClose }) {
    const [chat, setChat] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [botTyping, setBotTyping] = useState(false);
    const [senderId, setSenderId] = useState("oddy_" + new Date().getTime());



    useEffect(() => {
        console.log("called -------------", chat);
        const messageArea = document.getElementById('messageArea');
        messageArea.scrollTop = messageArea.scrollHeight
    }, [chat])




    const handleSubmit = (evt) => {
        evt.preventDefault();
        const userMessage = { sender: "user", sender_id: senderId, msg: inputMessage };
        if (inputMessage !== "") {
            setChat(chat => [...chat, userMessage]);
            setBotTyping(true);
            setInputMessage('');
            invokeChatBotService(senderId, inputMessage, setChat, setBotTyping);
        }
        else {
            window.alert("Please enter valid message");
        }

    }




    // console.log(chat);


    return (
        <div className="card cardBox">
            <div className="cardHeader text-white header">
                <div className='heading'>
                    <h1 className='mainHeading'>AI Assistant</h1>
                    {botTyping ? <h6 style={{ marginLeft: '20px' }}>Bot Typing...</h6> : null}
                    <br />
                </div>
                <div style={{ marginRight: '10px', marginTop: '15px' }}>
                    <IoCloseSharp onClick={handleClose} style={{ fontSize: '30px', cursor: 'pointer' }} />
                </div>
            </div>


            <div className="cardBody cardContent" id="messageArea">
                <div className="row msgarea">
                    {chat.map((message, key) => (
                        <div key={key}>
                            {message.sender === 'bot' ?
                                (
                                    <div className='msgalignstart'>
                                        <BiBot className="botIcon" /><h5 className="botmsg">{message.msg}</h5>
                                    </div>
                                )

                                : (
                                    <div className='msgalignend'>
                                        <h5 className="usermsg">{message.msg}</h5><BiUser className="userIcon" />
                                    </div>
                                )
                            }
                        </div>
                    ))}

                </div>

            </div>
            <div className="cardFooter">
                <form className='d-flex' onSubmit={handleSubmit}>
                    <div className="col-10">
                        <input onChange={e => setInputMessage(e.target.value)} value={inputMessage} type="text" className="input"></input>
                    </div>
                    <div className="col-2">
                        <button type="submit" className="circleBtn" ><IoMdSend className="sendIcon" /></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalContent;
