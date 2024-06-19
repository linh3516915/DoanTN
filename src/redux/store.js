import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import { persistStore , persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import productdetailReducer from './slice/productdetail'
import addressReducer from './slice/addressSlice'
import cartReducer from './slice/cartSlice'
import  itemproductdetailReducer  from './slice/itemproductdetail'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import popupReducer from './slice/popupSlice'
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist : ['auth','cart','productdetail'],
  blacklist : ['address','popup'], 
}

const rootReducer = combineReducers({
    auth :authReducer, 
    productdetail : productdetailReducer,
    cart : cartReducer, 
    address : addressReducer, 
    popup : popupReducer, 
    itemproductdetail : itemproductdetailReducer,
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)