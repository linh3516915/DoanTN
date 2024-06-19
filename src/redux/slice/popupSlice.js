import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    btnPopupLogin : false,
    btnPopupOTP : false,
    datacheckotp : null
}

export const popupSlice = createSlice({

    name: 'popup',
    initialState,
    reducers: {
        openpopuplogin : (state) =>{
            state.btnPopupLogin = true;
        },
        closepopuplogin : (state) =>{
            state.btnPopupLogin = false;
        },
        openpopupotp : (state,action) =>{
            state.datacheckotp = action.payload;
            state.btnPopupOTP = true;
            
        },
        closepopupotp : (state) =>{
            state.datacheckotp = null;
            state.btnPopupOTP = false;
          
        },
    },
})

// Action creators are generated for each case reducer function
export const {openpopuplogin, closepopuplogin,openpopupotp, closepopupotp} = popupSlice.actions

export default popupSlice.reducer