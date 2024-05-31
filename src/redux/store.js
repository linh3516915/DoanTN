import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import { persistStore , persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import productdetailReducer from './slice/productdetail'
import cartReducer from './slice/cartSlice'
const persistConfig = {
  key: 'root',
  storage,
  whilelist : ['auth','cart'],
}

const rootReducer = combineReducers({
    auth :authReducer, 
    productdetail : productdetailReducer,
    cart : cartReducer, 
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)