import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewTemplateAPI, deleteTemplateAPI, fetchTemplateList } from './newTemplatesAPI';

const initialState = {
  templateList: [],
  updateProfileLoading: false,
};

export const newTemplateData = createAsyncThunk('template/template', async ({ toolFields, id }) => {
  await addNewTemplateAPI({ toolFields, id });
});
export const deleteTemplateData = createAsyncThunk('template/template', async ({  id }) => {
  await deleteTemplateAPI({  id });
});
export const readTemplates = createAsyncThunk('template/read-template-list', async ({}, { dispatch }) => {
  fetchTemplateList({ dispatch });
});

export const newTemplateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    readTemplatesDataSuccess: (state, { payload }) => {
      state.templateList = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newTemplateData.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(newTemplateData.fulfilled, (state, { payload }) => {
        state.updateProfileLoading = false;
      });
  },
});

export const { readTemplatesDataSuccess } = newTemplateSlice.actions;

export default newTemplateSlice.reducer;
