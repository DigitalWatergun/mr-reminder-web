import React, { useState, useCallback } from "react";
import { ProfileDetails } from "./ProfileDetails";

export const Profile = (props) => {
    const [expandState, setExpandState] = useState(false);
    const [expand, setExpand] = useState();
    const user = props.user;

    const handleClick = useCallback(() => {
        if (expandState) {
            setExpandState(false);
            setExpand();
        } else {
            setExpandState(true);
            setExpand(<ProfileDetails user={user} />);
        }
    }, [expandState, user]);

    return (
        <div>
            <div className="profile" onClick={handleClick}>
                <p className="headerUser">{user.username} ☰</p>
                {expand}
            </div>
        </div>
    );
};
