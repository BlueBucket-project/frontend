import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";
import { ICartItem } from "../responseTypes";

interface CartItem {
  item: ICartItem;
}

export function CartItem(item: CartItem) {
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const cartItemDelete = () => {
    instanceH(accessToken)
      .post("/cart/items", [
        {
          cartId: item.item.cart.cartId,
          count: item.item.count,
          itemId: item.item.item.itemId,
        },
      ])
      .then(() => {});
  };

  const cartItemReserve = () => {
    instanceH(accessToken)
      .post("/cart/orderItems", [
        {
          cartItemId: item.item.cartItemId,
        },
      ])
      .then(() => {});
  };

  return (
    <div className="flex h-40 w-full items-center justify-between border-b py-8">
      <div className="h-28 w-28 rounded-lg bg-blue-100 ">이미지</div>
      <div className="flex-col justify-between ">
        <div className="mb-4 w-96">{item.item.item.itemName}</div>
        <div>
          {item.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
      <div>
        <div>{item.item.count}</div>
        <div>수정하기</div>
      </div>
      <div>{item.item.count * item.item.price}</div>
      <div className="flex flex-col items-end">
        <button onClick={cartItemDelete} className="mb-4">
          X
        </button>
        <button onClick={cartItemReserve}>선택구매예약</button>
      </div>
    </div>
  );
}
