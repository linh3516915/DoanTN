import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productdetail : null,
    sliceproductdetail : {},
    top16hottrend : null,
}

export const productdetailSlice = createSlice({
    
  name: 'productdetail',
  initialState,
  reducers: {
    listProductdetail : (state, action) => {
        state.productdetail = action.payload.data;
    },
    listtop16hottrend : (state, action) => {
      state.top16hottrend = action.payload.data;
  },
    sliceproductdetail :(state,action) =>{
      state.sliceproductdetail = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { listProductdetail,sliceproductdetail,listtop16hottrend } = productdetailSlice.actions

export default productdetailSlice.reducer