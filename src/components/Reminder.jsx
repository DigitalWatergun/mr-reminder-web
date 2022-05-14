import React, { useState, useCallback } from "react";
import { ReminderDetails } from "./ReminderDetails";

export const Reminder = (props) => {
    const [expandState, setExpandState] = useState(false);
    const [expand, setExpand] = useState();

    const handleClick = useCallback(() => {
        if (expandState) {
            setExpandState(false);
            setExpand();
        } else {
            setExpandState(true);
            setExpand(<ReminderDetails data={props.data} />);
        }
    }, [expandState, expand]);

    return (
        <div className="reminder">
            <div className="reminderExpand" onClick={handleClick}>
                <p className="reminderTitle">{props.data.title}</p>
            </div>
            {expand}
        </div>
    );
};
