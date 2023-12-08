import { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks.ts";
import { instanceH } from "../api";
import { useNavigate } from "react-router-dom";

export default function History(): ReactElement {
  const [histories, setHistories] = useState<PurchaseHistory[]>([]);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    instanceH(user.accessToken)
      .get(`/users/order/${user.memberEmail}`)
      .then((res) => setHistories(res.data));
  }, []);

  return (
    <div>
      <div className="border-b-2 border-black pb-2 pl-4 text-3xl">
        {user.role === "ROLE_USER" ? "구매 이력" : "구매 처리 내역"}
      </div>
      <div className="grid max-w-5xl grid-cols-6 gap-3 border-b border-gray-400 py-4 pl-10 text-center font-bold">
        <div className="col-span-3">상품명</div>
        <div className="col-span-1">가격</div>
        <div className="col-span-1">수량</div>
        <div className="col-span-1">등록일</div>
      </div>
      {histories.map((history, i) => (
        <div
          key={`history_${i}`}
          className="grid max-w-5xl grid-cols-6 items-center justify-items-center gap-3 border-b border-gray-400 py-4 pl-10"
        >
          <div
            className="col-span-3 justify-self-start hover:cursor-pointer"
            onClick={() => navigate(`/item/${history.itemId}`)}
          >
            {history.item.itemName}
          </div>
          <div className="col-span-1">
            {history.itemPrice.toLocaleString()} 원
          </div>
          <div className="col-span-1">{history.itemAmount} 개</div>
          <div className="col-span-1">{history.orderDate.split("T")[0]}</div>
        </div>
      ))}
    </div>
  );
}
