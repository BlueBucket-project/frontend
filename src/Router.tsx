import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Cart from "./pages/Cart.tsx";
import MyPage from "./pages/MyPage.tsx";
import Search from "./pages/Search.tsx";
import Register from "./pages/Register.tsx";
import ItemDetail from "./pages/ItemDetail.tsx";
import ProductManage from "./pages/ProductManage.tsx";
import ProductEdit from "./pages/ProductEdit.tsx";
import InquiryList from "./pages/InquiryList.tsx";
import History from "./components/History.tsx";
import EditProfile from "./components/EditProfile.tsx";
import MyInquiries from "./components/MyInquiries.tsx";
import Withdrawal from "./components/Withdrawal.tsx";
import ProductCreate from "./pages/ProductCreate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/search",
    element: <Search />,
    children: [{ path: ":item", element: "" }],
  },
  {
    path: "/item/:itemId",
    element: <ItemDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
    children: [
      {
        path: "history",
        element: <History />,
      },
      {
        path: "mypost",
        element: <MyInquiries />,
      },
      {
        path: "edit",
        element: <EditProfile />,
      },
      {
        path: "withdrawal",
        element: <Withdrawal />,
      },
    ],
  },
  {
    path: "admin/inquiries",
    element: <InquiryList />,
  },
  {
    path: "/admin/product",
    element: <ProductManage />,
  },
  {
    path: "/admin/product/create",
    element: <ProductCreate />,
  },
  {
    path: "/admin/product/edit/:productId",
    element: <ProductEdit />,
  },
]);

export default router;
