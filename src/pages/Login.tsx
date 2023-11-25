import { ReactElement, useEffect, useState } from "react";
import Logo from "../components/Logo.tsx";
import naverLogin from "../../public/naverLogin.png";
import googleLogin from "../../public/googleLogin.png";
import { useAppDispatch } from "../app/hooks.ts";
import { login } from "../features/user/userSlice.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../api/index.ts";
import { Link } from "react-router-dom";

function Login(): ReactElement {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { id: string; password: string };
  useEffect(() => {
    if (state) {
      setId(state.id);
      setPassword(state.password);
    }
  }, []);

  const handleLogin = () => {
    const body = { memberEmail: id, memberPw: password };
    instance.post("/users/login", body).then((res) => {
      if (res.data.statusCodeValue == 404) {
        alert("존재하지 않는 아이디입니다.");
      } else if (res.data.statusCodeValue == 400) {
        alert("잘못된 비밀번호입니다.");
        console.log(res);
      } else {
        dispatch(login(res.data.body));
        navigate("/");
      }
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-5 h-40 w-40">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="w-1/4 border border-blue-200 p-10 text-center text-xl">
        <div className="m-auto flex flex-col gap-5">
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            placeholder="비밀번호"
            className="input-base border-gray-400 bg-gray-100 pl-3"
          />
          <button
            id="btn-login"
            className="input-base bg-blue-200"
            onClick={() => handleLogin()}
          >
            로그인
          </button>
          <hr />
          <button
            id="btn-register"
            className="input-base bg-blue-100"
            onClick={() => navigate("/register")}
          >
            회원가입
          </button>
          <hr />
          <div className="mt-4 text-base">소셜 로그인</div>
          <div className="flex justify-center gap-2">
            <a href="#">
              <img src={naverLogin} alt="naver login" className="h-10" />
            </a>
            <a href="#">
              <img src={googleLogin} alt="google login" className="h-10" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
