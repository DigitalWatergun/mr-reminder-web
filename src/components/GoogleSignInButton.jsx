import React, { useEffect, useState, useRef } from "react";

export const GoogleButton = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const divRef = useRef(null);
    useEffect(() => {
        if (scriptLoaded) return undefined;

        const initializeGoogle = () => {
            if (!window.google || scriptLoaded) return;

            setScriptLoaded(true);
            window.google.accounts.id.initialize({
                client_id: "",
                callback: async (res, error) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log(res);
                    // send res.credentials to backend for validation
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
    }, [scriptLoaded, divRef.current, window]);

    return <div ref={divRef} />;
};
