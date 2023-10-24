import React from "react";
import {
  // useNavigate,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import signUpStyles from "../../styles/Auth/auth.module.css";

const SignUp = () => {
  // const navigate = useNavigate();
  const history = useHistory();
  return (
    <div className={signUpStyles.signupContainer}>
      <div className={signUpStyles.signupForm}>
        <div className={signUpStyles.singupHeader}>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            Sing up
          </h1>
          <p>Get your Chat Web App Account now.</p>
        </div>

        <div className={signUpStyles.signupCard}>
          <div className={signUpStyles.formGroup}>
            <label>Email</label>
            <div className={signUpStyles.formInputGroup}>
              <input type="email" placeholder="Email" />
            </div>
            <p> Required </p>
          </div>

          <div className={signUpStyles.formGroup}>
            <label>Username</label>
            <div className={signUpStyles.formInputGroup}>
              {
                //<img src="" alt="username" />
              }
              <input type="text" placeholder="Username" />
            </div>
            <p> Required </p>
          </div>

          <div className={signUpStyles.formGroup}>
            <label>Password</label>
            <div className={signUpStyles.formInputGroup}>
              {
                //<img src="" alt="password" />
              }
              <input type="text" placeholder="Password" />
            </div>
            <p> Required </p>
          </div>

          <button>Sign Up </button>

          <p>By registering you agree to the Chatvia Terms of Use</p>
        </div>

        <div className={signUpStyles.signupFooter}>
          <p>
            Already have an account ?{" "}
            <button
              onClick={() =>
                // navigate("/login")
                history.push("/")
              }
            >
              Sign In
            </button>
          </p>
          <p>© 2023 Chatvia. Crafted with by Themesbrand</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
