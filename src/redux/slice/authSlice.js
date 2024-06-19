import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authentication : false,
    token : '',        
    refresh_token : '',      
    user : {},
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
      state.user = action.payload;
    } 
  },
})

// Action creators are generated for each case reducer function
export const { gettoken,Logout,getuser } = authSlice.actions

export default authSlice.reducer