import { Button, Intent }              from '@blueprintjs/core';
import React, { useContext, useState } from "react";
import { useDispatch }                 from 'react-redux';
import {
  // useNavigate,
  useLocation,
  Redirect,
  useHistory,
}                                      from "react-router-dom";
import signUpStyles                    from "../../styles/Auth/auth.module.css";
import AuthContext                     from "../../contexts/authContext";
import { contacts }                    from "../../services/contacts";
import { login }                       from '../../redux/auth'

const Login = () => {
  // const navigate = useNavigate();
  const history = useHistory();
  const dispatch = useDispatch();
  const [authState, setAuth] = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
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
    const { email, password } = loginData;
    if (email && password) {
      dispatch(login({ email, password }))
        .then(res => {
          if (res) history.push("/");
        })
    }
  }

  return (
    <div className={ signUpStyles.signupContainer }>
      <div className={ signUpStyles.signupForm }>
        <div className={ signUpStyles.singupHeader }>
          <h1>Sign In</h1>
        </div>

        <div className={ signUpStyles.signupCard }>
          <div className={ signUpStyles.formGroup }>
            <label>Username <span style={ { color: 'red', fontSize: '20px' } }>*</span> </label>
            <div className={ signUpStyles.formInputGroup }>
              <input
                type="text"
                placeholder="Username/Email"
                value={ loginData.email }
                onChange={ onChange }
                name="email"
              />
            </div>
          </div>

          <div className={ signUpStyles.formGroup }>
            <label>Password <span style={ { color: 'red', fontSize: '20px' } }>*</span></label>
            <div className={ signUpStyles.formInputGroup }>
              <input
                type="text"
                placeholder="Password"
                value={ loginData.password }
                onChange={ onChange }
                name={ "password" }
              />
            </div>
          </div>

          <Button
            intent={ Intent.PRIMARY }
            onClick={ onLogin }
            disabled={ !(!!loginData.email && !!loginData.password) }
          >
            Sign In
          </Button>
        </div>

        <div className={ signUpStyles.signupFooter }>
          <p>
            Don't Have Account ? <br/> Create an account ?{ " " }
            <button
              onClick={ () => {
                history.push("/register");
                // navigate("/register")
              } }
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
