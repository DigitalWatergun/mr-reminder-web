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
    } else {
        setError(response.data);
    }
};

export { apiResponseHandler };
