import React from "react";
import loading from "../static/loading.gif";

export const Loading = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <img width="25" height="25" src={loading} alt="loading_img" />
        </div>
    );
};
