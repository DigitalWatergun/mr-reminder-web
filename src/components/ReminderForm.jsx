import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { convertRemindersToUTC } from "../conversion/convertReminders";
import { api } from "../api/api";

const DateInput = (props) => {
    return (
        <input
            name="date"
            type="date"
            value={props.date || ""}
            onChange={props.onInputChange}
        />
    );
};

const TimeInput = (props) => {
    return (
        <div>
            <input
                name="time"
                type="time"
                value={props.time || ""}
                onChange={props.onInputChange}
            />
        </div>
    );
};

const RepeatInput = (props) => {
    let minutes = props.minutes;
    if (minutes === "*") {
        minutes = 1;
    }

    return (
        <div>
            <label>
                Repeat Every # Minutes:
                <input
                    style={{ width: "50px", marginLeft: "auto" }}
                    name="minutes"
                    type="number"
                    min="1"
                    value={minutes || ""}
                    onChange={props.onInputChange}
                />
            </label>
            <br />
            <label>
                Repeat # Many Times:
                <input
                    style={{ width: "50px", marginLeft: "auto" }}
                    name="repeat"
                    type="number"
                    min="1"
                    value={props.repeat || ""}
                    onChange={props.onInputChange}
                />
            </label>
        </div>
    );
};

export const ReminderForm = (props) => {
    const [editState] = useState(() => {
        if (props.editState) {
            return props.editState;
        } else {
            return false;
        }
    });
    const [formData, setFormData] = useState(() => {
        if (props.data) {
            return props.data;
        } else {
            return {
                userId: JSON.parse(sessionStorage.getItem("user")).userId,
            };
        }
    });
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();

    const removeData = (item) => {
        const items = { ...formData };
        for (const i of item) {
            delete items[i];
        }
        setFormData(items);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;

        if (name === "dateEnable") {
            value = event.target.checked;
            if (!event.target.checked) {
                removeData(["date"]);
            }
        }

        if (name === "timeEnable") {
            value = event.target.checked;
            if (event.target.checked) {
                setFormData((items) => {
                    return { ...items, ["dateEnable"]: true };
                });
            } else {
                removeData(["time"]);
            }
        }

        if (name === "repeatEnable") {
            value = event.target.checked;
            if (event.target.checked) {
                setFormData((items) => {
                    return {
                        ...items,
                        ["dateEnable"]: false,
                        ["timeEnable"]: false,
                    };
                });
            } else {
                removeData(["repeatMinutes", "repeat"]);
            }
        }

        if (name === "enableEmail" || name === "enableSMS") {
            value = event.target.checked;
        }

        setFormData((items) => {
            return { ...items, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let reminder = formData;
        if (reminder.date && reminder.time) {
            reminder = convertRemindersToUTC(formData);
        }

        if (!editState) {
            const response = await api.createReminder(reminder);
            if (response.status === 200) {
                navigate("/reminders");
            } else if (
                response.response.status === 401 ||
                response.response.status === 403
            ) {
                sessionStorage.clear();
                navigate("/", { state: { message: "Session expired" } });
            } else {
                setError(response.response.data);
            }
        } else {
            const response = await api.editReminder(reminder);
            if (response.status === 200) {
                navigate("/reminders");
            } else if (
                response.response.status === 401 ||
                response.response.status === 403
            ) {
                sessionStorage.clear();
                navigate("/", { state: { message: "Session expired" } });
            } else {
                setError(response.response.data);
            }
        }
    };

    return (
        <div>
            <div className="formBoxes">
                <form className="customForm">
                    <label>Title</label>
                    <input
                        name="title"
                        type="text"
                        value={formData.title || ""}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label>Content</label>
                    <input
                        name="content"
                        type="text"
                        value={formData.content || ""}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label>
                        <span style={{ padding: "5px" }}>Date</span>
                        <label className="switch">
                            <input
                                name="dateEnable"
                                type="checkbox"
                                checked={formData.dateEnable || ""}
                                onChange={handleChange}
                                disabled={formData.repeatEnable}
                            />
                            <span className="slider"></span>
                        </label>
                    </label>
                    {formData.dateEnable ||
                    (formData.dateEnable && formData.timeEnable) ? (
                        <DateInput
                            date={formData.date}
                            onInputChange={handleChange}
                        />
                    ) : null}
                    <br />
                    <br />
                    <label>
                        <span style={{ padding: "5px" }}>Time</span>
                        <label className="switch">
                            <input
                                name="timeEnable"
                                type="checkbox"
                                checked={formData.timeEnable || ""}
                                onChange={handleChange}
                                disabled={!formData.dateEnable}
                            />
                            <span className="slider"></span>
                        </label>
                    </label>
                    {formData.timeEnable && formData.dateEnable ? (
                        <TimeInput
                            time={formData.time}
                            timeZone={formData.timeZone}
                            onInputChange={handleChange}
                        />
                    ) : null}
                    <br />
                    <br />
                    <label>
                        <span style={{ padding: "5px" }}>Timer</span>
                        <label className="switch">
                            <input
                                name="repeatEnable"
                                type="checkbox"
                                onChange={handleChange}
                                checked={formData.repeatEnable || ""}
                                disabled={
                                    formData.dateEnable ||
                                    (formData.dateEnable && formData.timeEnable)
                                }
                            />
                            <span className="slider"></span>
                        </label>
                    </label>
                    {formData.repeatEnable ? (
                        <RepeatInput
                            minutes={formData.minutes}
                            repeat={formData.repeat}
                            onInputChange={handleChange}
                        />
                    ) : null}
                    <br />
                    <br />
                    <label>
                        <span style={{ padding: "5px" }}>Email</span>
                        <label className="switch">
                            <input
                                name="enableEmail"
                                type="checkbox"
                                checked={formData.enableEmail || ""}
                                onChange={handleChange}
                            />
                            <span className="slider"></span>
                        </label>
                    </label>
                    {formData.enableEmail ? (
                        <input
                            name="email"
                            type="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                        />
                    ) : null}
                    <br />
                    <br />
                    <label>
                        <span style={{ padding: "5px" }}>SMS</span>
                        <label className="switch">
                            <input
                                name="enableSMS"
                                type="checkbox"
                                checked={formData.enableSMS || ""}
                                onChange={handleChange}
                            />
                            <span className="slider"></span>
                        </label>
                    </label>
                    {formData.enableSMS ? (
                        <input
                            name="mobile"
                            type="tel"
                            value={formData.mobile || ""}
                            onChange={handleChange}
                        />
                    ) : null}
                    <br />
                    <br />
                    <div className="errorText">{error}</div>
                    <br />
                    <Link to="/reminders">
                        <button className="buttonGray" type="button">
                            Cancel
                        </button>
                    </Link>
                    <button
                        className="buttonOrange"
                        style={{ float: "right" }}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
