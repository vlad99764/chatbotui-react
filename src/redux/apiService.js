
export const invokeChatBotService = async function handleClick(name, msg, { senderId, dispatch, setbotTyping, addMessage }) {
  //chatData.push({sender : "user", sender_id : name, msg : msg});
  await fetch('192168.0.166:5005/webhooks/rest/webhook', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
    },
    credentials: "same-origin",
    body: JSON.stringify({
      "sender": senderId, "message": msg, "metadata": {
        "doctorId": "9685800335"
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
            const userMessage = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
            dispatch(addMessage(userMessage));
          }
          setbotTyping(false);
        } else {
          const temp = response[0];
          if (temp) {
            const recipient_id = temp["recipient_id"];
            const recipient_msg = temp["text"];
            const userMessage = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
            setbotTyping(false);
            dispatch(addMessage(userMessage));
          } else {
            setbotTyping(false);
            // window.alert("Please enter valid message");
          }
        }

        // scrollBottom();
      }
    })
}





