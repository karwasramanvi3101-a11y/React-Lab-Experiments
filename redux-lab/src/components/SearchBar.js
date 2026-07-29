import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/posts/postsSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.posts.search);

  return (
    <div className="search">

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

    </div>
  );
}

export default SearchBar;