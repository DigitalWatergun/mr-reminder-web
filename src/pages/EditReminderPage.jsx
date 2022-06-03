import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReminderForm } from "../components/ReminderForm";
import { HeaderFooter } from "../components/HeaderFooter";

export const EditReminderPage = () => {
    const browserState = useLocation();
    const navigate = useNavigate();
    const [data] = useState(() => {
        if (!browserState.state) return undefined;
        return browserState.state.data;
    });

    useEffect(() => {
        if (!data) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <HeaderFooter>
            <h2 className="pageHeading">
                Editing Reminder: {data && data.title}
            </h2>
            <ReminderForm data={data && data} editState={true} />
        </HeaderFooter>
    );
};
