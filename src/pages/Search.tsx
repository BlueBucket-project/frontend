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
  const [sp, ssp] = useSearchParams();
  const item = sp.get("itemName");
  const [searchResult, setSearchResult] = useState<Items>([]);
  const [searchValue, setSearchValue] = useState({
    itemName: item,
    startPrice: "",
    endPrice: "",
    itemPlace: "",
  });

  const { itemName, startPrice, endPrice, itemPlace } = searchValue;

  useEffect(() => {
    instance
      .get(`/items/search`, { params: { itemName } })
      .then((res) => setSearchResult(res.data.items));
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchValue({
      ...searchValue,
      [name]: value,
    });
  };

  const onSubmit = () => {
    instance
      .get(`/items/search`, {
        params: { itemName, startPrice, endPrice, itemPlace },
      })
      .then((res) => {
        console.log(res);
        setSearchResult(res.data.items);
      })
      .catch(() => {
        setSearchResult([]);
      });
  };

  return (
    <>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <form className="flex w-full items-center justify-between py-4">
          <div>
            <label className="mr-4">검색어</label>
            <input
              name="itemName"
              onChange={handleInput}
              className="w-32 border"
            />
          </div>
          <div>
            <label className="mr-4">가격</label>
            <span>
              <input
                name="startPrice"
                onChange={handleInput}
                className="w-32 border"
              />
              원
            </span>
            <span className="mx-2">-</span>
            <span>
              <input
                name="endPrice"
                onChange={handleInput}
                className="w-32 border"
              />
              원
            </span>
          </div>
          <div>
            <label className="mr-4">지역</label>
            <input
              name="itemPlace"
              onChange={handleInput}
              className="w-32 border"
            />
          </div>
          <div>
            <button onSubmit={onSubmit}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
        <div className="flex h-36 w-full items-center justify-center border-b-2 border-gray-100 py-4 text-4xl font-bold">
          <span>"{item}" 에 대한 검색 결과</span>
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
    </>
  );
}
