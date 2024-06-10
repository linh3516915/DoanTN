import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import { persistStore , persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import productdetailReducer from './slice/productdetail'
import addressReducer from './slice/addressSlice'
import cartReducer from './slice/cartSlice'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whilelist : ['auth','cart'],
  blacklist : ['address'], 
}

const rootReducer = combineReducers({
    auth :authReducer, 
    productdetail : productdetailReducer,
    cart : cartReducer, 
    address : addressReducer, 
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)