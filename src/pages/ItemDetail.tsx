import { redirect, useParams } from "react-router-dom";
import Header from "../components/Header";
import fakeItemDB from "../fakeitemdb.json";

export default function ItemDetail() {
  const { itemid } = useParams();
  console.log(itemid);
  if (itemid === undefined || "") {
    redirect("/");
  }

  const item = fakeItemDB.filter((i) => i.itemid === +itemid!);

  const onClick = () => {};
  return (
    <div>
      <Header />
      <div className="mx-auto mt-4 flex min-w-max max-w-5xl justify-start">
        <div className="mr-16 h-96 w-96 rounded bg-blue-100 "></div>
        <div className="w-96">
          <div className="mb-8 w-full text-3xl font-bold">
            {item[0].itemName}
          </div>
          <div className="border-b pb-8 text-4xl font-bold">
            {item[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="mt-4 text-sm text-slate-600">
            {item[0].itemDetail}
          </div>
          <div className="mt-4 text-sm text-slate-600">{item[0].sellPlace}</div>
          <div className="mt-4 text-sm text-slate-600">
            {item[0].stockNumber}
          </div>
          <div className="mt-4 text-sm text-slate-600">
            {item[0].regtime.slice(0, 10)}
          </div>
          <button
            className="mt-4 h-16 w-full rounded bg-sky-100"
            onClick={onClick}
          >
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
}
