import React, { useState } from "react";
import { FaEye, FaLock } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

const PasswordInput = ({ placeholder, name, value, onChange, Icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="loginPassword">
      {Icon}
      <div className="showPass">
        {showPassword ? (
          <FaEye onClick={() => setShowPassword(!showPassword)} />
        ) : (
          <IoMdEyeOff onClick={() => setShowPassword(!showPassword)} />
        )}
      </div>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PasswordInput;
