import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../action/userAction";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import toastify from "../../toastify/toastify";
import { MdEmail } from "react-icons/md";
import "./forgotPassword.css";
import MetaData from "../MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  //registerSubmit
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (message) {
      toast.success(message, toastify);
    }

    if (error) {
      toast.error(error, toastify);
    }
  }, [error, navigate, dispatch, message]);

  return (
    <Fragment>
      <MetaData title="Forgot Password" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignupContainer">
            <div className="LoginSignupBox" id="forgotPassword">
              <div className="updateHeading" id="changePass">
                <h1>Forgot Password</h1>
              </div>
              <form className="signupForm" onSubmit={forgotPasswordSubmit}>
                <div className="loginEmail">
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="loginBtn"
                  id="updatePassword"
                />
              </form>
              <p style={{ textAlign: "center", margin: "30px 0" }}>
                Note: If you don't receive an email in your inbox, please check
                your spam folder.
              </p>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
