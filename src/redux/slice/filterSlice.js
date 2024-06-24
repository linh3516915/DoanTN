import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filterproduct: null,
    filterproductinheader: null,
    result: 0,
    trangdau: 16,
    trangcuoi: 1,
    loading: false,
    checkedAll: false,
    checkedTopseller: false,
    checkedNew: false
}

export const filterSlice = createSlice({

    name: 'filter',
    initialState,
    reducers: {
        settrang: (state, actions) => {
            state.trangcuoi = actions.payload;
        },
        searchProductdetail: (state, actions) => {
            state.filterproduct = actions.payload.data;
            state.result = actions.payload.result;
        },
        searchProductdetailInHeader: (state, actions) => {
            if (actions.payload != null) {
                state.result = actions.payload.result;
                state.filterproductinheader = actions.payload.data;
            }
            else {
                state.result = 0;
                state.filterproductinheader = actions.payload;
            }

        },
        checkedall: (state, actions) => {
            if (actions.payload == true) {
                state.checkedAll = actions.payload;
                state.checkedTopseller = !actions.payload;
                state.checkedNew = !actions.payload;
            }
            state.checkedAll = actions.payload;
        },
        checkedtopseller: (state, actions) => {
            if (actions.payload == true) {
                state.checkedTopseller = actions.payload;
                state.checkedAll = !actions.payload;
                state.checkedNew = !actions.payload;
            }
            state.checkedTopseller = actions.payload;
        },
        checkednew: (state, actions) => {
            if (actions.payload == true) {
                state.checkedNew = actions.payload;
                state.checkedAll = !actions.payload;
                state.checkedTopseller = !actions.payload;
            }
            state.checkedNew = actions.payload;

        },
        loadingmodal: (state, actions) => {
            state.loading = actions.payload;
        },
        filterpriceProductdetail: (state, actions) => {
            state.result = actions.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { searchProductdetail, filterpriceProductdetail, settrang
    , searchProductdetailInHeader, loadingmodal, checkedall,
    checkedtopseller, checkednew } = filterSlice.actions

export default filterSlice.reducer