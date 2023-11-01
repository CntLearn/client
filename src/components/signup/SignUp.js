import { Button, Intent }  from '@blueprintjs/core';
import React, { useState } from "react";
import { useDispatch }     from 'react-redux';
import {
  // useNavigate,
  useHistory,
  useLocation,
  Redirect,
}                          from "react-router-dom";
import { registerUser }    from '../../redux/auth';
import Toaster             from '../../utils';
import signUpStyles        from "../../styles/Auth/auth.module.css";

const SignUp = () => {
  // const navigate = useNavigate();
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const onChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    })
  }

  const onSignUp = () => {
    // before submit: fullName and plainPassword set.

    const user = {
      ...state,
      fullName: state.firstName + ' ' + state.lastName
    }

    dispatch(registerUser(user))
      .then(res => {
        console.log("res in comp : ", res)
        if (res) {
          Toaster("Your Account Successfully Created!", "success");
          history.push('/')
        }
      })
  }

  return (
    <div className={ signUpStyles.signupContainer }>
      <div className={ signUpStyles.signupForm }>
        <div className={ signUpStyles.singupHeader }>
          <h1
            style={ {
              textAlign: "center",
            } }
          >
            Sign up
          </h1>
          <p>Get your Chat Web App Account now.</p>
        </div>

        <div className={ signUpStyles.signupCard }>
          <div className={ signUpStyles.formGroup }>
            <label>Email/Username <span style={ { color: 'red', fontSize: '20px' } }>*</span> </label>
            <div className={ signUpStyles.formInputGroup }>
              <input
                type="email"
                value={ state.email }
                placeholder="Enter Username"
                name={ 'email' }
                onChange={ onChange }
              />
            </div>
          </div>

          <div className={ signUpStyles.formGroup }>
            <label>First Name <span style={ { color: 'red', fontSize: '20px' } }>*</span> </label>
            <div className={ signUpStyles.formInputGroup }>
              <input
                type="text"
                value={ state.firstName }
                placeholder="Enter First Name"
                name={ 'firstName' }
                onChange={ onChange }
              />
            </div>
          </div>

          <div className={ signUpStyles.formGroup }>
            <label>Last Name <span style={ { color: 'red', fontSize: '20px' } }>*</span> </label>
            <div className={ signUpStyles.formInputGroup }>
              <input
                type="text"
                value={ state.lastName }
                placeholder="Enter Last Name"
                name={ 'lastName' }
                onChange={ onChange }
              />
            </div>
          </div>

          <div className={ signUpStyles.formGroup }>
            <label>Password <span style={ { color: 'red', fontSize: '20px' } }>*</span></label>
            <div className={ signUpStyles.formInputGroup }>
              <input
                type="text"
                value={ state.password }
                placeholder="Enter Password"
                name={ 'password' }
                onChange={ onChange }
              />
            </div>
          </div>

          <div className={ signUpStyles.formGroup }>
            <label>Confirm Password <span style={ { color: 'red', fontSize: '20px' } }>*</span></label>
            <div className={ signUpStyles.formInputGroup }>
              <input
                type="text"
                value={ state.confirmPassword }
                placeholder="Enter ConfirmPassword"
                name={ 'confirmPassword' }
                onChange={ onChange }
              />

            </div>
            {
              state.confirmPassword.length > 0 && state.password !== state.confirmPassword &&
              <span style={ { color: 'red', fontSize: '16px' } }>Password and Confirm Password Should be Same</span>
            }
          </div>

          <Button
            intent={ Intent.PRIMARY }
            onClick={ onSignUp }
            disabled={ !(!!state.email && !!state.firstName && !!state.lastName && !!state.password && !!(state.password === state.confirmPassword)) }
          >
            Sign Up
          </Button>

          <p>By registering you agree to the Web APP Terms </p>
        </div>

        <div className={ signUpStyles.signupFooter }>
          <p>
            Already have an account ?{ " " }
            <button
              onClick={ () =>
                // navigate("/login")
                history.push("/")
              }
            >
              Sign In
            </button>
          </p>
          <p>2023 Chatvia. Crafted with by Themesbrand</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
