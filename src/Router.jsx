import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error } from "./pages/Error";
import { Login } from "./pages/LoginPage";
import { RemindersPage } from "./pages/RemindersPage";
import { CreateRemindersPage } from "./pages/CreateRemindersPage";
import { EditReminderPage } from "./pages/EditReminderPage";
import { Settings } from "./pages/SettingsPage";
import { ChangePassword } from "./pages/ChangePasswordPage";
import { Register } from "./pages/RegisterPage";
import { ForgotPassword } from "./pages/ForgotPasswordPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reminders/" element={<RemindersPage />} />
                <Route
                    path="/reminders/create"
                    element={<CreateRemindersPage />}
                />
                <Route path="/reminders/edit" element={<EditReminderPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/password" element={<ChangePassword />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword" element={<ChangePassword />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};
