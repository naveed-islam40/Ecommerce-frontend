import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../action/userAction";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import toastify from "../../toastify/toastify";
import MetaData from "../MetaData";
import PasswordInput from "../passwordInput/PasswordInput";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import "./resetPassword.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const { success, error, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmpassword", confirmpassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, toastify);
    }

    if (success) {
      toast.success("User Details Updated Successfully", toastify);
      navigate("/signup");
    }
  }, [error, navigate, dispatch, success]);

  return (
    <Fragment>
      <MetaData title="Reset Password" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignupContainer">
            <div className="LoginSignupBox" id="resetPassword">
              <div className="updateHeading" id="resetPass">
                <h1>Reset Password</h1>
              </div>
              <form className="signupForm" onSubmit={resetPasswordSubmit}>
                <PasswordInput
                  name="password"
                  Icon={<RiLockPasswordFill />}
                  placeholder="Enter New Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <PasswordInput
                  name="newpassword"
                  Icon={<RiLockPasswordLine />}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  value={confirmpassword}
                />
                <input
                  type="submit"
                  value="Reset Password"
                  className="loginBtn"
                  id="ResetBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
