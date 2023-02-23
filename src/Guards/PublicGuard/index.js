import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Publiclayout from "../../Layouts/Publiclayout";
import LocalStorageService from "../../Services/Localstorage";

const PublicGuard = () => {
  const navigate = useNavigate();
  let token = LocalStorageService.getAccessToken();
  // console.log(token);
  // if (token === null) {

  // }
  return token !== null ? (
    navigate("/dashboard")
  ) : (
    <Publiclayout>
      <Outlet />
    </Publiclayout>
  );

  // if (token) {
  //   <Navigate to="/dashboard" />;
  // } else {
  //   return (
  //     <Publiclayout>
  //       <Outlet />
  //     </Publiclayout>
  //   );
  // }
};

export default PublicGuard;
