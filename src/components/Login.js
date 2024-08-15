import React, { useState } from "react";
import "../styles/login.css";
import { loginapi } from "../backend_connection/api_req";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setloggedin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handle_submit = (e) => {
    e.preventDefault();
    if(username && password !=="")
    {
      loginapi(username, password, setloggedin, loginError);
    }
    else
    {
      loginError("Enter Username and Password!");
    }
  };

  const loginError = (err_content) => toast.error(err_content);

  return (
    <div>
      <div id="login-container">
        <div id="login-left" className="login-common">
          <form onSubmit={handle_submit}>
            <h3>Login</h3>
            <input
              placeholder="Username.."
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password.."
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <input type="submit" />
            <br />
            <h3>
              Forgot Password?<a href="/"> Click to Reset</a>
            </h3>
          </form>
        </div>
        <div id="login-right" className="login-common"></div>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default Login;
