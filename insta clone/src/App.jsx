// App.js
import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/sidebar.Component";
import HomePage from "./pages/homePage";
import UserAuthForm from "./pages/userAuthForm.page";
import ProfilePage from "./pages/ProfilePage";
import { lookInSession } from "./common/session";


export const UserContext = createContext({})
const App = () => {
    const [userAuth, setUserAuth] = useState({});

    useEffect(() => {
        let userInSession = lookInSession("user");
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({accessToken: null});
    }, [])

    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route index element={<HomePage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
              <Route path="/signin" element={<UserAuthForm type="sign-in"></UserAuthForm>}></Route>
              <Route path="/signup" element={<UserAuthForm type="sign-up"></UserAuthForm>}></Route>
            </Routes>
        </UserContext.Provider>
  );
};

export default App;
