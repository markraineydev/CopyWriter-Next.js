import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  favouriteAPIData,
  removefavouriteAPIData,
  fetchOutputs,
  fetchTempleteOutputs,
  fetchTemplateOutputsAPI,
  fetchFavouriteOutputsAPI,
  fetchRecentOutputsAPI,
  deletedDataAPI,
  fetchDeletedOutputs,
  fetchAllOutputs,
} from './outputAPI';

const initialState = {
  updateOutputsLoading: false,
  outputGenerateData: [],
  outputHistoryData: [],
  favouriteData: [],
  outputsDeletdData: [],
  newOutputRating: [],
  newOutputFav: [],
  totalOutputs: [],
};

export const addfavouriteContent = createAsyncThunk(
  'outputs/favContent',
  async ({ contentId, outputId }, { getState }) => {
    const { uid } = getState().auth.authProfile;
    await favouriteAPIData({ uid, contentId, outputId });
  },
);
export const removefavouriteCardData = createAsyncThunk(
  'outputs/reomveOutputfavContent',
  async ({ contentId, outputId }, { getState }) => {
    const { uid } = getState().auth.authProfile;

    console.log('uid, contentId,outputId', uid, contentId, outputId);
    await removefavouriteAPIData({ uid, contentId, outputId });
  },
);

export const deleteOutputContent = createAsyncThunk(
  'outputs/deleteContent',
  async ({ contentId, outputId, templateId }, { getState }) => {
    const outputData = getState().outputs.outputGenerateData;
    const { uid } = getState().auth.authProfile;
    const filterOutput = outputData.find((data) => data.outputId === outputId);
    const filteredContent = filterOutput.outputs.result.filter((e) => e.contentId !== contentId);
    const changeOutputInDatabase = {
      ...filterOutput,
      outputs: { result: filteredContent },
    };
    const saveDeletedContent = filterOutput.outputs.result.filter((e) => e.contentId === contentId);
    const saveDelete = {
      ...filterOutput,
      outputs: { result: saveDeletedContent },
    };

    await deletedDataAPI({
      changeOutputInDatabase,
      saveDelete,
      uid,
      outputId,
    });
  },
);

export const readOutputs = createAsyncThunk('outputs/readOutputsData', async ({ uid, projectId }, { dispatch }) => {
  fetchOutputs({ uid, projectId, dispatch });
});

export const readAllOutputs = createAsyncThunk('outputs/readAllOutputsData', async ({ uid }, { dispatch }) => {
  fetchAllOutputs({ uid, dispatch });
});
export const readDeletedOutputs = createAsyncThunk(
  'outputs/readOutputsData',
  async ({ uid, projectId }, { dispatch }) => {
    fetchDeletedOutputs({ uid, projectId, dispatch });
  },
);
export const fetchTemplateOutputs = createAsyncThunk(
  'outputs/readOutputsTemplateData',
  async ({ uid, templateId, projectId }, { dispatch }) => {
    fetchTemplateOutputsAPI({ uid, templateId, projectId, dispatch });
  },
);
export const fetchFavouriteOutputs = createAsyncThunk(
  'outputs/readfetchfavouriteOutputs',
  async ({ uid, projectId }, { dispatch }) => {
    fetchFavouriteOutputsAPI({ uid, projectId, dispatch });
  },
);

export const outputsDataSlice = createSlice({
  name: 'outputs',
  initialState,
  reducers: {
    readSubCollectionsData: (state, { payload }) => {
      state.outputGenerateData = payload;
    },
    readOutputCollectionData: (state, { payload }) => {
      state.totalOutputs = [...state.totalOutputs, payload];
    },
    readDeletedCollectionsData: (state, { payload }) => {
      state.outputsDeletdData = payload;
    },
    readHistoryData: (state, { payload }) => {
      state.outputHistoryData = payload;
    },
    readfavouriteData: (state, { payload }) => {
      state.favouriteData = payload;
    },
    saveNewOutputRating: (state, { payload }) => {
      state.newOutputRating = payload;
    },
    saveNewOutputFav: (state, { payload }) => {
      state.newOutputFav = payload;
    },
  },
});

export const {
  readSubCollectionsData,
  readHistoryData,
  readfavouriteData,
  readDeletedCollectionsData,
  saveNewOutputRating,
  saveNewOutputFav,
  readOutputCollectionData,
} = outputsDataSlice.actions;

export default outputsDataSlice.reducer;
