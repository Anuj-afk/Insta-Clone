import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        {/* Wrap App with BrowserRouter here */}
        <App />
    </BrowserRouter>
);
//   <BrowserRouter basename="/Insta-Clone"> {/* Wrap App with BrowserRouter here */}
//     <App />
//   </BrowserRouter>
// )
