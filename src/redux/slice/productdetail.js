import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productdetail : null,
    sliceproductdetail : {}
}

export const productdetailSlice = createSlice({
    
  name: 'productdetail',
  initialState,
  reducers: {
    listProductdetail : (state, action) => {
        state.productdetail = action.payload.data;
    },
    sliceproductdetail :(state,action) =>{
      state.sliceproductdetail = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { listProductdetail,sliceproductdetail } = productdetailSlice.actions

export default productdetailSlice.reducer