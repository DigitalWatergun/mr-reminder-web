import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter.jsx";
import { api } from "../api/api";

export const Settings = () => {
    const navigate = useNavigate();

    const handleChangePasswordClick = () => {
        navigate("/settings/password");
    };

    const handleDeleteClick = async () => {
        await api.deleteUser();
        sessionStorage.clear();
        navigate("/", { state: { message: "Account has been deleted" } });
    };

    const handleBackClick = () => {
        navigate("/reminders");
    };

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
