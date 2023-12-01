import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";
import { ICartItem } from "../responseTypes";
import { useState } from "react";

interface ItemProp {
  item: ICartItem;
  callListData: () => void;
}

export function CartItem({ item, callListData }: ItemProp) {
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const [isEditing, setIsEditing] = useState(false);
  const [selectCount, setSelectCount] = useState("");

  const handlecount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCount(e.target.value);
  };

  function stockoption(SN: number) {
    const optionarr = [];
    for (let i = 0; i < SN; i++) {
      optionarr.push(
        <option key={i} value={i + 1}>
          {i + 1}
        </option>,
      );
    }
    return optionarr;
  }

  const changeCount = (item: ICartItem) => {
    instanceH(accessToken)
      .put("/cart/item", {
        cartId: item.cart.cartId,
        count: selectCount,
        itemId: item.item.itemId,
      })
      .then(() => {
        setIsEditing(false);
        callListData();
      });
  };

  const cartItemReserve = (id: number) => {
    instanceH(accessToken)
      .post("/cart/orderItems", [
        {
          cartItemId: id,
        },
      ])
      .then(() => {
        callListData();
      });
  };

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

  return (
    <>
      {item.item ? (
        <div className="grid h-40 w-full grid-cols-7 items-center justify-between gap-4 border-b py-8">
          <div className="h-28 w-28 rounded-lg">
            {item.item.itemImgList && item.item.itemImgList?.length > 0 ? (
              <img
                className="mx-auto h-full"
                src={item.item.itemImgList[0].uploadImgUrl}
              />
            ) : (
              "이미지가 없습니다."
            )}
          </div>
          <div className="col-span-3 col-start-2 flex-col justify-between ">
            <div className="mb-4 w-96 text-xl">{item.item.itemName}</div>
            <div className="text-xl">
              {item.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </div>
          </div>
          <div>
            {isEditing ? (
              <div>
                <select onChange={handlecount}>
                  {stockoption(item.item.stockNumber)}
                </select>
                <button
                  onClick={() => changeCount(item)}
                  className="rounded-xl bg-yellow-100 p-2"
                >
                  수정완료
                </button>
              </div>
            ) : (
              <div>
                <div className="inline text-xl">{item.count}개</div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-4 rounded-xl bg-yellow-100 p-2"
                >
                  수정하기
                </button>
              </div>
            )}
          </div>
          <div className="text-xl">
            {(item.count * item.item.price)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </div>
          <div className="flex flex-col items-end">
            <button
              onClick={() => cartItemDelete(item)}
              className="mb-4 h-10 w-28 rounded-xl bg-red-100"
            >
              삭제
            </button>
            <button
              className="h-10 w-28 rounded-xl bg-blue-100"
              onClick={() => cartItemReserve(item.cartItemId)}
            >
              선택구매예약
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* <div className="h-40 w-full items-center justify-between border-b py-8">
          삭제되거나 출고된 상품입니다.
          <button
            onClick={() => cartItemDelete(item)}
            className="mb-4 ml-4 h-10 w-28 self-end rounded-xl bg-red-100"
          >
            삭제
          </button>
        </div> */}
        </div>
      )}
    </>
  );
}
