import { ReactElement } from "react";
import { Link } from "react-router-dom";

const links = {
  history: "/mypage/history",
  inquiries: "/mypage/inquiries",
  edit: "/mypage/edit",
  withdrawal: "/mypage/withdrawal",
};
export default function Sidebar({ path }: { path: string }): ReactElement {
  return (
    <div className="mr-8 flex items-start justify-end pt-20">
      <div className="flex w-32 flex-col gap-3 rounded-xl border border-gray-400 py-4 pl-4">
        <Link to={links.history}>
          <div className={path === links.history ? "font-bold" : ""}>
            구매 이력
          </div>
        </Link>
        <Link to={links.inquiries}>
          <div className={path === links.inquiries ? "font-bold" : ""}>
            나의 문의
          </div>
        </Link>
        <Link to={links.edit}>
          <div className={path === links.edit ? "font-bold" : ""}>
            내 정보 수정
          </div>
        </Link>
        <Link to={links.withdrawal}>
          <div className={path === links.withdrawal ? "font-bold" : ""}>
            회원 탈퇴
          </div>
        </Link>
      </div>
    </div>
  );
}
