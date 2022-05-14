import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Reminder } from "../components/Reminder";
import { HeaderFooter } from "../components/HeaderFooter";
import { convertRemindersToLocal } from "../conversion/convertReminders.js";
import { api } from "../api/api";

export const RemindersPage = () => {
    const [reminders, setReminders] = useState([]);
    const [user] = useState(JSON.parse(sessionStorage.getItem("user")));
    const navigate = useNavigate();

    const callBackendAPI = async () => {
        console.log("Calling backend Reminders API...");

        const response = await api.getAllReminders();
        if (response.status === 200) {
            const reminders = convertRemindersToLocal(response.data);
            setReminders(reminders);
        } else if (
            response.response.status === 401 ||
            response.response.status === 403
        ) {
            console.log(response.response.data);
            sessionStorage.clear();
            navigate("/", { state: { message: "Session expired" } });
        }
    };

    const handleCreateClick = () => {
        navigate("/reminders/create");
    };

    useEffect(callBackendAPI, []);

    return (
        <HeaderFooter userState={true} user={user}>
            <h2 className="pageHeading">My Reminders</h2>
            {reminders.map((reminders, index) => {
                return <Reminder key={index} data={reminders} />;
            })}
            <button
                style={{ margin: "5 auto" }}
                className="reminderCreateButton"
                onClick={handleCreateClick}
            >
                Create Reminder
            </button>
        </HeaderFooter>
    );
};
