import React from "react";
import { ReminderForm } from "./ReminderForm";

export const EditReminderPopup = (props) => {
    return (
        <div className="popup-box">
            <div className="box">
                <h3>Editing: {props.content.title}</h3>
                <ReminderForm
                    data={props.content}
                    editState={true}
                    close={props.handleClose}
                />
            </div>
        </div>
    );
};
