import React from "react";
import LocalStorageService from "../../Services/Localstorage";
import { Outlet, useNavigate } from "react-router-dom";
import Privatelayout from "../../Layouts/Privatelayout";

const PrivateGuard = () => {
  const navigate = useNavigate();
  let token = LocalStorageService.getAccessToken();
  return token === null ? (
    navigate("/register")
  ) : (
    <Privatelayout>
      <Outlet />
    </Privatelayout>
  );
};

export default PrivateGuard;
