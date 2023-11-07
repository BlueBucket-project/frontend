import { ReactElement } from "react";
import Header from "../components/Header.tsx";
import { SampleHistory } from "../sampleData/history.ts";

export default function ProductManage(): ReactElement {
  return (
    <>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="border-b pb-2 text-3xl">상품 관리</div>
        <div className="flex flex-auto items-center gap-3 border-b py-4 pl-10 font-bold">
          <div className="basis-1/6">썸네일</div>
          <div className="basis-1/3">상품명</div>
          <div className="basis-1/6">가격</div>
          <div className="basis-1/12">수량</div>
          <div className="basis-1/12">등록일</div>
        </div>
        {SampleHistory.map((product, i) => (
          <div
            key={`product_${i}`}
            className="flex items-center gap-3 border-b py-4 pl-10"
          >
            <div className="basis-1/6">
              <img
                src={product.thumbnailUrl}
                alt={`product_img_${i}`}
                className="h-20 w-20"
              />
            </div>
            <div className="basis-1/3">{product.name}</div>
            <div className="basis-1/6">{product.price.toLocaleString()} 원</div>
            <div className="basis-1/12">{product.quantity} 개</div>
            <div className="basis-1/12">{product.date}</div>
            <div className="flex flex-col gap-2">
              <button className="w-16 rounded bg-blue-200">수정</button>
              <button className="w-16 rounded bg-red-200">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
