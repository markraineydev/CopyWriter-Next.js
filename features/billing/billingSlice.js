import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { billingAPI, subscriptionPlanAPI, subscriptionTrialsAPI, viewBillingHistoryPlanAPI } from './billingAPI';

const initialState = {
  billingLoading: false,
  productInfo: [],
  subscriptionPlanData: [],
  userPlanDetail: {},
  billingHistoryLoading: false,
};

export const billingPrice = createAsyncThunk('billing/billing', async ({}, { dispatch }) => {
  billingAPI({ dispatch });
});
export const subscriptionTrials = createAsyncThunk('billing/subscriptiontrails', async ({ uid, priceId }) => {
  subscriptionTrialsAPI({ uid, priceId });
});
export const subscriptionPlanStatus = createAsyncThunk('billing/subscriptionplan', async ({ uid }, { dispatch }) => {
  subscriptionPlanAPI({ uid, dispatch });
});

export const viewBillingHistoryPlan = createAsyncThunk('billing/history', async () => {
  viewBillingHistoryPlanAPI();
});

export const billingDataSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    productsData: (state, { payload }) => {
      state.productInfo = [...payload];
    },
    subscriptionData: (state, { payload }) => {
      state.subscriptionPlanData = [...payload];
    },
    userPlanDetailData: (state, { payload }) => {
      const {
        item,
        cancel_atcurrent_period_start,
        current_period_end,
        canceled_at,
        cancel_at_period_end,
        cancel_at,
        status,
      } = payload;
      const { price, plan } = item;
      const { product } = price;
      state.userPlanDetail = {
        cancel_atcurrent_period_start,
        current_period_end,
        canceled_at,
        cancel_at_period_end,
        cancel_at,
        status,
        priceId: plan.id,
        productId: product.id,
        name: product.name,
        interval: plan.interval,
        price: plan.amount,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscriptionTrials.pending, (state) => {
        state.billingLoading = true;
      })
      .addCase(subscriptionTrials.fulfilled, (state, { payload }) => {
        state.billingLoading = true;
      })
      .addCase(viewBillingHistoryPlan.pending, (state, { payload }) => {
        state.billingHistoryLoading = true;
      })
      .addCase(viewBillingHistoryPlan.fulfilled, (state, { payload }) => {
        state.billingHistoryLoading = true;
      });
  },
});

export const { productsData, subscriptionData, userPlanDetailData } = billingDataSlice.actions;

export default billingDataSlice.reducer;
