import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import { persistStore , persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import productdetailReducer from './slice/productdetail'
 
const persistConfig = {
  key: 'root',
  storage,
  whilelist : ['auth','productdetail'],
}

const rootReducer = combineReducers({
    auth :authReducer, 
    productdetail : productdetailReducer,
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)