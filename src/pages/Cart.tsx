import { useState, useEffect } from "react";
import Header from "../components/Header";
import { ICartItem } from "../responseTypes";
import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";

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

  const cartItemDelete = (item: ICartItem) => {
    instanceH(accessToken)
      .post("/cart/items", [
        {
          cartId: item.cart.cartId,
          count: item.count,
          itemId: item.item.itemId,
        },
      ])
      .then(() => {});
  };

  const cartItemReserve = (id: number) => {
    instanceH(accessToken)
      .post("/cart/orderItems", [
        {
          cartItemId: id,
        },
      ])
      .then(() => {});
  };

  const allItemReserve = () => {
    const allItemId: Record<string, number>[] = [];
    list.map((item) => {
      allItemId.push({ cartItemId: item.cartItemId });
    });
    console.log(allItemId);
    /* instanceH(accessToken)
      .post("/cart/orderItems", allItemId)
      .then((res) => {
        console.log(res);
      }); */
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
            return (
              <div className="flex h-40 w-full items-center justify-between border-b py-8">
                <div className="h-28 w-28 rounded-lg bg-blue-100 ">이미지</div>
                <div className="flex-col justify-between ">
                  <div className="mb-4 w-96">{item.item.itemName}</div>
                  <div>
                    {item.item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
                <div>
                  <div>{item.count}</div>
                  <div>수정하기</div>
                </div>
                <div>{item.count * item.item.price}</div>
                <div className="flex flex-col items-end">
                  <button onClick={() => cartItemDelete(item)} className="mb-4">
                    X
                  </button>
                  <button onClick={() => cartItemReserve(item.cartItemId)}>
                    선택구매예약
                  </button>
                </div>
              </div>
            );
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
