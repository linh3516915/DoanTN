import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productdetail: null,
    color: null,
    dungluong: null,
}

export const itemproductdetailSlice = createSlice({

    name: 'itemproductdetail',
    initialState,
    reducers: {
        getproductdetail: (state, action) => {
            state.productdetail = action.payload;
        },
        getcolor: (state, action) => {
            state.color = action.payload;
        },
        getdungluong: (state, action) => {
            state.dungluong = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { getproductdetail,getcolor,getdungluong } = itemproductdetailSlice.actions

export default itemproductdetailSlice.reducer