// App.js
import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/sidebar.Component";
import HomePage from "./pages/homePage";
import UserAuthForm from "./pages/userAuthForm.page";
import ProfilePage from "./pages/ProfilePage";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({ accessToken: null });

  useEffect(() => {
    const userInSession = lookInSession("user");
    setUserAuth(userInSession ? JSON.parse(userInSession) : { accessToken: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/Insta-Clone" element={<Navbar />}>
          {/* Home Page Route */}
          <Route
            index
            element={
              userAuth.accessToken ? (
                <HomePage />
              ) : (
                <Navigate to="/Insta-Clone/signin" replace />
              )
            }
          />
          {/* Profile Page Route */}
          <Route
            path="profile/:id"
            element={
              userAuth.accessToken ? (
                <ProfilePage />
              ) : (
                <Navigate to="/Insta-Clone/signin" replace />
              )
            }
          />
        </Route>

        {/* Authentication Routes */}
        <Route path="/Insta-Clone/signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="/Insta-Clone/signup" element={<UserAuthForm type="sign-up" />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
