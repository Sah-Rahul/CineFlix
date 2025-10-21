import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Browse from "./components/Browse";
import Register from "./components/Register";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Browse /> : <Home />} />
          <Route
            path="/browse"
            element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
