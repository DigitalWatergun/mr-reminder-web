import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading";
import { api } from "../api/api";
import { apiResponseHandler } from "../api/apiResponseHandler";

export const GoogleSignInRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const loginUser = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            let code;
            for (const [key, value] of urlParams) {
                if (key === "code") {
                    code = value;
                }
            }

            const response = await api.loginWithGoogle({ code });
            if (response.status === 200) {
                const stringResponse = JSON.stringify(response.data);
                sessionStorage.setItem("user", stringResponse);
                navigate("/reminders");
            } else {
                apiResponseHandler(response, navigate);
            }
        };

        loginUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <HeaderFooter userState={false} user={undefined}>
            <Loading />
        </HeaderFooter>
    );
};
