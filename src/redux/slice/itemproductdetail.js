import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productdetail: null,
    color: null,
    dungluong: null,
    infoproductdetail : null,
    listvote : null,
    trungbinhsao : 0,
    tongdanhgia : 0,
    listcomment : null
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
        },
        getinfoproductdetail: (state, action) => {
            state.infoproductdetail = action.payload;
        },
        getlistvote: (state, action) => {
            state.listvote = action.payload.data;
            state.trungbinhsao = action.payload.tong_phan_tram_sao;
            state.tongdanhgia = action.payload.tong_danh_gia;
            state.listcomment = action.payload.data_comment;
        }
    },
})

// Action creators are generated for each case reducer function
export const { getproductdetail,getcolor,getdungluong,getinfoproductdetail,getlistvote } = itemproductdetailSlice.actions

export default itemproductdetailSlice.reducer