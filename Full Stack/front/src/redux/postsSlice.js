import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
};

export const getPosts = createAsyncThunk(
  "postSlice/getPosts",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      // dispatch(setLoading(true));
      const { data } = await axios.get(`/post`);
      // dispatch(setLoading(false));
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const savePosts = createAsyncThunk(
  "postSlice/savePosts",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`/post`, arg);
      dispatch(getPosts());
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "postSlice/updatePost",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(`/post/${arg._id}`, arg);
      dispatch(getPosts());
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "postSlice/daletePost",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/post/${id}`);
      dispatch(getPosts());
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    builder.addCase(savePosts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(savePosts.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(savePosts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(updatePost.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading } = postSlice.actions;
export default postSlice.reducer;
