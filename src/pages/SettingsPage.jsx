import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter.jsx";
import { api } from "../api/api";

export const Settings = () => {
    const [user] = useState(JSON.parse(sessionStorage.getItem("user")));
    const navigate = useNavigate();

    const handleChangePasswordClick = () => {
        navigate("/settings/password");
    };

    const handleDeleteClick = async () => {
        const userId = JSON.parse(sessionStorage.getItem("user"))["userId"];
        const data = { userId: userId };
        await api.deleteUser(data);
        sessionStorage.clear();
        navigate("/");
    };

    const handleBackClick = () => {
        navigate("/reminders");
    };

    useEffect(() => {
        if (!user) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <HeaderFooter>
            <h2 className="pageHeading">Settings</h2>
            <div>
                <button
                    className="buttonOrange"
                    style={{ width: 250 }}
                    onClick={handleChangePasswordClick}
                >
                    Change Password
                </button>
            </div>
            <br />
            <div>
                <button
                    className="buttonGray"
                    style={{ width: 250 }}
                    onClick={handleDeleteClick}
                >
                    Delete Account
                </button>
            </div>
            <br />
            <div>
                <button
                    className="buttonGray"
                    style={{ width: 250 }}
                    onClick={handleBackClick}
                >
                    Back
                </button>
            </div>
        </HeaderFooter>
    );
};
