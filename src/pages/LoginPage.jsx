import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading";
import googleButton from "../static/googleButton.png";
import { api } from "../api/api";
import image from "../static/sticky.png";

const getGoogleOAuthURL = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        redirect_uri: `${window.CLIENT_BASE_URL}/users/login/google`,
        client_id: window.GOOGLE_OAUTH_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
};

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
        const loginData = {
            authType: "local",
            data: {
                username: formData.username,
                password: formData.password,
                registerHash: formData.registerHash,
            },
        };
        const response = await api.loginUser(loginData);
        if (response.status === 200) {
            const stringResponse = JSON.stringify(response.data);
            sessionStorage.setItem("user", stringResponse);
            navigate("/reminders");
        } else if (response.response.status === 401) {
            setLoadingState(false);
            setFormData({});
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
                        alt="logo"
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
                            <p
                                style={{
                                    fontSize: 13,
                                    fontWeight: "regular",
                                    textAlign: "center",
                                }}
                            >
                                or
                            </p>
                            <div>
                                <a
                                    className="googleSignInBox"
                                    href={getGoogleOAuthURL()}
                                >
                                    <div className="googleSignInButton">
                                        <img
                                            src={googleButton}
                                            alt="googleSignInIcon"
                                            style={{
                                                width: "40px",
                                            }}
                                        />
                                        <span className="googleSignInButtonText">
                                            Sign In with Google
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HeaderFooter>
    );
};
