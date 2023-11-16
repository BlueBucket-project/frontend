import Header from "../components/Header.tsx";
import Card from "../components/Card.tsx";
import { ReactElement, useEffect, useState } from "react";
import { instance } from "../api/index.ts";
import { Item } from "../responseTypes.ts";

interface Items extends Array<Item> {}

function Home(): ReactElement {
  const [items, setItems] = useState<Items>([]);
  useEffect(() => {
    instance
      .get("/items")
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="flex h-36 w-full items-center justify-center border-b-2 border-gray-100 py-4 text-4xl font-bold">
          <span>방금 올라왔어요</span>
        </div>
        <div className="mx-auto my-8 grid max-w-4xl grid-cols-3 gap-8">
          {items && items.length > 0 ? (
            items.map((item) => {
              return <Card item={item} key={item.itemId} />;
            })
          ) : (
            <div>상품이 없습니다</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
