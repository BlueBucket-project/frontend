import Header from "../components/Header.tsx";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import { useEffect, useState } from "react";

export default function MyPage() {
  const [path, setPath] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);
  return (
    <>
      <Header />
      <div className="grid grid-cols-[1fr_64rem_1fr] justify-center">
        <Sidebar path={path} />
        <div className="mt-8 h-screen w-full min-w-max max-w-5xl">
          <Outlet />
        </div>
      </div>
    </>
  );
}
