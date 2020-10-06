import React, {useState, useEffect} from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Avatar from 'react-avatar';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages.js";
import ActiveUsers from "../ActiveUsers/ActiveUsers";
import "./Chat.css"

let socket;

const Chat = ({location}) => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsersAvailable] = useState([]);
    const [allUsers, setAllUsersAvailable] = useState([]);
    
    const ENDPOINT = "localhost:5000";



    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        socket.emit("join", {name, room}, ({userId}) => {
            //alert(error)
            setName(userId);
        })
        setRoom(room);

        return () => {
            socket.emit("disconnect");
            socket.off()
        }

    },[ENDPOINT, location.search])
    
    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message])
        })
    },[messages])

    useEffect(() => {
        socket.on("roomData", ({users, allUsers}) => {
            console.log(users)
            setUsersAvailable([...users])
            setAllUsersAvailable([...allUsers])
        })
    },[users])

    const sendMessage = event => {

        event.preventDefault();

        if(message) {
            socket.emit("sendMessage", message, () => {
                console.log("list of users",messages)
                setMessage("")
                setUsersAvailable([...messages])
            })
        }
    }
    console.log("all data",users)
    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center h-100">
                <InfoBar room={room}/>
                <div className="col-md-4 col-xl-3 chat">
                    <div className="card mb-sm-3 mb-md-0 contacts_card">
                        <div className="card-header">
                            <div className="input-group">
                            <input
                                type="text"
                                placeholder="Search..."
                                name
                                className="form-control search"
                            />
                            <div className="input-group-prepend">
                                <span className="input-group-text search_btn">
                                <i className="fas fa-search" />
                                </span>
                            </div>
                            </div>
                        </div>
                        <ActiveUsers users={allUsers}/>
                    </div>
                </div>
                <div className="col-md-8 col-xl-6 chat">
                    <div className="card">
                        <div className="card-header msg_head">
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <Avatar name={name}  size="60" />
                                    <span className="online_icon" />
                                </div>
                                <div className="user_info">
                                    <span>Chat with {name}</span>
                                    <p>{messages.length} Messages</p>
                                </div>
                            </div>
                            <span id="action_menu_btn">
                                <i className="fas fa-ellipsis-v" />
                            </span>
                            <div className="action_menu">
                                <ul>
                                <li>
                                <i className="fas fa-user-circle" /> View profile
                                </li>
                                <li>
                                <i className="fas fa-users" /> Add to close friends
                                </li>
                                <li>
                                <i className="fas fa-plus" /> Add to group
                                </li>
                                <li>
                                <i className="fas fa-ban" /> Block
                                </li>
                            </ul>
                            </div>
                        </div>
                        <Messages messages={messages} name={name}/>
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                    </div>
                    {/* <TextContainer users={users}/> */}
                </div>
            </div>
        </div>
    );
}

export default Chat;