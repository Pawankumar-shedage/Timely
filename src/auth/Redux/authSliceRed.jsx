import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:null,
    isLoggedIn:false
}

const authSliceRed = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout:(state)=>{
            state.user = null;
            state.isLoggedIn = false;
        }
    },
})

export const {loginSuccess,logout} = authSliceRed.actions;
export default authSliceRed.reducer;