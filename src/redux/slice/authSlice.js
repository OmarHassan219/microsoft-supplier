import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openLogin: false,
    isLoggedIn: true,
    userEmail: null,
    userName: null,
    userId: null,
    userPhoto: null,
    currentPathname: null,
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      OPEN_LOGIN(state) {
        state.openLogin = true;
      },
      CLOSE_LOGIN(state) {
        state.openLogin = false;
      },
      SET_ACTIVE_USER(state, action) {
        const {userId,userName,userPhoto , email  } = action.payload
        console.log(action.payload)
        state.isLoggedIn = true;
        state.userName=userName
        state.userPhoto=userPhoto
        state.userEmail=email
        state.userId=userId
      },
      REMOVE_ACTIVE_USER(state, action) {
        
        state.isLoggedIn = false;
        state.userName=null
        state.userPhoto=null
        state.userEmail=null
        state.userId=null
        console.log(state.userEmail)
      },
      SET_CURRENT_PATHNAME(state, action) {
        state.currentPathname = action.payload.currentPathname;
        
      },
    },
  });
  
  export const { OPEN_LOGIN, CLOSE_LOGIN, SET_ACTIVE_USER, REMOVE_ACTIVE_USER , SET_CURRENT_PATHNAME } =
    authSlice.actions;
  
  export const selectOpenLogin = (state) => state.auth.openLogin;
  export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
  export const selectUserName = (state) => state.auth.userName;
  export const selectUserEmail = (state) => state.auth.userEmail;
  export const selectUserId = (state) => state.auth.userId;
  export const selectUserPhoto = (state) => state.auth.userPhoto;
  export const selectCurrentPathname = (state) => state.auth.currentPathname;
  
  export default authSlice.reducer;