// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/sidebar.Component";
import HomePage from "./pages/homePage";
const App = () => {
    return (
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
  );
};

export default App;
