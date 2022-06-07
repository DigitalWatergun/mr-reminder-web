import React from "react";

const apiResponseHandler = (res, navigate, setError) => {
    const response = res.response;
    let message;
    if (response.status === 401 || response.status === 403) {
        console.log(response.data);
        if (response.data === "No token found.") {
            message = "No token found or session expired.";
        } else {
            message = response.data;
        }
        sessionStorage.clear();
        navigate("/", { state: { message } });
    } else if (response.data === "Password requirements not met") {
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
        setError(response.data);
    }
};

export { apiResponseHandler };
