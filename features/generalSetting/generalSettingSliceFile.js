import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { readCompanyData, updateCompanyData } from './generalSettingAPI';

const initialState = {
  updateProfileLoading: false,
};

export const editCompanyInfo = createAsyncThunk(
  'generalsettings/updatecompanyinfo',
  async ({ uid, websiteDomain, companyName }) => {
    await updateCompanyData({ uid, websiteDomain, companyName });
  },
);

export const CompanyDataSlice = createSlice({
  name: 'updateCompanyInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editCompanyInfo.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(editCompanyInfo.fulfilled, (state, { payload }) => {
        state.updateProfileLoading = false;
        state.companyData = payload;
      });
  },
});

export default CompanyDataSlice.reducer;
