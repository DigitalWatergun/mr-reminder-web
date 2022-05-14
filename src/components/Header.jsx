import React, { useState, useEffect } from "react";
import { Profile } from "./Profile";
import image from "../static/sticky.png";

export const Header = (props) => {
    const [userState] = useState(props.userState);
    const [user] = useState(props.user);
    const [profile, setProfile] = useState();

    useEffect(() => {
        if (userState) {
            setProfile(<Profile user={user} />);
        } else {
            setProfile(undefined);
        }
    }, [user, userState]);

    return (
        <div className="header">
            <img src={image} alt="icon" height="50" width="60"></img>
            <p className="headerTitle">Mr. Reminder</p>
            {profile}
        </div>
    );
};
