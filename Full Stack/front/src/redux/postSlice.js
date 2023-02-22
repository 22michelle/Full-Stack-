import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts: [],
    isLoading: false,
};

export const getPost = createAsyncThunk(
    "postSlice/getPost",
    async(args, { dispatch, getState, rejectWithValue }) => {
        try {
            // dispatch(setLoading(true));
            const { data } = await axios.get(`/post`);
            // dispatch(setLoading(false));
            return data.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const savePost = createAsyncThunk(
    "postSlice/savePost",
    async(post, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(`/post`, post);
            dispatch(getPost());
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const deletePost = createAsyncThunk(
    "postSlice/deletePost",
    async(id, { dispatch, rejectWithValue }) => {
        try {
            await axios.delete(`/post/${id}`);
            dispatch(getPost());
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const updatePost = createAsyncThunk(
    "postSlice/updatePost",
    async(args, { dispatch, rejectWithValue }) => {
        try {
            await axios.put(`/post/${args._id}`, args);
            dispatch(getPost());
        } catch (error) {
            return rejectWithValue(error.response.data.message);
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
        builder.addCase(getPost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getPost.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        });

        builder.addCase(savePost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(savePost.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            alert(action.payload)
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