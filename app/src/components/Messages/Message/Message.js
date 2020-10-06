import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";

const Message = ({message : {user, text}, name}) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? (
            <div className="d-flex justify-content-end mb-4">
              <div className="msg_cotainer_send">
              {ReactEmoji.emojify(text)}
                <span className="msg_time_send">8:55 AM, Today</span>
              </div>
          </div>) : (
            <div className="d-flex justify-content-start mb-4">
              <div className="msg_cotainer">
                  {ReactEmoji.emojify(text)}
                  <span className="msg_time">8:40 AM, Today</span>
              </div>
            </div>)
    )
}

export default Message;