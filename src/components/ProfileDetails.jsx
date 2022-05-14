import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export const ProfileDetails = (props) => {
    const user = props.user;
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate("/settings");
    };

    const handleLogoutClick = async () => {
        const data = { userId: user.userId };
        const response = await api.logoutUser(data);
        console.log(`${response.data}`);
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <div className="profilePopup">
            <div className="profileBox">
                <p className="profileBoxItems" onClick={handleSettingsClick}>
                    Settings
                </p>
                <p className="profileBoxItems" onClick={handleLogoutClick}>
                    Logout
                </p>
            </div>
        </div>
    );
};
