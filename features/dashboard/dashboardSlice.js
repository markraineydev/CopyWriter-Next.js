import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dashboardCardDataAPI } from './dashboardAPI';

const initialState = {
  dashboardLoading: false,
  dashboardCard: {},
};

export const dashboardCardData = createAsyncThunk('dashboard/dashboardOutputs', async ({ uid }, { dispatch }) => {
  uid && dashboardCardDataAPI({ uid, dispatch });
});

export const outputsDataSlice = createSlice({
  name: 'outputs',
  initialState,
  reducers: {
    readDashboardCardData: (state, { payload }) => {
      state.dashboardCard = payload;
    },
  },
});

export const { readDashboardCardData } = outputsDataSlice.actions;

export default outputsDataSlice.reducer;
