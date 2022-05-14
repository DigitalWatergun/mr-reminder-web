import React from "react";
import { useLocation } from "react-router-dom";
import { ReminderForm } from "../components/ReminderForm";
import { HeaderFooter } from "../components/HeaderFooter";

export const EditReminderPage = () => {
    const state = useLocation();

    return (
        <HeaderFooter>
            <h2 className="pageHeading">
                Editing Reminder: {state.state.data.title}
            </h2>
            <ReminderForm data={state.state.data} editState={true} />
        </HeaderFooter>
    );
};
