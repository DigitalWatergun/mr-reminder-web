import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading";
import { api } from "../api/api";
import { apiResponseHandler } from "../api/apiResponseHandler";

export const ChangePassword = () => {
    const [user] = useState(JSON.parse(sessionStorage.getItem("user")));
    const state = useLocation();
    const [changePassword] = useState(() => {
        if (state.state === null) {
            return undefined;
        } else {
            return state.state.changePassword;
        }
    });
    const [formData, setFormData] = useState(() => {
        if (user) {
            return {
                changePassword: user.changePassword,
                type: user.type,
            };
        } else {
            return {};
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
        } else {
            setLoadingState(false);
            apiResponseHandler(response, navigate, setError);
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
                            <div className="errorText">
                                {formData.type === "google"
                                    ? "This account is managed by Google"
                                    : error}
                            </div>
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
                                disabled={formData.type === "google"}
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
