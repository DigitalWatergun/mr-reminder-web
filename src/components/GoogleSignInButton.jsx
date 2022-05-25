import React, { useEffect, useState, useRef } from "react";
import { api } from "../api/api";

export const GoogleButton = (props) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const divRef = useRef(null);
    useEffect(() => {
        if (scriptLoaded) return undefined;

        const initializeGoogle = () => {
            if (!window.google || scriptLoaded) return;

            setScriptLoaded(true);
            window.google.accounts.id.initialize({
                client_id: window.GOOGLE_OAUTH_CLIENT_ID,
                callback: async (res, error) => {
                    if (error) {
                        console.log(error);
                    }

                    const loginData = {
                        authType: "google",
                        data: res,
                    };

                    const response = await api.loginUser(loginData);
                    if (response.status === 200) {
                        const stringResponse = JSON.stringify(response.data);
                        sessionStorage.setItem("user", stringResponse);
                        sessionStorage.setItem("isAuthenticated", true);
                        props.navigate("/reminders");
                    } else {
                        props.setLoadingState(false);
                        props.setError(response.response.data);
                    }
                },
            });
            window.google.accounts.id.renderButton(divRef.current, {
                theme: "outline",
                size: "large",
                width: divRef.current.clientWidth,
            });
        };

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = initializeGoogle;
        script.async = true;
        script.id = "google-client-script";
        document.querySelector("body").appendChild(script);

        return () => {
            window.google.accounts.id.cancel();
            document.getElementById("google-client-script").remove();
        };
        // }, [scriptLoaded, divRef.current, window]);
    }, [props, scriptLoaded]);

    return <div ref={divRef} />;
};
