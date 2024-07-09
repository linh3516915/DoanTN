import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  donhang : null,
  chitietdonhang : null,
  btnctdh : false
}

export const ordermanagementSlice = createSlice({

  name: 'ordermanagement',
  initialState,
  reducers: {
    setdonhang: (state, action) => {
        state.donhang = action.payload;
    },
    setchitietdonhang: (state, action) => {
      state.chitietdonhang = action.payload;
    },
    setbtnctdh: (state, action) => {
        state.btnctdh = action.payload;
      },
    setduyetdon : (state, action) => {
     
      const check = state.donhang.find(item=>item.id == action.payload);
      check.trang_thai = 2 ; 
    },
    setxacnhandon : (state, action) => {
     
      const check = state.donhang.find(item=>item.id == action.payload);
      check.trang_thai = 3 ; 
      check.payment_methods = 1 ;
    },
    sethuydon: (state, action) => {
      const check = state.donhang.find(item=>item.id == action.payload);
      check.trang_thai = 4; 
    },
    setduyethuy: (state, action) => {
      const check = state.donhang.find(item=>item.id == action.payload);
      check.trang_thai = 5; 
    },
  },
})

// Action creators are generated for each case reducer function
export const { setdonhang,setchitietdonhang,setbtnctdh,setduyetdon,setxacnhandon,sethuydon,setduyethuy } = ordermanagementSlice.actions

export default ordermanagementSlice.reducer