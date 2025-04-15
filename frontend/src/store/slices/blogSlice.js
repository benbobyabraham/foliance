import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { blogApi } from '../../services/api';

export const fetchPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogApi.getPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

export const fetchPost = createAsyncThunk(
  'blog/fetchPost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await blogApi.getPost(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch post');
    }
  }
);

export const createPost = createAsyncThunk(
  'blog/createPost',
  async (data, { rejectWithValue }) => {
    try {
      const response = await blogApi.createPost(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await blogApi.updatePost(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update post');
    }
  }
);

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.results || action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Post
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        );
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      });
  },
});

export const { clearError, clearCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;
