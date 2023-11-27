import { useState } from "react";
const Filter = (props) => {
  return (
    <div>
      <label htmlFor="filter">Filter</label>
      <input
        onChange={(e) => props.setFilter(e.target.value)}
        value={props.filter}
        id="filter"
        type="text"
      ></input>
    </div>
  );
};
export default Filter;
