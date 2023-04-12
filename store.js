import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import settingReducer from './features/settings/settingSlice';
import generationReducer from './features/generation/generationSlice';
import projects from './features/projects/projectsSlice';
import outputsReducer from './features/output/outputSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';
import teamReducer from './features/team/teamSlice';
import generalReducer from './features/generalSetting/generalSettingSliceFile';
import userManagementReducer from './features/usersManagement/usersManagementSlice';
import templatesReducer from './features/newTemplates/newTemplatesSlice';
import productReducer from './features/billing/billingSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      settings: settingReducer,
      generation: generationReducer,
      projects: projects,
      outputs: outputsReducer,
      dashboard: dashboardReducer,
      team: teamReducer,
      general: generalReducer,
      userManagement: userManagementReducer,
      template: templatesReducer,
      product: productReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });
}

const store = makeStore();

export default store;
