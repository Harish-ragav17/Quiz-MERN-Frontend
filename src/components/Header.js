import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/header.css";
import { getScore, logout } from "../backend_connection/api_req";

const Header = ({ loggedin,setloggedin,setScore,Score}) => {
 
   useEffect(()=>{
    getScore(setScore);
   })
  return (
    <div>
      <div id="header">
        <div id="header-logo">
          <Link to={"/"}>Quiz-Z </Link>
        </div>

        <div id="header-items">
          {!loggedin && <Link to={"/login"}>Login</Link>}
          {loggedin && <Link>{localStorage.getItem("username")}</Link>}
          {loggedin && <Link onClick={()=>logout(setloggedin)} >Logout</Link>}
          {loggedin && <Link>Score: {Score}</Link>}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Header;
