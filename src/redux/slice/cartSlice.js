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
    setCart(state, payload) {
      const cart = payload.payload;
      state.items = cart.items;
      state.totalQuantity = cart.totalQuantity;
    },
    // addCart: (state, action) => {
    //   state.items.push(action.payload);
    // },
    addCart: (state, action) => {

      const newItem = action.payload;
      const existingItem = state.items.find(item => item.product.id === newItem.id);

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
    deleteItemInCart: (state, action) => {
      const item = state.items.find(item => item.product.id === action.payload);
      if (item) {
        state.totalQuantity = state.totalQuantity - item.quantity;
        state.totalPrice = state.totalPrice - item.quantity * item.product.gia;
      }
      else {
        alert('k co');
      }
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    increase: (state, action) => {
      const item = state.items.find(item => item.product.id === action.payload);
      item.quantity++;
      state.totalQuantity++;
      state.totalPrice = state.totalPrice + item.product.gia;
    },
    decrease: (state, action) => {
      const item = state.items.find(item => item.product.id === action.payload);
      if (item.quantity <= 1) {
        state.items = state.items.filter(item => item.product.id !== action.payload);
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

export const { addCart, setCart, deleteItemInCart,increase,decrease } = cartSlice.actions

export default cartSlice.reducer
