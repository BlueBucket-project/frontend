import { ReactElement, useState } from "react";
import Logo from "../components/Logo.tsx";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import Popup from "reactjs-popup";
//import { instance } from "../api/index.ts";
import { useNavigate } from "react-router";

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

  const navigate = useNavigate();

  const handleRegister = () => {
    /* const body = {
      email: id,
      memberAddress: {
        memberAddr: addr,
        memberAddrDetail: addrDetail,
        memberZipCode: zipCode,
      },
      memberName: name,
      memberPw: password,
      memberRole: "ADMIN",
      nickName: nickName,
    };
    instance.post("/users/", body).then((res) => {
      if (res.data.statusCodeValue == 400) {
        alert("이미 가입된 회원입니다.");
      } else if (res.data.statusCodeValue == 200) {
        alert("회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.");
        navigate("/login", { state: { id, password } });
      }
    }); */
    navigate("/login", { state: { id, password } });
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
      <div className="w-2/5 border p-10 text-center text-xl">
        <div className="m-auto flex w-full flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-20 text-left">이메일</div>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="이메일"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 text-left">비밀번호</div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 text-left">이름</div>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 text-left">닉네임</div>
            <input
              type="nickName"
              id="nickName"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              placeholder="닉네임"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 text-left">우편번호</div>
            <input
              type="zipCode"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="우편번호"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
            <button
              className="input-base w-3/12 bg-blue-100"
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
          <div className="flex items-center gap-3">
            <div className="w-20 text-left">주소</div>
            <input
              type="addr"
              id="addr"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              placeholder="주소"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 text-left">상세 주소</div>
            <input
              type="addrDetail"
              id="addrDetail"
              value={addrDetail}
              onChange={(e) => setAddrDetail(e.target.value)}
              placeholder="상세 주소"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
          </div>
          <hr />
          <button
            id="btn-register"
            className="input-base bg-blue-200"
            onClick={() => handleRegister()}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
