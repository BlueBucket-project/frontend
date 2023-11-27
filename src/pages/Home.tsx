import Header from "../components/Header.tsx";
import Card from "../components/Card.tsx";
import { ReactElement, useRef, useEffect, useState } from "react";
import { instance } from "../api/index.ts";
import { Item } from "../responseTypes.ts";
import useInfiniteScroll from "../components/useInfinitescroll.ts";

interface Items extends Array<Item> {}

function Home(): ReactElement {
  const target = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Items>([]);

  const { page } = useInfiniteScroll({
    target: target,
    targetArray: items,
    threshold: 0.2,
    endPoint: 4,
  });

  useEffect(() => {
    instance
      .get("/items", { params: { page } })
      .then((res) => {
        setItems((prev) => [...new Set([...prev, ...res.data.items])]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="flex h-36 w-full items-center justify-center border-b-2 border-gray-100 py-4 font-sans text-4xl font-bold">
          <span>방금 올라온 물건들</span>
        </div>
        <div
          ref={target}
          className="mx-auto my-8 grid max-w-4xl grid-cols-3 gap-8"
        >
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
