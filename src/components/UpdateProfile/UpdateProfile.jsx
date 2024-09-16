import React, { Fragment, useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import "./updateProfile.css";
import { MdPerson3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateUser } from "../../action/userAction";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import toastify from "../../toastify/toastify";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.user);
  const { isUpdated, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/defa.png");

  const updateSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateUser(myForm));
  };

  // updateDataChange
  const updateDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setAvatarPreview(user?.avatar?.url);
    }

    if (error) {
      toast.error(error, toastify);
    }

    if (isUpdated) {
      toast.success("User Details Updated Successfully", toastify);
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [error, navigate, isUpdated, dispatch, user]);

  return (
    <Fragment>
      <MetaData title="Update Profile" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignupContainer">
            <div className="LoginSignupBox">
              <div className="updateHeading" id="updateProfile">
                <h1>Update Profile</h1>
              </div>
              <form
                className="signupForm"
                onSubmit={updateSubmit}
                encType="multipart/form-data"
              >
                <div className="loginEmail">
                  <MdPerson3 />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="loginEmail">
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update Profile"
                  className="loginBtn"
                  id="updateBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
