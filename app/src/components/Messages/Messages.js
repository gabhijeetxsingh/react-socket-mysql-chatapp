import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message"

import "./Messages.css";

const Messages = ({messages, name}) => {
    console.log("in messages",name)
    return (
        <ScrollToBottom className="card-body msg_card_body">
            {[...messages].map((message, i)=><div key={i}><Message message={message} name={name}/></div>)}
        </ScrollToBottom>
    );
}

export default Messages;