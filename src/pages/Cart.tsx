import { useState, useEffect } from "react";
import Header from "../components/Header";
import { ICartItem } from "../responseTypes";
import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";
import { CartItem } from "../components/CartItem";

interface ICartItems extends Array<ICartItem> {}

export default function Cart() {
  const [list, setList] = useState<ICartItems>([]);
  const accessToken = useAppSelector((state) => state.user.accessToken);

  useEffect(() => {
    instanceH(accessToken)
      .get("/cart")
      .then((res) => {
        setList(res.data.items);
      });
  }, []);

  const allItemReserve = () => {
    const allItemId: any[] = [];
    list.map((item) => {
      allItemId.push({ cartItemId: item.cartItemId });
    });
    instanceH(accessToken)
      .post("/cart/orderItems", allItemId)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Header />
      <div className="mx-auto mt-4 min-w-max max-w-5xl ">
        <div className="mt-8 w-full border-b-2 pb-4">
          <select className="w-24 border">
            <option>장바구니</option>
            <option>예약중</option>
          </select>
        </div>
        <div className="">
          {list.map((item) => {
            return <CartItem key={item.cartItemId} item={item} />;
          })}
        </div>
        <div className="mt-8 w-full">
          <button
            onClick={allItemReserve}
            className="mx-auto block rounded-lg border bg-blue-100 p-4"
          >
            전체구매예약
          </button>
        </div>
      </div>
    </>
  );
}
