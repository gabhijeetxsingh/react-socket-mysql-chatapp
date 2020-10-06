import React from "react";

import "./Input.css";

const Input = ({message, setMessage, sendMessage}) => {
    return (
        <div className="card-footer">
            <form className="form">
                    <div className="input-group">
                      <textarea
                        value={message} 
                        name
                        className="form-control type_msg"
                        placeholder="Type your message..."
                        defaultValue={""}
                        onChange={(event) => setMessage(event.target.value)} 
                        onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text send_btn" onClick={event => sendMessage(event)}>
                          <i className="fas fa-location-arrow" />
                        </span>
                      </div>
                    </div>
                </form>
                </div>
    )
}

export default Input;