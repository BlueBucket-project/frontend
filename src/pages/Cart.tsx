import { useState, useEffect } from "react";
import Header from "../components/Header";
import { ICartItem } from "../responseTypes";
import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";
import { CartItem } from "../components/CartItem";

interface ICartItems extends Array<ICartItem> {}

export default function Cart() {
  const [waitlist, setWaitList] = useState<ICartItems>([]);
  const [reservedList, setReservedList] = useState<ICartItems>([]);
  const [state, setState] = useState("wait");
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const [loading, setLoading] = useState(true);

  const stateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  function callListData() {
    instanceH(accessToken)
      .get("/cart")
      .then((res) => {
        setWaitList(
          res.data.items.filter(function (item: ICartItem) {
            return item.status == "WAIT";
          }),
        );
        setReservedList(
          res.data.items.filter(function (item: ICartItem) {
            return item.status == "RESERVED";
          }),
        );
        setLoading(false);
      });
  }

  useEffect(() => {
    callListData();
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
      .then(() => {
        callListData();
      });
  };

  const reserveItemCart = (id: number) => {
    instanceH(accessToken)
      .post("/cart/cancelItems", [
        {
          cartItemId: id,
        },
      ])
      .then(() => {
        callListData();
      });
  };

  const allItemReserve = () => {
    const allItemId: Record<string, number>[] = [];
    waitlist.map((item) => {
      allItemId.push({ cartItemId: item.cartItemId });
    });
    instanceH(accessToken)
      .post("/cart/orderItems", allItemId)
      .then(() => {
        callListData();
      });
  };

  const allItemWait = () => {
    const allItemId: Record<string, number>[] = [];
    reservedList.map((item) => {
      allItemId.push({ cartItemId: item.cartItemId });
    });
    instanceH(accessToken)
      .post("/cart/cancelItems", allItemId)
      .then(() => {
        callListData();
      });
  };

  return (
    <>
      <Header />
      {loading ? (
        <div>로딩중</div>
      ) : (
        <div className="mx-auto mt-4 min-w-max max-w-5xl ">
          <div className="mt-8 w-full border-b-2 pb-4">
            <select
              defaultValue="wait"
              className="w-24 border"
              onChange={stateChange}
            >
              <option value="wait">장바구니</option>
              <option value="reserved">예약중</option>
            </select>
          </div>
          {state == "wait" ? (
            <>
              <div className="">
                {waitlist.map((item) => {
                  return (
                    <CartItem
                      item={item}
                      callListData={callListData}
                      key={item.cartItemId}
                    />
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
            </>
          ) : (
            <>
              <div className="">
                {reservedList.map((item) => {
                  return (
                    <div
                      key={item.cartItemId}
                      className="grid h-40 w-full grid-cols-8 items-center justify-between gap-4 border-b py-8"
                    >
                      <div className="h-28 w-28 rounded-lg bg-blue-100 ">
                        {item.item.itemImgList &&
                        item.item.itemImgList?.length > 0 ? (
                          <img src={item.item.itemImgList[0].uploadImgUrl} />
                        ) : (
                          "이미지가 없습니다."
                        )}
                      </div>
                      <div className="col-span-4 col-start-2 flex-col justify-between ">
                        <div className="mb-4 w-96 text-xl">
                          {item.item.itemName}
                        </div>
                        <div className="text-xl">
                          {item.item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </div>
                      </div>
                      <div className="text-xl">
                        <div>{item.count}개</div>
                      </div>
                      <div className="text-xl">
                        {(item.count * item.item.price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </div>
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => cartItemDelete(item)}
                          className="mb-4 h-10 w-28 rounded-xl bg-red-100"
                        >
                          취소
                        </button>
                        <button
                          className="h-10 w-28 rounded-xl bg-blue-100"
                          onClick={() => reserveItemCart(item.cartItemId)}
                        >
                          장바구니
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 w-full">
                <button
                  onClick={allItemWait}
                  className="mx-auto block rounded-lg border bg-blue-100 p-4"
                >
                  전체예약취소
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
