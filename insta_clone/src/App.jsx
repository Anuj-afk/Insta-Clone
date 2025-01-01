import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/sidebar.Component";
import HomePage from "./pages/homePage";
import UserAuthForm from "./pages/userAuthForm.page";
import ProfilePage from "./pages/ProfilePage";
import { lookInSession } from "./common/session";
import SettingsSidebar from "./components/settingsSidebar.component";
import EditPage from "./pages/editPage";

export const UserContext = createContext({});

const App = () => {
    const [userAuth, setUserAuth] = useState({ accessToken: null });

    useEffect(() => {
        const userInSession = lookInSession("user");
        setUserAuth(
            userInSession ? JSON.parse(userInSession) : { accessToken: null }
        );
    }, []);

    return (
        <UserContext.Provider value={{ userAuth, setUserAuth }}>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<HomePage />} />
                    <Route path="profile/:id" element={<ProfilePage />} />
                    <Route path = "accounts" element={<SettingsSidebar></SettingsSidebar>}>
                        <Route path = "edit" element={<EditPage></EditPage>}></Route>
                    </Route>
                </Route>
                <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
                <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
            </Routes>
        </UserContext.Provider>
    );
};

export default App;
