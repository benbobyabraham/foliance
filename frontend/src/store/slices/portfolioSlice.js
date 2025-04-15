import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { portfolioApi } from '../../services/api';

export const fetchResume = createAsyncThunk(
  'portfolio/fetchResume',
  async (_, { rejectWithValue }) => {
    try {
      const response = await portfolioApi.getResume();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch resume');
    }
  }
);

export const updateResume = createAsyncThunk(
  'portfolio/updateResume',
  async (data, { rejectWithValue }) => {
    try {
      const response = await portfolioApi.updateResume(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update resume');
    }
  }
);

export const createExperience = createAsyncThunk(
  'portfolio/createExperience',
  async (data, { rejectWithValue }) => {
    try {
      const response = await portfolioApi.createExperience(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create experience');
    }
  }
);

export const updateExperience = createAsyncThunk(
  'portfolio/updateExperience',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await portfolioApi.updateExperience(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update experience');
    }
  }
);

const initialState = {
  resume: null,
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Resume
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resume = action.payload;
        state.experiences = action.payload.experiences || [];
        state.education = action.payload.education || [];
        state.skills = action.payload.skills || [];
        state.projects = action.payload.projects || [];
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Resume
      .addCase(updateResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resume = { ...state.resume, ...action.payload };
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Experience
      .addCase(createExperience.fulfilled, (state, action) => {
        state.experiences = [...state.experiences, action.payload];
      })
      // Update Experience
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.experiences = state.experiences.map(exp =>
          exp.id === action.payload.id ? action.payload : exp
        );
      });
  },
});

export const { clearError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
