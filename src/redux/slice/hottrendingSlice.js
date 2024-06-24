import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show4hottrend: null,
    top16hottrend: null,
    none12hottrend: null,
    btnanimation: false,
}

export const hottrendingSlice = createSlice({
    
  name: 'hottrending',
  initialState,
  reducers: {
    listtop16hottrend: (state, action) => {

        state.top16hottrend = action.payload.data;
        state.none12hottrend = state.top16hottrend.slice(4, 17);
        state.show4hottrend = state.top16hottrend.slice(0, 4);
      },
      listshow4hottrend: (state, action) => {
        //const data= action.payload;
        //state.show4hottrend = action.payload.slice(0,4);
      },
      sliceproductdetail: (state, action) => {
        state.sliceproductdetail = action.payload.slice(0, 4);
      },
      moveright: (state) => {
        const enditemofshow4hottrend = state.show4hottrend.slice(0, 4);
        const enditemofnone12hottrend = state.none12hottrend.slice(0, 4);
        state.show4hottrend = state.show4hottrend.slice(4); // Xóa 4 phần tử đầu tiên của show4hottrend
        state.none12hottrend = state.none12hottrend.slice(4); // Xóa 4 phần tử đầu tiên của none12hottrend
  
        state.show4hottrend.push(...enditemofnone12hottrend); // Thêm các phần tử đã được sao chép vào cuối của show4hottrend
        state.none12hottrend.push(...enditemofshow4hottrend);
        state.btnanimation = true;
      },
      moveleft: (state) => {
        const enditemofshow4hottrend = state.show4hottrend.slice(0,4);
        const enditemofnone12hottrend = state.none12hottrend.slice( -4);
        state.show4hottrend = state.show4hottrend.slice(4); // Xóa 4 phần tử đầu tiên của show4hottrend
        state.none12hottrend = state.none12hottrend.slice(0, -4); // Xóa 4 phần tử đầu tiên của none12hottrend
  
        state.show4hottrend.push(...enditemofnone12hottrend); // Thêm các phần tử đã được sao chép vào cuối của show4hottrend
        state.none12hottrend.push(...enditemofshow4hottrend,... state.none12hottrend);
        state.btnanimation = false;
      }
  },
})

// Action creators are generated for each case reducer function
export const {  sliceproductdetail, listtop16hottrend, listshow4hottrend, moveright,moveleft } = hottrendingSlice.actions

export default hottrendingSlice.reducer