import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authentication : false,
    isAdmin : false,
    token : '',        
    refresh_token : '',      
    user : {},
    email : '',
    tokenToRun : '',
    OTP : null,
    nameshop : [],
}

export const authSlice = createSlice({
    
  name: 'auth',
  initialState,
  reducers: {
    gettoken : (state, action) => {
      state.token = action.payload.access_token;
      state.authentication = true;
      state.refresh_token= action.payload.refresh_token;
    },
    Logout : (state) => {
        state.token = '';
        state.authentication = false;
        state.refresh_token= '';
        state.user = {};  
      },
    getuser : (state, action) =>{
      state.user = action.payload.data_user;
    },
    getemail : (state, action) =>{
      state.email = action.payload;
    },
    gettokentorun : (state, action) =>{
      state.tokenToRun = action.payload;
    },
    isadmin : (state, action) =>{
      state.isAdmin = action.payload;
    } ,
    setOTP : (state, action) =>{
      state.OTP = action.payload;
    } ,
    setnameshop : (state, action) =>{
       console.log('ten',action.payload);
      state.nameshop = action.payload;
    } ,
  },
})

// Action creators are generated for each case reducer function
export const { gettoken,Logout,getuser,gettokentorun,isadmin,getemail,setOTP,setnameshop } = authSlice.actions

export default authSlice.reducer