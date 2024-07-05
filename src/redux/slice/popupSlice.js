import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    btnPopupLogin : false,
    btnPopupOTP : false,
    btnPopupCommnent : false,
    btnPopupPay : false,
    datacheckotp : null,
    datacheckout : null,
    checkbox : false
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
        openpopuppay : (state,action) =>{
            state.btnPopupPay = true;
        },
        closepopuppay : (state) =>{
            state.btnPopupPay = false;
            state.datacheckout = null;
        },
        setcheckbox: (state,action) =>{
            state.checkbox = action.payload;
        },
        setdatacheckout :(state,action) =>{
            state.datacheckout = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {openpopuplogin, closepopuplogin,openpopupotp
    , closepopupotp,openpopupcomment,closepopupcomment,
    openpopuppay,closepopuppay,setcheckbox,setdatacheckout} = popupSlice.actions

export default popupSlice.reducer