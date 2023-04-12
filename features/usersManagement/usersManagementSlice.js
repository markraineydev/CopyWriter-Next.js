import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchOutputs,
  fetchPlanDetails,
  fetchUserData,
  fetchUserProfileData,
  updatePlanDetails,
  updateUserDetails,
} from './userManagemnetAPI';

const initialState = {
  userManagementData: [],
  userOutputs: [],
  userUidData: [],
  userPlan: [],
  updateLoading: false,
};
export const editUserProfile = createAsyncThunk(
  'settings/updateUser',
  async ({ uid, displayName, status, authority, companyName, websiteDomain }) => {
    await updateUserDetails({ uid, displayName, status, authority, companyName, websiteDomain });
  },
);
export const readUserManagementData = createAsyncThunk('userManagement/readData', async ({ uid }, { dispatch }) => {
  await fetchUserData({ uid, dispatch });
});
export const readUserData = createAsyncThunk('userManagement/readData', async ({ uid }, { dispatch }) => {
  await fetchUserProfileData({ uid, dispatch });
});
export const readUserOutputs = createAsyncThunk('outputs/readOutputsData', async ({ uid }, { dispatch }) => {
  fetchOutputs({ uid, dispatch });
});
export const editPlanDetails = createAsyncThunk(
  'settings/planDetails',
  async ({ name, team, projects, words, yearlyWords }) => {
    await updatePlanDetails({ name, team, projects, words, yearlyWords });
  },
);
export const readPlanDetails = createAsyncThunk('outputs/readOutputsData', async ({}, { dispatch }) => {
  fetchPlanDetails({ dispatch });
});

export const UserManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    fetchUserDataSuccess: (state, action) => {
      state.userManagementData = action.payload;
    },
    fetchsubCollectionData: (state, action) => {
      state.userOutputs = action.payload;
    },
    fetchUidData: (state, action) => {
      state.userUidData = action.payload;
    },
    fetchPlans: (state, { payload }) => {
      state.userPlan = payload;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { fetchUserDataSuccess, fetchsubCollectionData, fetchUidData, fetchPlans } = UserManagementSlice.actions;

export default UserManagementSlice.reducer;
