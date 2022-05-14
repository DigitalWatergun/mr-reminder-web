import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading";
// import { GoogleButton } from "../components/GoogleSignInButton"
import { api } from "../api/api";
import image from "../static/sticky.png";

export const Login = () => {
    const state = useLocation();
    const [formData, setFormData] = useState({});
    const [active, setActive] = useState(undefined);
    const [loadingState, setLoadingState] = useState(false);
    const [error, setError] = useState(() => {
        if (state.state === null) {
            return undefined;
        } else {
            return state.state.message;
        }
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setError(undefined);
        const name = event.target.name;
        const value = event.target.value;

        setFormData((items) => {
            return { ...items, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingState(true);
        const data = {
            username: formData.username,
            password: formData.password,
            registerHash: formData.registerHash,
        };
        const response = await api.loginUser(data);
        if (response.status === 200) {
            const stringResponse = JSON.stringify(response.data);
            sessionStorage.setItem("user", stringResponse);
            sessionStorage.setItem("isAuthenticated", true);
            navigate("/reminders");
        } else if (response.response.status === 401) {
            setLoadingState(false);
            setError(response.response.data);
            setActive(
                <div>
                    <label>Activation Code: </label>
                    <input
                        name="registerHash"
                        type="text"
                        onChange={handleChange}
                    ></input>
                    <br />
                    <br />
                </div>
            );
        } else {
            setLoadingState(false);
            setError(response.response.data);
        }
    };

    return (
        <HeaderFooter userState={false} user={undefined}>
            {loadingState ? (
                <Loading />
            ) : (
                <div>
                    <img
                        style={{ marginTop: 15 }}
                        width="120"
                        height="100"
                        src={image}
                    ></img>
                    <div className="formBoxes">
                        <form className="customForm">
                            <label>Username</label>
                            <input
                                name="username"
                                type="text"
                                onChange={handleChange}
                            />
                            <br />
                            <br />
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                onChange={handleChange}
                            />
                            <a href="/forgotpassword">Forgot your password?</a>
                            <br />
                            {active}
                            <div className="errorText">{error}</div>
                            <br />
                            <button
                                className="buttonSignIn"
                                onClick={handleSubmit}
                            >
                                Sign In
                            </button>
                            <a href="/register">Need an account? Register</a>
                            {/* <p style={{ fontSize: 13, fontWeight: "regular", textAlign: "center" }}>or</p> */}
                            {/* <GoogleButton/> */}
                        </form>
                    </div>
                </div>
            )}
        </HeaderFooter>
    );
};
