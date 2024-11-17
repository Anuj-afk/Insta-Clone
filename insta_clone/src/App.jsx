import { HashRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route
              index
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="profile/:id"
              element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
