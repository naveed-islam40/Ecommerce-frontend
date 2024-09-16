import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updatePassword } from "../../action/userAction";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { PASSWORD_UPDATE_RESET } from "../../constants/userConstant";
import "./updatePassword.css";
import PasswordInput from "../passwordInput/PasswordInput";
import { PiPasswordDuotone } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import toastify from "../../toastify/toastify";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  //registerSubmit
  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const myForm = new FormData();

    myForm.set("oldpassword", oldpassword);
    myForm.set("newpassword", newpassword);
    myForm.set("confirmpassword", confirmpassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, toastify);
    }

    if (isUpdated) {
      toast.success("User Details Updated Successfully", toastify);
      navigate("/account");

      dispatch({
        type: PASSWORD_UPDATE_RESET,
      });
    }
  }, [error, navigate, isUpdated, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignupContainer">
            <div className="LoginSignupBox">
              <div className="updateHeading" id="changePass">
                <h1>Change Password</h1>
              </div>
              <form className="signupForm" onSubmit={updatePasswordSubmit}>
                <PasswordInput
                  Icon={<PiPasswordDuotone />}
                  value={oldpassword}
                  onChange={(e) => setOldpassword(e.target.value)}
                  name="oldPassword"
                  placeholder="old Password"
                />

                <PasswordInput
                  Icon={<RiLockPasswordFill />}
                  value={newpassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                  name="newPassword"
                  placeholder="new Password"
                />

                <PasswordInput
                  Icon={<GiConfirmed />}
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />

                <input
                  type="submit"
                  value="Update Password"
                  className="loginBtn"
                  id="updatePassword"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
