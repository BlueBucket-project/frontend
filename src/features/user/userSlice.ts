import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface userState {
  accessToken: string;
  accessTokenTime: string;
  grantType: string;
  id: number;
  memberEmail: string;
  refreshToken: string;
  refreshTokenTime: string;
}

const initialState: userState = {
  accessToken: "",
  accessTokenTime: "",
  grantType: "",
  id: 0,
  memberEmail: "",
  refreshToken: "",
  refreshTokenTime: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.accessToken = actions.payload.accessToken;
      state.accessTokenTime = actions.payload.accessTokenTime;
      state.id = actions.payload.id;
      state.memberEmail = actions.payload.memberEmail;
      state.refreshToken = actions.payload.refreshToken;
      state.refreshTokenTime = actions.payload.refreshTokenTime;
    },
    logout: (state) => {
      state.accessToken = "";
      state.accessTokenTime = "";
      state.id = 0;
      state.memberEmail = "";
      state.refreshToken = "";
      state.refreshTokenTime = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.id;

export default userSlice.reducer;

// https://velog.io/@sweet_pumpkin/Megabyte-School-React-Redux%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0 페이지 참고
