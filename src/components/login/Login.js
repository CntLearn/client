import React, { useContext, useState } from "react";
import {
  // useNavigate,
  useLocation,
  Redirect,
  useHistory,
} from "react-router-dom";
import signUpStyles from "../../styles/Auth/auth.module.css";
import AuthContext from "../../contexts/authContext";
import { contacts } from "../../services/contacts";
const Login = () => {
  // const navigate = useNavigate();
  const history = useHistory();
  const [authState, setAuth] = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    id: "",
  });

  const onChange = (e) => {
    const { name = "", value = "" } = e.target;
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onLogin = () => {
    const find = contacts.find((contact) => contact.id === loginData.id);
    console.log("find ", find);
    if (!find) return;
    localStorage.setItem("user", JSON.stringify(find));
    setAuth(find);
    history.push("/");
  };
  return (
    <div className={signUpStyles.signupContainer}>
      <div className={signUpStyles.signupForm}>
        <div className={signUpStyles.singupHeader}>
          <h1>Sing In</h1>
        </div>

        <div className={signUpStyles.signupCard}>
          <div className={signUpStyles.formGroup}>
            <label>Username</label>
            <div className={signUpStyles.formInputGroup}>
              <input
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={onChange}
                name="username"
              />
            </div>
            <p> Required </p>
          </div>

          <div className={signUpStyles.formGroup}>
            <label>Password</label>
            <div className={signUpStyles.formInputGroup}>
              <input
                type="text"
                placeholder="Password"
                value={loginData.password}
                onChange={onChange}
                name={"password"}
              />
            </div>
            <p> Required </p>
          </div>

          <div className={signUpStyles.formGroup}>
            <label>ID</label>
            <div className={signUpStyles.formInputGroup}>
              <input
                type="text"
                placeholder="ID"
                value={loginData.id}
                onChange={onChange}
                name={"id"}
              />
            </div>
            <p> Required </p>
          </div>

          <button onClick={() => onLogin()}>Sign In </button>
        </div>

        <div className={signUpStyles.signupFooter}>
          <p>
            Don't Have Account ? <br /> Create an account ?{" "}
            <button
              onClick={() => {
                history.push("/register");
                // navigate("/register")
              }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
