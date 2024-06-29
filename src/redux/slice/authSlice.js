import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authentication : false,
    isAdmin : false,
    token : '',        
    refresh_token : '',      
    user : {},
    email : '',
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
    isadmin : (state, action) =>{
      state.isAdmin = action.payload;
    } 
  },
})

// Action creators are generated for each case reducer function
export const { gettoken,Logout,getuser,isadmin,getemail } = authSlice.actions

export default authSlice.reducer