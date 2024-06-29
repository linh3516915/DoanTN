import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0, // Đảm bảo đây là 'totalQuantity' thay vì 'totalquality'

}

export const cartSlice = createSlice({

  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    setCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    // addCart: (state, action) => {
    //   state.items.push(action.payload);
    // },
    addCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.product.san_pham_id === newItem.san_pham_id && item.product.mau_sac_id === newItem.mau_sac_id && item.product.dung_luong_id === newItem.dung_luong_id);

      state.totalQuantity++;
      state.totalPrice = state.totalPrice + newItem.gia;
      if (!existingItem) {
        state.items.push({
          product: newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    addCartUser: (state, action) => {
      const newItems = action.payload;
      if (action.payload != []) {
        newItems.forEach(newItem => {
          const existingItem = state.items.find(item => item.product.san_pham_id === newItem.ctsp.san_pham_id && item.product.mau_sac_id === newItem.ctsp.mau_sac_id && item.product.dung_luong_id === newItem.ctsp.dung_luong_id);

          state.totalQuantity++;
          state.totalPrice = state.totalPrice + newItem.ctsp.gia*newItem.so_luong;
          if (!existingItem) {
            state.items.push({
              product: newItem.ctsp,
              quantity: newItem.so_luong,
            });
          } else {
            existingItem.quantity =existingItem.quantity+newItem.so_luong;
          }
        });

      }

    },
    deleteItemInCart: (state, action) => {
      const newItem = action.payload;
      const item = state.items.find(item => item.product.san_pham_id === newItem.san_pham_id && item.product.mau_sac_id === newItem.mau_sac_id && item.product.dung_luong_id === newItem.dung_luong_id);
      if (item) {
        state.totalQuantity = state.totalQuantity - item.quantity;
        state.totalPrice = state.totalPrice - item.quantity * item.product.gia;
      }
      else {
        alert('k co');
      }
      state.items = state.items.filter(item => item.product.san_pham_id !== newItem.san_pham_id && item.product.mau_sac_id !== newItem.mau_sac_id && item.product.dung_luong_id !== newItem.dung_luong_id);
    },
    increase: (state, action) => {
      const newItem = action.payload;
      const item = state.items.find(item => item.product.san_pham_id === newItem.san_pham_id && item.product.mau_sac_id === newItem.mau_sac_id && item.product.dung_luong_id === newItem.dung_luong_id);
      item.quantity++;
      state.totalQuantity++;
      state.totalPrice = state.totalPrice + item.product.gia;
    },
    decrease: (state, action) => {
      const newItem = action.payload;
      const item = state.items.find(item => item.product.san_pham_id === newItem.san_pham_id && item.product.mau_sac_id === newItem.mau_sac_id && item.product.dung_luong_id === newItem.dung_luong_id);
      if (item.quantity <= 1) {
        state.items = state.items.filter(item => item.product.san_pham_id !== newItem.san_pham_id && item.product.mau_sac_id !== newItem.mau_sac_id && item.product.dung_luong_id !== newItem.dung_luong_id);
        state.totalQuantity--;
        state.totalPrice = state.totalPrice - item.product.gia;
      }
      else {
        item.quantity--;
        state.totalQuantity--;
        state.totalPrice = state.totalPrice - item.product.gia;
      }
    }
  },
})

export const { addCart,addCartUser, setCart, deleteItemInCart, increase, decrease } = cartSlice.actions

export default cartSlice.reducer
