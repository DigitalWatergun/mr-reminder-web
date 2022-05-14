import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading";
import { api } from "../api/api";

export const Register = () => {
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

    const handleRegisterClick = async (e) => {
        e.preventDefault();
        setLoadingState(true);
        const response = await api.registerUser(formData);
        if (response.status === 201) {
            setSubmitted(true);
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

    if (submitted) {
        return (
            <HeaderFooter>
                <h2 className="pageHeading">Register</h2>
                <p style={{ color: "#fff" }}>
                    An activation email has been sent to your registered email.
                </p>
                <Link to="/">
                    <button className="buttonOrange" style={{ float: "none" }}>
                        Login
                    </button>
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
                        <h2 className="pageHeading">Register</h2>
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
                                <label>Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                ></input>
                                <br />
                                <br />
                                <label>Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
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
                                    onClick={handleRegisterClick}
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </HeaderFooter>
        );
    }
};
