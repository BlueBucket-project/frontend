import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useState } from "react";
import Logo from "./Logo.tsx";

function Header() {
  const user = useAppSelector((state) => state.user.value);
  const [item, setItem] = useState("");
  const navigate = useNavigate();
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setItem(value);
  };

  const onSubmit = () => {
    if (item === "") {
      setItem("");
      navigate("/");
    } else {
      navigate(`/search/${item}`);
    }
  };
  return (
    <div className="sticky left-0 right-0 top-0 z-10 mx-auto flex h-16 w-full max-w-5xl items-center justify-center bg-white p-2 shadow-sm">
      <div className="block h-full w-14">
        <Logo />
      </div>
      <div className="h-full w-80">
        <form className="h-full w-full" onSubmit={onSubmit}>
          <input
            id="headerSearch"
            type="text"
            minLength={2}
            className="my-1 h-10 w-full bg-gray-200 p-2 focus:outline-none"
            placeholder="물건 이름이나 태그를 검색해보세요"
            onChange={onChange}
          ></input>
          <button hidden></button>
        </form>
      </div>
      {user ? (
        <div className="flex h-full w-32 items-center justify-end">
          <Link to="mypage">마이페이지</Link>
          <Link to="cart">장바구니</Link>
        </div>
      ) : (
        <div className="flex h-full w-32 items-center justify-end">
          <Link to="login">로그인/회원가입</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
