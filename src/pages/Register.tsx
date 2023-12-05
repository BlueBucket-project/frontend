import { ReactElement, useState } from "react";
import Logo from "../components/Logo.tsx";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import Popup from "reactjs-popup";
import { instance } from "../api/index.ts";
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
  const [mailError, setMailError] = useState<string>("");
  const [pwError, setPwError] = useState<string>("");
  const [NNError, setNNError] = useState<string>("");

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "id") {
      setId(e.target.value);
      const isValidEmail = /^[[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-z]{2,3}/.test(
        e.target.value,
      );
      if (e.target.value === "") {
        setMailError("");
      } else if (!isValidEmail) {
        setMailError("이메일이 올바르지 않습니다.");
      } else {
        setMailError("");
      }
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
      const isValidPassword =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(
          e.target.value,
        );
      if (e.target.value === "") {
        setPwError("");
      } else if (e.target.value.length < 8) {
        setPwError("비밀번호는 8자 이상이어야 합니다.");
      } else if (!isValidPassword) {
        setPwError(
          "비밀번호는 영어, 숫자, 특수문자를 적어도 1개는 포함하여야 합니다.",
        );
      } else {
        setPwError("");
      }
    } else if (e.target.id === "nickName") {
      setNickName(e.target.value);
      const isValidNickname = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/.test(e.target.value);
      if (e.target.value === "") {
        setNNError("");
      } else if (!isValidNickname) {
        setNNError("닉네임은 한글 혹은 영어여야합니다.");
      } else {
        setNNError("");
      }
    }
  };

  const navigate = useNavigate();

  const handleRegister = () => {
    const body = {
      email: id,
      memberAddress: {
        memberAddr: addr,
        memberAddrDetail: addrDetail,
        memberZipCode: zipCode,
      },
      memberName: name,
      memberPw: password,
      memberRole: "USER",
      nickName: nickName,
    };
    instance.post("/users/", body).then((res) => {
      if (res.data.statusCodeValue == 400) {
        alert("이미 가입된 회원입니다.");
      } else if (res.data.statusCodeValue == 200) {
        alert("회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.");
        console.log(res.data);
        navigate("/login", { state: { id, password } });
      }
    });
  };

  const onComplete = (data: Address) => {
    setZipCode(data.zonecode);
    setAddr(data.address);
    setAddrDetail(data.buildingName);
    setIsModalOpened(false);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div
        className="mb-5 h-32 w-48 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Logo />
      </div>
      <div className="w-2/5 border border-blue-200 p-10 text-center text-xl">
        <div className="m-auto flex w-full flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-28 text-left">이메일</div>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => handleValidation(e)}
              placeholder="이메일"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
          </div>
          {mailError && <p className="text-base text-red-400">{mailError}</p>}
          <div className="flex items-center gap-3">
            <div className="w-28 text-left">비밀번호</div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleValidation(e)}
              placeholder="비밀번호"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
          </div>
          {pwError && <p className="text-base text-red-400">{pwError}</p>}
          <div className="flex items-center gap-3">
            <div className="w-28 text-left">이름</div>
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
            <div className="w-28 text-left">닉네임</div>
            <input
              type="nickName"
              id="nickName"
              value={nickName}
              onChange={(e) => handleValidation(e)}
              placeholder="닉네임"
              className="input-base grow border-gray-400 bg-gray-100 pl-3"
            />
          </div>
          {NNError && <p className="text-base text-red-400">{NNError}</p>}
          <div className="flex items-center gap-3">
            <div className="w-28 text-left">우편번호</div>
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
            <div className="w-28 text-left">주소</div>
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
            <div className="w-28 text-left">상세 주소</div>
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
