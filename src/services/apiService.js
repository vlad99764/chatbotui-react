// const chatBotApi = process.env.REACT_APP_API;
// const doctorId = process.env.REACT_APP_DOCTOR_ID;

const chatBotApi = process.env.REACT_APP_CHAT_BOT_API;
const doctorId = process.env.REACT_APP_DOCTOR_ID;

const invokeChatBotService = async function (senderId, msg, setChat, setBotTyping) {
  //chatData.push({sender : "user", sender_id : name, msg : msg});
  await fetch(chatBotApi, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
    },
    credentials: "same-origin",
    body: JSON.stringify({
      "sender": senderId, "message": msg, "metadata": {
        "doctorId": doctorId
      }
    }),
  })
    .then(response => response.json())
    .then((response) => {
      if (response) {
        // console.log("-response ------------------",response);
        if (response && response.length > 1) {
          for (let res of response) {
            const recipient_id = res["recipient_id"];
            const recipient_msg = res["text"];
            const botMessage = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
            setChat(chat => [...chat, botMessage]);
          }
          setBotTyping(false);
        } else {
          const temp = response[0];
          if (temp) {
            const recipient_id = temp["recipient_id"];
            const recipient_msg = temp["text"];
            const botMessage = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
            setBotTyping(false);
            setChat(chat => [...chat, botMessage]);
          } else {
            setBotTyping(false);
          }
        }

      }
    })
}

export default invokeChatBotService;