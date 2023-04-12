import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteUserAccountAPI,
  updateEmailAPI,
  updatePasswordAPI,
  updatePasswordStatusAPI,
  updateUser,
  userAuthenticateAPI,
} from './settingsAPI';

const initialState = {
  userData: {},
  updateProfileLoading: false,
  authenticateErrorMessage: null,
  deleteLoading: false,
};

export const editProfile = createAsyncThunk('settings/updateUser', async ({ uid, displayName, secondName }) => {
  await updateUser({ uid, displayName, secondName });
});
export const updateUserEmail = createAsyncThunk(
  'settings/updateEmail',
  async ({ uid, email }, { getState, dispatch }) => {
    const { providerId } = getState().auth.userData;
    await updateEmailAPI({ uid, email, providerId, dispatch });
  },
);
export const updateUserpassword = createAsyncThunk(
  'settings/updatePassword',
  async ({ password }, { getState, dispatch }) => {
    const { providerId } = getState().auth.userData;
    await updatePasswordAPI({ password, providerId, dispatch });
  },
);
export const updatePasswordStatus = createAsyncThunk('settings/update', async ({ uid, setPassword, teamId }) => {
  await updatePasswordStatusAPI({ uid, setPassword, teamId });
});
export const deleteUserAccount = createAsyncThunk('settings/deleteUser', async ({}, { getState, dispatch }) => {
  const { providerId } = getState().auth.userData;
  await deleteUserAccountAPI({ providerId, dispatch });
});
export const userAuthenticate = createAsyncThunk(
  'settings/userAuthenticate',
  async (credential, { getState, dispatch }) => {
    const { uid } = getState().auth.userData;
    await userAuthenticateAPI({ credential, uid, dispatch });
  },
);

export const ProfileDataSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    authenticateError: (state, { payload }) => {
      state.authenticateErrorMessage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, { payload }) => {
        state.updateProfileLoading = false;
        state.userData = payload;
      })
      .addCase(updateUserEmail.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(updateUserEmail.fulfilled, (state, { payload }) => {
        state.updateProfileLoading = false;
      })
      .addCase(updateUserpassword.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(updateUserpassword.fulfilled, (state, { payload }) => {
        state.updateProfileLoading = false;
      })
      .addCase(updatePasswordStatus.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(updatePasswordStatus.fulfilled, (state, { payload }) => {
        state.updateProfileLoading = false;
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteUserAccount.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;
      })
      .addCase(deleteUserAccount.rejected, (state, { payload }) => {
        state.deleteLoading = false;
      });
  },
});

export const { UpdateUserProfileData, fetchingData, authenticateError } = ProfileDataSlice.actions;

export default ProfileDataSlice.reducer;
