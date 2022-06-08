import axios from "axios";

const BASEURL = window.API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASEURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

const apiHelper = async (method, route, data) => {
    try {
        if (method === "get") {
            const response = await axiosInstance.get(
                BASEURL + route,
                JSON.stringify(data)
            );
            if (response) {
                return response;
            }
        } else if (method === "post") {
            const response = await axiosInstance.post(
                BASEURL + route,
                JSON.stringify(data)
            );
            if (response) {
                return response;
            }
        } else if (method === "delete") {
            const response = await axiosInstance.delete(BASEURL + route, {
                data: JSON.stringify(data),
            });
            if (response) {
                return response;
            }
        } else if (method === "patch") {
            const response = await axiosInstance.patch(
                BASEURL + route,
                JSON.stringify(data)
            );
            if (response) {
                return response;
            }
        }
    } catch (err) {
        return err;
    }
};

const loginWithGoogle = async (data) => {
    return await apiHelper("post", "/users/login/google", data);
};

const registerUser = async (data) => {
    return await apiHelper("post", "/users", data);
};

const loginUser = async (data) => {
    return await apiHelper("post", "/users/login", data);
};

const logoutUser = async (data) => {
    return await apiHelper("post", "/users/logout", data);
};

const changeUserPassword = async (data) => {
    return await apiHelper("post", "/users/update", data);
};

const resetPassword = async (data) => {
    return await apiHelper("post", "/users/reset", data);
};

const deleteUser = async () => {
    return await apiHelper("delete", "/users");
};

const getAllReminders = async () => {
    return await apiHelper("get", "/reminders");
};

const createReminder = async (data) => {
    return await apiHelper("post", "/reminders", data);
};

const deleteReminder = async (data) => {
    return await apiHelper("delete", "/reminders", data);
};

const editReminder = async (data) => {
    return await apiHelper("patch", "/reminders/update", data);
};

const runReminder = async (data) => {
    return await apiHelper("post", "/reminders/run", data);
};

const stopReminder = async (data) => {
    return await apiHelper("post", "/reminders/stop", data);
};

export const api = {
    loginWithGoogle,
    registerUser,
    loginUser,
    logoutUser,
    changeUserPassword,
    resetPassword,
    deleteUser,
    getAllReminders,
    createReminder,
    deleteReminder,
    editReminder,
    runReminder,
    stopReminder,
};
