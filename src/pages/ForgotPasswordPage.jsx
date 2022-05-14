import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading";
import { api } from "../api/api";

export const ForgotPassword = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({});
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

    const handleCancelClick = () => {
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingState(true);
        const data = { username: formData.username, email: formData.email };
        const response = await api.resetPassword(data);
        if (response.status === 200) {
            setLoadingState(false);
            setSubmitted(true);
        } else {
            setLoadingState(false);
            setError(response.response.data);
        }
    };

    if (submitted) {
        return (
            <HeaderFooter>
                <h2 className="pageHeading">Forgot Password</h2>
                <p style={{ color: "#fff" }}>
                    An temporary password has been sent to your registered
                    email.
                </p>
                <Link to="/">
                    <button className="buttonOrange">Login</button>
                </Link>
            </HeaderFooter>
        );
    } else {
        return (
            <HeaderFooter>
                {loadingState ? (
                    <Loading />
                ) : (
                    <div>
                        <h2 className="pageHeading">Forgot Password</h2>
                        <div className="formBoxes">
                            <form className="customForm">
                                <label>Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    onChange={handleChange}
                                ></input>
                                <br />
                                <br />
                                <label>Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                ></input>
                                <br />
                                <br />
                                <div className="errorText">{error}</div>
                                <br />
                                <button
                                    className="buttonGray"
                                    onClick={handleCancelClick}
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="buttonOrange"
                                    style={{ float: "right" }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </HeaderFooter>
        );
    }
};
