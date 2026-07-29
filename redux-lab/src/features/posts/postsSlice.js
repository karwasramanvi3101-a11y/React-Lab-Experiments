import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  filter: "All",
  search: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  addPost,
  deletePost,
  setFilter,
  setSearch,
} = postsSlice.actions;

export default postsSlice.reducer;