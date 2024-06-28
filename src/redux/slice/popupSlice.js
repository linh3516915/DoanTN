import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    btnPopupLogin : false,
    btnPopupOTP : false,
    btnPopupCommnent : false,
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
        openpopupcomment : (state) =>{
            state.btnPopupCommnent = true;
        },
        closepopupcomment : (state) =>{
            state.btnPopupCommnent = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const {openpopuplogin, closepopuplogin,openpopupotp
    , closepopupotp,openpopupcomment,closepopupcomment} = popupSlice.actions

export default popupSlice.reducer