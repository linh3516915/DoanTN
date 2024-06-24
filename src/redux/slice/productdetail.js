import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productdetails: null,
  sliceproductdetail: {},
}

export const productdetailSlice = createSlice({

  name: 'productdetail',
  initialState,
  reducers: {
    listProductdetail: (state, action) => {
      if(action.payload != null){
        state.productdetails = action.payload.data.data;
      }
      else{
        state.productdetails = action.payload;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { listProductdetail } = productdetailSlice.actions

export default productdetailSlice.reducer