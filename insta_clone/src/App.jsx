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

  // return (
  //   <UserContext.Provider value={{ userAuth, setUserAuth }}>
  //     <Routes>
  //       {/* Redirect from the root to /Insta-Clone */}
  //       {/* <Route path="/" element={<Navigate to="/Insta-Clone/signin" />} />   */}
        
  //       {/* Main routes inside /Insta-Clone */}
  //       <Route path="/Insta-Clone" element={<Navbar />}>
  //         {/* Home Page Route */}
  //         <Route index element={<HomePage />} />
  //         {/* Profile Page Route */}
  //         <Route path="profile/:id" element={<ProfilePage />} />
  //       </Route>

  //       {/* Authentication Routes */}
  //       <Route path="/Insta-Clone/signin" element={<UserAuthForm type="sign-in" />} />
  //       <Route path="/Insta-Clone/signup" element={<UserAuthForm type="sign-up" />} />
  //     </Routes>
  //   </UserContext.Provider>
  // );
  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        {/* Redirect from the root to /Insta-Clone */}
        {/* <Route path="/" element={<Navigate to="/Insta-Clone/signin" />} />   */}
        
        {/* Main routes inside /Insta-Clone */}
        <Route path="/" element={<Navbar />}>
          {/* Home Page Route */}
          <Route index element={<HomePage />} />
          {/* Profile Page Route */}
          <Route path="profile/:id" element={<ProfilePage />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
