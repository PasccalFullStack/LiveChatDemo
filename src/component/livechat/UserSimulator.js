import React from 'react';

export default function UserSimulator(props) {
    const changeActifUser = () => {
        let name = document.querySelector('#actifUser').value;
        if (name !== "User choice") {
            props.setShowActifUser({
                display: true,
                id: name.substr(0, name.indexOf(" / ")),
                pseudo: name.substr(name.indexOf(" / ") +
                    3, name.indexOf(" - ") - 4),
                username: name.substr(name.indexOf(" - ") + 3),
            });
        } else {
            props.setShowActifUser({
                display: false,
                id: 0,
                pseudo: '',
                username: '',
            });
        }
    };
    return (
        <div className="showUser">
            {props.showActifUser.display && (
            <p>{props.showActifUser.username}</p>
            )}
            <select
                className="userChoiceSelector"
                id="actifUser"
                onChange={() => changeActifUser()}
                style={{textAlign: 'center'}}>
                    <option key={"userChoice"}>User choice</option>
                    {props.userList.length > 0
                        && props.userList.map((user, index) => (
                        <option
                            key={"user" + index}
                            value={user.id +
                                " / " + user.user_pseudo +
                                " - " + user.user_firstname +
                                " " + user.user_lastname}>
                            {user.user_pseudo}
                        </option>
                    ))}
            </select>
        </div>
    )
}