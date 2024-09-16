import React, { useEffect } from "react";
import { fetchSingleUser } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./userDetails.css";

const UserDetails = () => {
  const dispatch = useDispatch();

  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [userId]);

  const { data } = useSelector((state) => state.SignleUserDetails);
  return (
    <div>
      <div className="userDel-card">
        <div className="userDel-info">
          <img src={data?.user.avatar.url} alt={`${data?.user.name}`} />
          <h3>Name: {data?.user.name}</h3>
          <h4>Email: {data?.user.email}</h4>
          <p>User ID: {data?.user._id}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
