import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicGuard from "../Guards/PublicGuard";
import PrivateGuard from "../Guards/PrivateGuard";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import Posts from "../Pages/Posts";
import Album from "../Pages/Album";
import Comment from "../Pages/Comment";

const Routing = () => {
  return (
    <Routes>
      <Route element={<PublicGuard />}>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<PrivateGuard />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/comments" element={<Comment />} />
        <Route path="/albums" element={<Album />} />
      </Route>
    </Routes>
  );
};

export default Routing;
