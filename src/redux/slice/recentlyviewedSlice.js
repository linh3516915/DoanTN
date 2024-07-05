import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
//   totalQuantity: 0, // Đảm bảo đây là 'totalQuantity' thay vì 'totalquality'

}

export const recentlyviewedSlice = createSlice({

  name: 'recentlyviewed',
  initialState: {
    items: [],
    // totalPrice: 0,
     totalQuantity: 0,
  },
  reducers: {
    // addCart: (state, action) => {
    //   state.items.push(action.payload);
    // },
    addRecently: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.product.san_pham_id === newItem.san_pham_id && item.product.mau_sac_id === newItem.mau_sac_id &&item.product.dung_luong_id === newItem.dung_luong_id);
      
      state.totalQuantity++;
      if (!existingItem) {
        state.items.unshift({
          product: newItem,
          //quantity: 1,
        });
      } else {
        state.items= state.items.filter(item => item.product.san_pham_id !== newItem.san_pham_id && item.product.mau_sac_id !== newItem.mau_sac_id &&item.product.dung_luong_id !== newItem.dung_luong_id);
        state.items.unshift({
          product: newItem,
          //quantity: 1,
        });
      }
    },
  },
})

export const { addRecently } = recentlyviewedSlice.actions

export default recentlyviewedSlice.reducer
