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
import PostList from "./pages/PostList.tsx";
import PostEdit from "./pages/PostEdit.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import History from "./components/History.tsx";
import EditProfile from "./components/EditProfile.tsx";
import MyPost from "./components/MyPost.tsx";
import Withdrawal from "./components/Withdrawal.tsx";

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
        element: <MyPost />,
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
    path: "/post/",
    element: <PostList />,
  },
  {
    path: "/post/:postId",
    element: <PostDetail />,
  },
  {
    path: "/post/edit/:postId",
    element: <PostEdit />,
  },
  {
    path: "/admin/product",
    element: <ProductManage />,
  },
  {
    path: "/admin/product/:productId",
    element: <ProductEdit />,
  },
]);

export default router;
