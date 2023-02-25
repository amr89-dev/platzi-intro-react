import React from "react";
import { useState } from "react";
import "./TodoSearch.css";

const TodoSearch = ({ searchValue, setSearchValue }) => {
  const onInputChange = (e) => {
    //console.log(e.target.value);
    setSearchValue(e.target.value);
  };
  return (
    <input
      className="TodoSearch"
      placeholder="Cebolla"
      value={searchValue}
      onChange={onInputChange}
    />
  );
};

export { TodoSearch };
