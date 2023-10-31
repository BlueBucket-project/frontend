import { redirect, useParams } from "react-router-dom";
import Header from "../components/Header";
import fakeItemDB from "../fakeitemdb.json";

export default function ItemDetail() {
  const { itemId } = useParams();
  if (typeof itemId == `undefined` || `null`) {
    redirect("/");
  }

  const item = fakeItemDB.find((i) => i.itemid === +itemId!);

  if (typeof item == `undefined` || `null`) {
    redirect("/");
  }

  function stockoption(SN: number) {
    const optionarr = [];
    for (let i = 0; i < SN; i++) {
      optionarr.push(<option key={i}>{i + 1}</option>);
    }
    return optionarr;
  }

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
              {item!.itemName}
            </div>
            <div className="border-b pb-8 text-4xl font-bold">
              {item!.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div className="mt-4 flex text-sm text-slate-600">
              <div className="w-24 ">위치</div>
              <div>{item!.sellPlace}</div>
            </div>
            <div className="mt-4 flex text-sm text-slate-600">
              <div className="w-24 ">개수</div>
              <select>{stockoption(item!.stockNumber)}</select>
            </div>
            <div className="mt-4 flex text-sm text-slate-600">
              <div className="w-24 ">올라온 날짜</div>
              <div>{item!.regtime.slice(0, 10)}</div>
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
            <div className="mt-8 text-lg">{item!.itemDetail}</div>
          </div>
        </div>
      </div>
    </>
  );
}
