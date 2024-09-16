import React, { Fragment, useState, useRef, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./login-signup.css";
import { MdPerson3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getUser, registerUser } from "../../action/userAction";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import toastify from "../../toastify/toastify";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/defa.png");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const { name, email, password } = user;

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  useEffect(() => {
    if (error) {
      toast.error(error, toastify);
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [error, navigate, isAuthenticated]);

  //loginSubmit
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser(loginEmail, loginPassword));
  };

  //registerSubmit
  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(registerUser(myForm));
  };

  // registerDataChange
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      const updatedUser = { ...user, [e.target.name]: e.target.value };
      setUser(updatedUser);
    }
  };

  //switchTabs
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftRight");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignupContainer">
            <div className="LoginSignupBox">
              <div className="login-signup-container">
                <div className="login-signup-toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>SIGNUP</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <FaLock />
                  <div className="showPass">
                    {showPassword ? (
                      <FaEye onClick={() => setShowPassword(!showPassword)} />
                    ) : (
                      <IoMdEyeOff
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="forgot">
                  <Link to="/password/forgot">Forgot Password?</Link>
                </div>
                <div className="loginSubmit">
                  <input type="submit" value="Login" className="loginBtn" />
                </div>
              </form>

              <form
                className="signupForm"
                ref={registerTab}
                onSubmit={registerSubmit}
                encType="multipart/form-data"
              >
                <div className="loginEmail">
                  <MdPerson3 />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={user.name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="loginEmail">
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={user.email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="loginEmail">
                  <FaLock />
                  <div className="showPass">
                    {showPassword ? (
                      <FaEye onClick={() => setShowPassword(!showPassword)} />
                    ) : (
                      <IoMdEyeOff
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    name="password"
                    value={user.password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="loginBtn"
                  id="registerBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignup;
