import Header from "../components/Header.tsx";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";

export default function MyPage() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-[1fr_64rem_1fr] justify-center">
        <Sidebar />
        <div className="mt-8 h-screen w-full min-w-max max-w-5xl">
          <Outlet />
        </div>
      </div>
    </>
  );
}
