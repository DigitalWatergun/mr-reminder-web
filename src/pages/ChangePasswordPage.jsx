import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading";
import { api } from "../api/api";

export const ChangePassword = () => {
    const state = useLocation();
    const [changePassword] = useState(() => {
        if (state.state === null) {
            return undefined;
        } else {
            return state.state.changePassword;
        }
    });
    const [formData, setFormData] = useState(() => {
        if (sessionStorage.getItem("user")) {
            const user = JSON.parse(sessionStorage.getItem("user"));
            return { userId: user.userId, changePassword: user.changePassword };
        }
    });
    const [loadingState, setLoadingState] = useState(false);
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setError(undefined);
        const name = event.target.name;
        const value = event.target.value;

        setFormData((items) => {
            return { ...items, [name]: value };
        });
    };

    const handleUpdateClick = async (e) => {
        e.preventDefault();
        setLoadingState(true);

        const response = await api.changeUserPassword(formData);
        if (response.status === 200) {
            sessionStorage.clear();
            navigate("/", {
                state: { message: "Please log in with your new password." },
            });
        } else if (
            response.response.status === 401 ||
            response.response.status === 403
        ) {
            sessionStorage.clear();
            navigate("/", { state: { message: "Session expired" } });
        } else {
            setLoadingState(false);
            if (response.response.data === "Password requirements not met") {
                setError(
                    <div>
                        <p>The password needs to be:</p>
                        <ul style={{ textAlign: "left" }}>
                            <li>Between 8 and 32 characters</li>
                            <li>Contain 1 Uppercase character</li>
                            <li>Contain 1 Lowercase character</li>
                            <li>Contain 1 Number</li>
                            <li>Contain 1 special character</li>
                        </ul>
                    </div>
                );
            } else {
                setError(response.response.data);
            }
        }
    };

    return (
        <HeaderFooter>
            {loadingState ? (
                <Loading />
            ) : (
                <div>
                    {changePassword ? (
                        <h2 className="pageHeading">Reset Password</h2>
                    ) : (
                        <h2 className="pageHeading">Change Password</h2>
                    )}
                    <div className="formBoxes">
                        <form className="customForm">
                            <label>Password</label>
                            <input
                                name="currentPassword"
                                type="password"
                                onChange={handleChange}
                            ></input>
                            <br />
                            <br />
                            <label>New Password</label>
                            <input
                                name="newPassword"
                                type="password"
                                onChange={handleChange}
                            ></input>
                            <br />
                            <br />
                            <label>Confirm New Password</label>
                            <input
                                name="confirmNewPassword"
                                type="password"
                                onChange={handleChange}
                            ></input>
                            <br />
                            <br />
                            <div className="errorText">{error}</div>
                            <br />
                            {changePassword ? (
                                <Link to="/">
                                    <button
                                        className="buttonGray"
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/reminders">
                                    <button
                                        className="buttonGray"
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            )}
                            <button
                                className="buttonOrange"
                                style={{ float: "right" }}
                                onClick={handleUpdateClick}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </HeaderFooter>
    );
};
