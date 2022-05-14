import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditReminderPopup } from "./EditReminderBox";
import { api } from "../api/api";

export const ReminderDetails = (props) => {
    const [editPopup] = useState(false);
    const navigate = useNavigate();

    const handleRunClick = async () => {
        const response = await api.runReminder(props.data);
        if (response.status === 200) {
            window.location.reload();
        } else if (
            response.response.status === 401 ||
            response.response.status === 403
        ) {
            sessionStorage.clear();
            navigate("/", { state: { message: "Session expired" } });
        }
    };

    const handleStopClick = async () => {
        const response = await api.stopReminder(props.data);
        if (response.status === 200) {
            window.location.reload();
        } else if (
            response.response.status === 401 ||
            response.response.status === 403
        ) {
            sessionStorage.clear();
            navigate("/", { state: { message: "Session expired" } });
        }
    };

    const handleEditClick = () => {
        navigate("/reminders/edit", { state: { data: props.data } });
    };

    const handleDeleteClick = async () => {
        const response = await api.deleteReminder(props.data);
        console.log(response);
        if (response.status === 200) {
            window.location.reload();
        } else if (
            response.response.status === 401 ||
            response.response.status === 403
        ) {
            sessionStorage.clear();
            navigate("/", { state: { message: "Session expired" } });
        }
    };

    return (
        <div>
            <div className="reminderDetail">
                <table className="reminderDetailTable">
                    <tbody>
                        <tr>
                            <td className="field">Content:</td>
                            <td>{props.data.content}</td>
                        </tr>
                        <tr>
                            <td className="field">Status:</td>
                            <td>{props.data.status}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
            </div>
            <button
                className="reminderRunButton"
                onClick={handleRunClick}
                disabled={props.data.status === "ACTIVE"}
            >
                RUN
            </button>
            <button
                className={
                    props.data.status === "ACTIVE"
                        ? "reminderGrayButton"
                        : "reminderGrayButtonDisabled"
                }
                onClick={handleStopClick}
                disabled={props.data.status === "INACTIVE"}
            >
                STOP
            </button>
            <button
                className={
                    props.data.status === "ACTIVE"
                        ? "reminderGrayButtonDisabled"
                        : "reminderGrayButton"
                }
                onClick={handleEditClick}
                disabled={props.data.status === "ACTIVE"}
            >
                EDIT
            </button>
            <button
                className={
                    props.data.status === "ACTIVE"
                        ? "reminderGrayButtonDisabled"
                        : "reminderGrayButton"
                }
                style={{ paddingLeft: "10px" }}
                onClick={handleDeleteClick}
                disabled={props.data.status === "ACTIVE"}
            >
                DELETE
            </button>
            {editPopup && (
                <EditReminderPopup
                    content={props.data}
                    handleClose={handleEditClick}
                />
            )}
        </div>
    );
};
