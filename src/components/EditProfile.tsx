import { ReactElement, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";

const overlayStyle = { background: "rgba(0,0,0,0.5)" };

export default function EditProfile(): ReactElement {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [addr, setAddr] = useState<string>("");
  const [addrDetail, setAddrDetail] = useState<string>("");
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const onComplete = (data: Address) => {
    setZipCode(data.zonecode);
    setAddr(data.address);
    setAddrDetail(data.buildingName);
    setIsModalOpened(false);
  };

  const accessToken = useAppSelector((state) => state.user.accessToken);
  const memberId = useAppSelector((state) => state.user.id);

  useEffect(() => {
    instanceH(accessToken)
      .get(`/users/${memberId}`)
      .then((res) => console.log(res.data));
  }, []);

  return (
    <div>
      <div className="border-b pb-2 pl-4 text-3xl">내 정보 수정</div>
      <div className="mt-8 flex flex-col items-center text-xl">
        <div className="flex flex-col justify-start gap-8 pr-10">
          <div className="flex">
            <div className="w-48 pr-10">이메일</div>
            <div>이메일</div>
          </div>
          <div className="flex">
            <div className="w-48 pr-10">비밀번호</div>
            <div className="flex grow flex-col">
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded border border-gray-400 bg-gray-100 pl-2"
              />
              <div className="hidden text-sm">비밀번호 규칙</div>
            </div>
          </div>
          <div className="flex">
            <div className="w-48 pr-10">비밀번호 재입력</div>
            <input
              type="password"
              placeholder="비밀번호 재입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="grow rounded border border-gray-400 bg-gray-100 pl-2"
            />
          </div>
          <div className="flex">
            <div className="w-48 pr-10">닉네임</div>
            <input
              type="text"
              placeholder="닉네임"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="grow rounded border border-gray-400 bg-gray-100 pl-2"
            />
          </div>
          <div className="flex">
            <div className="w-48 pr-10">우편번호</div>
            <div className="flex grow gap-2">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="우편번호"
                className="grow rounded border border-gray-400 bg-gray-100 pl-2"
              />
              <button
                className="w-32 rounded border border-blue-300 bg-blue-200"
                onClick={() => setIsModalOpened(!isModalOpened)}
              >
                주소 검색
              </button>
              <Popup
                open={isModalOpened}
                onClose={() => setIsModalOpened(false)}
                modal
                {...{ overlayStyle }}
              >
                <DaumPostcodeEmbed
                  style={{ width: "500px" }}
                  onComplete={(data) => onComplete(data)}
                />
              </Popup>
            </div>
          </div>
          <div className="flex">
            <div className="w-48 pr-10">주소</div>
            <input
              type="text"
              placeholder="주소"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              className="grow rounded border border-gray-400 bg-gray-100 pl-2"
            />
          </div>
          <div className="flex">
            <div className="w-48 pr-10">상세 주소</div>
            <input
              type="text"
              placeholder="상세 주소"
              value={addrDetail}
              onChange={(e) => setAddrDetail(e.target.value)}
              className="grow rounded border border-gray-400 bg-gray-100 pl-2"
            />
          </div>
        </div>
        <button
          className="mt-10 w-32 rounded bg-blue-300"
          onClick={() => console.log("edit button clicked")}
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
