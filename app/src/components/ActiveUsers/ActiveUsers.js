import React from "react";
import Avatar from 'react-avatar';
import "./ActiveUsers.scss";

const ActiveUsers = ({users}) => {
    console.log("in text container",users)
    return (
            <div className="card-body contacts_body">
                <ui className="contacts">
                {
                    users.map((user, id) => {
                        console.log(user)
                        return (
                            <li className="active" key={id}>
                                <div className="d-flex bd-highlight">
                                    <div className="img_cont">
                                        <Avatar name={user.name}  size="60" />
                                        <span className="online_icon" />
                                    </div>
                                    <div className="user_info">
                                        <span>{user.name}</span>
                                    </div>
                                </div>
                            </li>)
                    })
                }
                </ui>
            </div>
    );
}

export default ActiveUsers;