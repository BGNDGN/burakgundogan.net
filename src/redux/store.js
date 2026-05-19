import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit';

import registerReducer
  from './slices/registerSlice';

import loginReducer
  from './slices/loginSlice';

import changePasswordReducer
  from './slices/changePasswordSlice';

import forgotPasswordReducer
  from './slices/forgotPasswordSlice';

import resetPasswordReducer
  from './slices/resetPasswordSlice';

import storage
  from 'redux-persist/lib/storage';

import {
  persistReducer,
  persistStore
} from 'redux-persist';

const persistConfig = {

  key: 'root',

  storage,

  whitelist: ['login'],

};

const rootReducer = combineReducers({

  register: registerReducer,

  login: loginReducer,

  changePassword:
    changePasswordReducer,

  forgotPassword:
    forgotPasswordReducer,

  resetPassword:
    resetPasswordReducer,

});

const persistedReducer =
  persistReducer(
    persistConfig,
    rootReducer
  );

const store = configureStore({

  reducer: persistedReducer,

  middleware: (
    getDefaultMiddleware
  ) =>

    getDefaultMiddleware({

      serializableCheck: false,

    }),

});

export default store;

export const persistor =
  persistStore(store);