import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

export default function Routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
