import { ReactElement, useState } from "react";
import Popup from "reactjs-popup";
import { instanceH } from "../api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/user/userSlice";

const overlayStyle = { background: "rgba(0,0,0,0.5)" };

export default function Withdrawal(): ReactElement {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const accessToken = useAppSelector((state) => state.user.accessToken);
  const memberId = useAppSelector((state) => state.user.memberId);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="border-b pb-2 pl-4 text-3xl">회원 탈퇴</div>
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpened(true)}
          className="mt-10 w-32 rounded bg-red-300 text-xl"
        >
          회원 탈퇴
        </button>
        <Popup
          open={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          modal
          {...{ overlayStyle }}
        >
          <div className="flex h-36 w-60 flex-col items-center justify-center rounded bg-white text-xl">
            <div className="mb-4">정말 탈퇴하시겠습니까?</div>
            <button
              className="w-32 rounded bg-red-300"
              onClick={() => {
                instanceH(accessToken)
                  .delete(`/users/${memberId}`)
                  .then((res) => {
                    console.log(res);
                    console.log("탈퇴되었습니다.");
                    dispatch(logout());
                    alert("탈퇴되었습니다.");
                    window.location.href = "/";
                  });
                setIsModalOpened(false);
              }}
            >
              탈퇴하기
            </button>
          </div>
        </Popup>
      </div>
    </div>
  );
}
