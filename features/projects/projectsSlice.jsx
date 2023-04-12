import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchProjectData,
  fetchProjectLength,
  fetchUserProjectData,
  projectCUD,
  storeSelectedProject,
} from './projectsAPI';

const initialState = {
  projectData: [],
  selectedProject: [],
  updateProjectLoading: false,
  totalProject: [],
  totalUserProject: [],
};

export const projectActionCUD = createAsyncThunk(
  'projects/updateprojectData',
  async ({ uid, updateProject, selectedProject, actionType }) => {
    // console.log('uid, updateProject, actionType', uid, updateProject, selectedProject, actionType);
    await projectCUD({ uid, updateProject, actionType, selectedProject });
  },
);
export const readProject = createAsyncThunk('projects/readprojectData', async ({ uid }, { dispatch }) => {
  await fetchProjectData({ uid, dispatch });
});
export const readUserProject = createAsyncThunk('projects/readuserprojectData', async ({ uid }, { dispatch }) => {
  await fetchUserProjectData({ uid, dispatch });
});
export const readMembersProject = createAsyncThunk(
  'projects/readprojectData',
  async ({ uid, teamMemberId }, { dispatch }) => {
    // console.log('uid in Slice', uid);
    await fetchProjectLength({ uid, teamMemberId, dispatch });
  },
);

export const selectExistingProject = createAsyncThunk(
  'projects/slectedprojectData',
  async ({ selectedProject }, { getState }) => {
    const { uid } = getState().auth.authProfile;
    await storeSelectedProject({ uid, selectedProject });
  },
);

export const ProjectDataSlice = createSlice({
  name: 'projects',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    fetchProjectSuccess: (state, action) => {
      state.projectData = action.payload.projects;
      state.selectedProject = action.payload.selectedProject;
    },
    teamMemberTotalProject: (state, { payload }) => {
      console.log('payload', payload);
      state.totalProject = payload;
    },
    fetchUserProjectSuccess: (state, { payload }) => {
      state.totalUserProject = payload.projects;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(projectActionCUD.pending, (state) => {
        state.updateProjectLoading = true;
      })
      .addCase(projectActionCUD.fulfilled, (state, { payload }) => {
        state.updateProjectLoading = false;
      })
      .addCase(readProject.fulfilled, (state, { payload }) => {
        state.updateProjectLoading = false;
        state.projectData = payload;
      })
      .addCase(selectExistingProject.fulfilled, (state, { payload }) => {
        state.updateProjectLoading = false;
      });
  },
});

export const { fetchProjectSuccess, teamMemberTotalProject, fetchUserProjectSuccess } = ProjectDataSlice.actions;

export default ProjectDataSlice.reducer;
