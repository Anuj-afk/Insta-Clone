import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/sidebar.Component";
import HomePage from "./pages/homePage";
import UserAuthForm from "./pages/userAuthForm.page";
import ProfilePage from "./pages/ProfilePage";
import { lookInSession, storeInSession } from "./common/session";
import SettingsSidebar from "./components/settingsSidebar.component";
import EditPage from "./pages/editPage";
import axios from "axios";

export const UserContext = createContext({});

const App = () => {
    const [userAuth, setUserAuth] = useState({accessToken: null}); // Represents user authentication state
    const [loading, setLoading] = useState(true); // Indicates if user session is being verified

    useEffect(() => {
        const userInSession = lookInSession("user");
        if (userInSession) {
            const parsedUser = JSON.parse(userInSession);
            axios
                .post(`${import.meta.env.VITE_SERVER_DOMAIN}/reload`, { username: parsedUser.username })
                .then(({ data }) => {
                    storeInSession("user", JSON.stringify(data));
                    setUserAuth(data);
                })
                .catch((err) => {
                    console.error("Error reloading user data:", err);
                    setUserAuth(null);
                })
                .finally(() => setLoading(false));
        } else {
            setUserAuth({accessToken: null});
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loader or placeholder while verifying user
    }

    return (
        <UserContext.Provider value={{ userAuth, setUserAuth, loading }}>
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
