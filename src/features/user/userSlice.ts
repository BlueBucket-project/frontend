import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: UserState = {
  accessToken: "",
  accessTokenTime: "",
  grantType: "",
  memberEmail: "",
  refreshToken: "",
  refreshTokenTime: "",
  memberId: -1,
  role: "ROLE_USER",
};

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
};

export { parseJwt };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, actions) => {
      const accessToken = actions.payload.accessToken;
      state.accessToken = accessToken;
      state.accessTokenTime = actions.payload.accessTokenTime;
      state.memberEmail = actions.payload.memberEmail;
      state.refreshToken = actions.payload.refreshToken;
      state.refreshTokenTime = actions.payload.refreshTokenTime;
      state.memberId = actions.payload.memberId;
      const parsedJwt = parseJwt(accessToken);
      state.role = parsedJwt.auth[0];

      // TODO: Remove codes for test
      localStorage.setItem(
        "loggedInfo",
        JSON.stringify(actions.payload.accessToken),
      );
    },
    logout: (state) => {
      state.accessToken = "";
      state.accessTokenTime = "";
      state.memberEmail = "";
      state.refreshToken = "";
      state.refreshTokenTime = "";
      state.memberId = -1;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.memberId;

export default userSlice.reducer;

// https://velog.io/@sweet_pumpkin/Megabyte-School-React-Redux%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0 페이지 참고
