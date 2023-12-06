import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/user/userSlice";

export default function Sidenav() {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(logout());
  };
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      {user.memberId > -1 && (
        <div className="h-content absolute bottom-1/2 right-40 w-28 border bg-gray-50">
          {user.role === "ROLE_USER" ? (
            <>
              <div
                className="m-2 hover:cursor-pointer"
                onClick={() => navigate("/mypage/history")}
              >
                구매이력
              </div>
              <div
                className="m-2 hover:cursor-pointer"
                onClick={() => navigate("/mypage/inquiries")}
              >
                나의 문의
              </div>
              <div
                className="m-2 hover:cursor-pointer"
                onClick={() => navigate("/mypage/edit")}
              >
                회원수정
              </div>
              <div
                className="m-2 hover:cursor-pointer"
                onClick={() => onClick()}
              >
                로그아웃
              </div>
            </>
          ) : (
            <>
              <div
                className="m-2 hover:cursor-pointer"
                onClick={() => navigate("/admin/product")}
              >
                상품관리
              </div>
              <div
                className="m-2 hover:cursor-pointer"
                onClick={() => navigate("admin/inquiries")}
              >
                문의관리
              </div>
              <div
                className="m-2 hover:cursor-pointer"
                onClick={() => navigate("/mypage/edit")}
              >
                회원수정
              </div>
              <div
                className="m-2 hover:cursor-pointer"
                onClick={() => onClick()}
              >
                로그아웃
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
