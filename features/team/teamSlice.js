import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addOwnerAPI,
  addTeamData,
  addTeamUsage,
  deleteMemberAPI,
  deleteTeamIdAPI,
  fetchPlan,
  readTeamData,
  sendEmailLink,
  TeamMemberSummaryAPI,
  teamStatusAPI,
  updateMemberAPI,
  updateRemainingAPI,
  updateTeamMembersAPI,
} from './teamAPI';

const initialState = {
  teamData: [],
  totalwords: {},
  total: {},
  planDetails: [],
  updateteamLoading: false,
  teamStatus: null,
  teamCredits: null,
  teamAlert: [],
};

export const addMember = createAsyncThunk('team/addMember', async ({ uid, email, updateTeam }, { dispatch }) => {
  // console.log('updateTeam', updateTeam);
  await updateTeamMembersAPI({ uid, email, updateTeam, dispatch });
});
export const sigInTeam = createAsyncThunk('team/sigIn', async () => {
  await sendEmailLink();
});
export const addOwner = createAsyncThunk('team/addOwner', async ({ uid, email, updateTeam, teamOwner }) => {
  await addTeamData({ uid, email, updateTeam, teamOwner });
});
export const addTeamMemeberAsOwner = createAsyncThunk(
  'team/addTeamMemeberAsOwner',
  async ({ uid, email, updateTeam }) => {
    await addOwnerAPI({ uid, email, updateTeam });
  },
);
export const updateUsage = createAsyncThunk('team/updateUsage', async ({ uid, updateUsageArray }) => {
  await addTeamUsage({ uid, updateUsageArray });
});
export const TeamMemberSummary = createAsyncThunk('team/TeamMemberSummary', async ({ uid, teamMemberId, length }) => {
  console.log('uid in TeamMemberSummary ', uid);
  await TeamMemberSummaryAPI({ uid, teamMemberId, length });
});
export const updateRemainingWords = createAsyncThunk('team/updateRemainingWords', async ({ uid, remainingWords }) => {
  await updateRemainingAPI({ uid, remainingWords });
});
export const deleteTeamMember = createAsyncThunk('team/deleteTeamMember', async ({ uid, removeMemberArray }) => {
  await deleteMemberAPI({ uid, removeMemberArray });
});
export const updateTeamMember = createAsyncThunk('team/updateTeamMember', async ({ teamId, updatedTeamData }) => {
  await updateMemberAPI({ teamId, updatedTeamData });
});
export const fetchTeamData = createAsyncThunk('team/fetchingData', async ({ uid }, { dispatch }) => {
  await readTeamData({ uid, dispatch });
});

export const readPlan = createAsyncThunk('outputs/readOutputsData', async ({ name }, { dispatch }) => {
  fetchPlan({ name, dispatch });
});
export const deleteTeamId = createAsyncThunk('outputs/deleteTeamId', async ({}, { getState, dispatch }) => {
  const { uid, email, displayName } = getState().auth.userData;
  deleteTeamIdAPI({ uid, email, displayName, dispatch });
});
export const deleteTeamIdData = createAsyncThunk(
  'outputs/deleteTeamIdData',
  async ({ uid, email, displayName }, { getState, dispatch }) => {
    deleteTeamIdAPI({ uid, email, displayName, dispatch });
  },
);
export const updateTeamStatus = createAsyncThunk('outputs/deleteTeamId', async ({}, { getState, dispatch }) => {
  const { uid } = getState().auth.userData;
  await teamStatusAPI({ uid, dispatch });
});

export const TeamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    fetchingTeamData: (state, action) => {
      state.teamData = action.payload.sortTeam;
      state.totalwords = action.payload.remainingWords;
      state.total = action.payload.total;
      state.teamStatus = action.payload.teamStatus;
      state.teamCredits = action.payload.teamTotalWords;
    },
    fetchPlanData: (state, { payload }) => {
      state.planDetails = payload;
    },
    teamAlertMessage: (state, { payload }) => {
      state.teamAlert = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMember.pending, (state) => {
        state.updateteamLoading = true;
      })
      .addCase(addMember.fulfilled, (state, { payload }) => {
        state.updateteamLoading = false;
      });
  },
});

export const { fetchingTeamData, fetchPlanData, teamAlertMessage } = TeamSlice.actions;

export default TeamSlice.reducer;
