import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    province : null,
    district : null,
    ward : null,
    street : null,
    Address: '',
}

export const addressSlice = createSlice({
    
  name: 'address',
  initialState,
  reducers: {
        getprovince : (state,action) =>{
            state.province = action.payload;
        },
        getdistrict : (state,action) =>{
            state.district = action.payload;
        },
        getward : (state,action) =>{
            state.ward = action.payload;
        },
        getstreet : (state,action) =>{
            state.street = action.payload;
        },
        match  : (state) =>{
            state.Address = state.street + ", " + state.ward + ", " + state.district+ ", " + state.province;
        }
  },
})

// Action creators are generated for each case reducer function
export const {getprovince,getdistrict,getward,getstreet,match } = addressSlice.actions

export default addressSlice.reducer