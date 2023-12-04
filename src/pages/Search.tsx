import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import { instance } from "../api";
import { useEffect, useState } from "react";
import { Item } from "../responseTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Items extends Array<Item> {}

export default function Search() {
  const [sp] = useSearchParams();
  const [searchResult, setSearchResult] = useState<Items>([]);
  const [itemName, setItemName] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [itemPlace, setItemPlace] = useState("");
  const name = sp.get("itemName");
  const startp = sp.get("startPrice");
  const endp = sp.get("endPrice");
  const place = sp.get("itemPlace");

  function getSearchData() {
    instance
      .get(`/items/search`, {
        params: {
          itemName: name,
          startPrice: startp,
          endPrice: endp,
          itemPlace: place,
        },
      })
      .then((res) => {
        setSearchResult(res.data.items);
      })
      .catch(() => {
        setSearchResult([]);
      });
  }

  useEffect(() => {
    setItemName(name || "");
    setStartPrice(startp || "");
    setEndPrice(endp || "");
    setItemPlace(place || "");
    getSearchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <form className="flex w-full items-center justify-between py-4">
          <div>
            <label className="mr-4">검색어</label>
            <input
              name="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-32 border"
            />
          </div>
          <div>
            <label className="mr-4">가격</label>
            <span>
              <input
                name="startPrice"
                value={startPrice}
                onChange={(e) => setStartPrice(e.target.value)}
                className="w-32 border"
              />
              원
            </span>
            <span className="mx-2">-</span>
            <span>
              <input
                name="endPrice"
                value={endPrice}
                onChange={(e) => setEndPrice(e.target.value)}
                className="w-32 border"
              />
              원
            </span>
          </div>
          <div>
            <label className="mr-4">지역</label>
            <input
              name="itemPlace"
              value={itemPlace}
              onChange={(e) => setItemPlace(e.target.value)}
              className="w-32 border"
            />
          </div>
          <div>
            <button type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
        <div className="flex h-36 w-full items-center justify-center border-b-2 border-gray-100 py-4 text-4xl font-bold">
          <span>"{name}" 에 대한 검색 결과</span>
        </div>
        <div>
          <input className="my-8 mr-4" type="checkbox" />
          <span>구매 가능한 상품만 보기</span>
        </div>
        <div className="mx-auto my-8 grid max-w-4xl grid-cols-3 gap-8">
          {searchResult && searchResult.length > 0 ? (
            searchResult.map((item) => {
              return <Card item={item} key={item.itemId} />;
            })
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
