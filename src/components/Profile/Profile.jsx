import React, { Fragment, useEffect } from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  }, [navigate, isAuthenticated]);
  return (
    <Fragment>
      <MetaData title={user?.name} />
      <div className="heading">
        <h1>My Profile</h1>
      </div>

      <div className="myProfile">
        <div className="profile-left">
          {user && user.avatar && user.avatar.url && (
            <img src={user.avatar.url} alt="" />
          )}
          <Link to="/me/update" className="linkTag">
            Edit Profile
          </Link>
        </div>

        <div className="profile-right">
          <div className="personalDel">
            <h4>Full Name</h4>
            <Link to=""> {user?.name}</Link>
          </div>
          <div className="personalDel">
            <h5>Email</h5>
            <Link to=""> {user?.email}</Link>
          </div>
          <div className="personalDel">
            <p>Joined On </p>
            <Link to="">{String(user?.createdAt).substring(0, 10)}</Link>
          </div>
          <div className="resetButtons">
            <Link to="/order/me">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
