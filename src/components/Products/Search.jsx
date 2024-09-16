import React, { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      const encodedText = encodeURIComponent(keyword);
      navigate(`/Products/${encodedText}`);
      setKeyword("");
    } else {
      navigate(`/Products`);
    }
  };
  return (
    <div>
      <form className="searchformData" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search"
          className="searchInput"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <input
          type="submit"
          defaultValue={"submit"}
          className="searchsubmitBtn"
        />
      </form>
    </div>
  );
};

export default Search;
