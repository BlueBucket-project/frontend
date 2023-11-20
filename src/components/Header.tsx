import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import React, { ReactElement, useState } from "react";
import Logo from "./Logo.tsx";
import {
  faCartShopping,
  faClipboardQuestion,
  faGift,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice.ts";

function Header() {
  const user = useAppSelector((state) => state.user);
  const [item, setItem] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setItem(value);
  };

  const onSubmit = () => {
    if (item === "") {
      navigate("/");
    } else {
      navigate(`/search?itemName=${item}`);
    }
  };

  const onClickLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const renderLinks = (): ReactElement => {
    if (user.memberId === -1) {
      return (
        <div className="flex h-full items-center justify-end">
          <Link to="/login">
            <div className="flex w-14 flex-col items-center gap-1 text-sm">
              <FontAwesomeIcon icon={faRightToBracket} className="h-8 w-8" />
              <div>로그인</div>
            </div>
          </Link>
        </div>
      );
    }

    if (user.role === "ROLE_ADMIN") {
      return (
        <div className="flex h-full items-center justify-end gap-2">
          <Link to="/admin/product">
            <div className="flex w-14 flex-col items-center gap-1 text-xs">
              <FontAwesomeIcon icon={faGift} className="h-8 w-8" />
              <div>상품관리</div>
            </div>
          </Link>
          <Link to="/admin/inquiries">
            <div className="flex w-14 flex-col items-center gap-1 text-xs">
              <FontAwesomeIcon icon={faClipboardQuestion} className="h-8 w-8" />
              <div>문의관리</div>
            </div>
          </Link>
          <Link to="/mypage/edit">
            <div className="flex w-14 flex-col items-center gap-1 text-xs">
              <FontAwesomeIcon icon={faUser} className="h-8 w-8" />
              <div>마이페이지</div>
            </div>
          </Link>
          <div
            className="flex w-14 flex-col items-center gap-1 text-xs hover:cursor-pointer"
            onClick={() => onClickLogout()}
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="h-8 w-8" />
            <div>로그아웃</div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full items-center justify-end gap-2">
        <Link to="/cart">
          <div className="flex w-14 flex-col items-center gap-1 text-xs">
            <FontAwesomeIcon icon={faCartShopping} className="h-8 w-8" />
            <div>장바구니</div>
          </div>
        </Link>
        <Link to="/mypage/history">
          <div className="flex w-14 flex-col items-center gap-1 text-xs">
            <FontAwesomeIcon icon={faUser} className="h-8 w-8" />
            <div>마이페이지</div>
          </div>
        </Link>
        <div
          className="flex w-14 flex-col items-center gap-1 text-xs hover:cursor-pointer"
          onClick={() => onClickLogout()}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="h-8 w-8" />
          <div>로그아웃</div>
        </div>
      </div>
    );
  };

  return (
    <div className="sticky left-0 right-0 top-0 z-10 mx-auto mb-8 grid h-16 w-full max-w-5xl grid-cols-3 items-center bg-white p-2">
      <Link to="/" className="block h-full w-14 justify-self-start">
        <Logo />
      </Link>
      <div className="h-full w-80 justify-self-center">
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
      <div className="justify-self-end">{renderLinks()}</div>
    </div>
  );
}

export default Header;
