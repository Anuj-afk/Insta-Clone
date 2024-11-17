// App.js
import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/sidebar.Component";
import HomePage from "./pages/homePage";
import UserAuthForm from "./pages/userAuthForm.page";
import ProfilePage from "./pages/ProfilePage";
import { lookInSession } from "./common/session";
import ProtectedRoutes from "./components/ProtectedRoute.component";


export const UserContext = createContext({})
const App = () => {
    const [userAuth, setUserAuth] = useState({});

    useEffect(() => {
        let userInSession = lookInSession("user");
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({accessToken: null});
    }, [])

    return (
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path="/Insta-Clone" element={<Navbar />}>
              <Route index element={<ProtectedRoutes> <HomePage /> </ProtectedRoutes>}/>
              <Route path="profile/:id" element={<ProtectedRoutes> <ProfilePage /></ProtectedRoutes>}/>
              {/* <Route index element={<HomePage />}/>
              <Route path="profile/:id" element={<ProfilePage />}/> */}
          </Route>
          <Route path="/Insta-Clone/signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="/Insta-Clone/signup" element={<UserAuthForm type="sign-up" />} />
        </Routes>
      </UserContext.Provider>
    );
  };
  

export default App;
