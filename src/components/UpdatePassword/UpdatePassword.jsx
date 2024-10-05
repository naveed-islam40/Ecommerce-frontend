import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePassword } from "../../action/userAction";
import { useNavigate } from "react-router-dom";
import { PASSWORD_UPDATE_RESET } from "../../constants/userConstant";
import { PiPasswordDuotone } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.oldPassword) newErrors.oldPassword = "Old password is required";
    if (!formData.newPassword) newErrors.newPassword = "New password is required";
    if (formData.newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters";
    if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(clearError());
      const myForm = new FormData();
      Object.keys(formData).forEach(key => myForm.append(key, formData[key]));
      dispatch(updatePassword(myForm));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("Password updated successfully");
      navigate("/account");
      dispatch({ type: PASSWORD_UPDATE_RESET });
    }
  }, [error, isUpdated, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Change Your Password</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px">
            <div>
              <label htmlFor="oldPassword" className="sr-only">Old Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PiPasswordDuotone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
                  placeholder="Old Password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordFill className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GiConfirmed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {Object.keys(errors).map((key) => (
            errors[key] && <p key={key} className="mt-2 text-sm text-red-600">{errors[key]}</p>
          ))}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}