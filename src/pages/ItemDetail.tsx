import { redirect, useParams } from "react-router-dom";
import Header from "../components/Header";
import fakeItemDB from "../fakeitemdb.json";

export default function ItemDetail() {
  const { itemid } = useParams();
  if (itemid === undefined || "") {
    redirect("/");
  }

  const item = fakeItemDB.filter((i) => i.itemid === +itemid!);

  const onClick = () => {};
  return (
    <>
      <Header />
      <div className="mx-auto mt-4 min-w-max max-w-5xl ">
        <div className="flex justify-start">
          <div className="mr-16 h-96 w-96 rounded bg-blue-100 ">
            상세 대표 이미지
          </div>
          <div className="flex w-1/2 flex-col justify-between">
            <div className="mb-8 w-full text-3xl font-bold">
              {item[0].itemName}
            </div>
            <div className="border-b pb-8 text-4xl font-bold">
              {item[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div className="mt-4 flex text-sm text-slate-600">
              <div className="w-24 ">위치</div>
              <div>{item[0].sellPlace}</div>
            </div>
            <div className="mt-4 flex text-sm text-slate-600">
              <div className="w-24 ">개수</div>
              <div>{item[0].stockNumber}</div>
            </div>
            <div className="mt-4 flex text-sm text-slate-600">
              <div className="w-24 ">올라온 날짜</div>
              <div>{item[0].regtime.slice(0, 10)}</div>
            </div>
            <button
              className="mt-4 h-16 w-full rounded bg-sky-100"
              onClick={onClick}
            >
              장바구니에 담기
            </button>
          </div>
        </div>
        <div className="mt-16 border-t border-t-black">
          <div className="py-8">
            <div className="border-b border-b-gray-200 pb-4 text-xl">
              상품 설명
            </div>
            <div className="mt-8 text-lg">{item[0].itemDetail}</div>
          </div>
        </div>
      </div>
    </>
  );
}
