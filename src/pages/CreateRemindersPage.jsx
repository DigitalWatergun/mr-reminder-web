import React from "react";
import { ReminderForm } from "../components/ReminderForm";
import { HeaderFooter } from "../components/HeaderFooter";

export const CreateRemindersPage = () => {
    return (
        <HeaderFooter>
            <h2 className="pageHeading">Create Reminder</h2>
            <ReminderForm />
        </HeaderFooter>
    );
};
