import { ReactElement, useState } from "react";
import Logo from "../components/Logo.tsx";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import Popup from "reactjs-popup";

const overlayStyle = { background: "rgba(0,0,0,0.5)" };

export default function Register(): ReactElement {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [addr, setAddr] = useState<string>("");
  const [addrDetail, setAddrDetail] = useState<string>("");
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleRegister = () => {
    //TODO: Implement me
  };

  const onComplete = (data: Address) => {
    setZipCode(data.zonecode);
    setAddr(data.address);
    setAddrDetail(data.buildingName);
    setIsModalOpened(false);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-5 h-20 w-20">
        <Logo />
      </div>
      <div className="w-1/3 border p-10 text-center text-xl">
        <div className="m-auto flex flex-col">
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디(이메일)"
            className="input-base border-gray-400 bg-gray-100 pl-3"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="input-base border-gray-400 bg-gray-100 pl-3"
          />
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className="input-base border-gray-400 bg-gray-100 pl-3"
          />
          <input
            type="nickName"
            id="nickName"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="닉네임"
            className="input-base border-gray-400 bg-gray-100 pl-3"
          />
          <div className="flex gap-4">
            <input
              type="zipCode"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="우편번호"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
            <button
              className="input-base w-3/12 bg-amber-200"
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
          <input
            type="addr"
            id="addr"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder="주소"
            className="input-base border-gray-400 bg-gray-100 pl-3"
          />
          <input
            type="addrDetail"
            id="addrDetail"
            value={addrDetail}
            onChange={(e) => setAddrDetail(e.target.value)}
            placeholder="상세 주소"
            className="input-base border-gray-400 bg-gray-100 pl-3"
          />
          <hr />
          <button
            id="btn-register"
            className="input-base bg-orange-200"
            onClick={() => handleRegister()}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
