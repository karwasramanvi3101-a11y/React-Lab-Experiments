import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/posts/postsSlice";

function PlatformFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.posts.filter);

  return (
    <div className="filter">

      <h3>Filter By Platform</h3>

      <select
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      >
        <option>All</option>
        <option>Instagram</option>
        <option>Twitter</option>
        <option>Facebook</option>
        <option>LinkedIn</option>
      </select>

    </div>
  );
}

export default PlatformFilter;