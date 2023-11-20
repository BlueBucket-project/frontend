interface UserState {
  accessToken: string;
  accessTokenTime: string;
  grantType: string;
  memberEmail: string;
  refreshToken: string;
  refreshTokenTime: string;
  memberId: number;
  role: Role;
}

type Role = "ROLE_ADMIN" | "ROLE_USER";
