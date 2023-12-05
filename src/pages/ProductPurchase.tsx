import { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks.ts";
import { instanceH } from "../api";
import Header from "../components/Header.tsx";
import PageButtons from "../components/PageButtons.tsx";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";

const overlayStyle = { background: "rgba(0,0,0,0.5)" };

export default function ProductPurchase(): ReactElement {
  const [page, setPage] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>([]);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [purchaseIndex, setPurchaseIndex] = useState<number[]>([]);
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const navigate = useNavigate();

  const search = (email: string) => {
    const api = `/admins/search?itemSellStatus=RESERVED&page=${page}${
      email.length > 0 ? `&itemReserver=${email}` : ""
    }`;
    instanceH(accessToken)
      .get(api)
      .then((res) => {
        const response: ProductListResponse = res.data;
        setPage(response.nowPageNumber);
        setTotalPage(response.totalPage);
        setProducts(response.items);
        setCheckedIndex(
          Array.from({ length: response.items.length }, () => false),
        );
      });
  };

  const onClickPurchase = () => {
    setIsModalOpened(true);
  };

  const purchase = () => {
    const body: any[] = [];
    purchaseIndex.forEach((i) =>
      body.push({
        count: products[i].itemRamount,
        itemId: products[i].itemId,
        itemReserver: products[i].itemReserver,
      }),
    );
    instanceH(accessToken)
      .post("/admins/orderItem", body)
      .then((res) => {
        console.log(res);
        setEmail("");
        search("");
      });
  };

  useEffect(() => {
    search(email);
  }, [page]);

  return (
    <>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="flex justify-between border-b pb-2">
          <div className="text-3xl">상품 주문</div>
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search(email);
                }
              }}
              className="bg-gray-200 pl-2"
              size={30}
              placeholder="검색할 이메일을 입력하세요."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="rounded-xl border px-1 py-1 hover:cursor-pointer"
              onClick={() => search(email)}
            />
          </div>
        </div>
        <div className="grid max-w-5xl grid-cols-9 gap-3 border-b py-4 pl-10 text-center font-bold">
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={checkedIndex.reduce((a, c) => a && c, true)}
              onChange={() => {
                if (checkedIndex.reduce((a, c) => a && c, true)) {
                  setCheckedIndex(checkedIndex.map(() => false));
                  return;
                }

                setCheckedIndex(checkedIndex.map(() => true));
              }}
            />
          </div>
          <div className="col-span-1">썸네일</div>
          <div className="col-span-2">상품명</div>
          <div className="col-span-1">가격</div>
          <div className="col-span-1">수량</div>
          <div className="col-span-2">예약자</div>
          <div className="col-span-1"></div>
        </div>
        {products.map((product, i) => (
          <div
            key={`product_${i}`}
            className="grid max-w-5xl grid-cols-9 items-center justify-items-center gap-3 border-b py-4 pl-10"
          >
            <div className="col-span-1">
              <input
                type="checkbox"
                checked={checkedIndex[i]}
                onChange={() => {
                  const next = [...checkedIndex];
                  next[i] = !checkedIndex[i];
                  setCheckedIndex(next);
                }}
              />
            </div>
            <div
              className="col-span-1 flex h-20 w-20 items-center justify-center bg-gray-200 hover:cursor-pointer"
              onClick={() => navigate(`/item/${product.itemId}`)}
            >
              {product.itemImgList.length !== 0 ? (
                <img
                  src={product.itemImgList[0].uploadImgUrl}
                  alt={`product_img_${i}`}
                  className="h-20 w-20"
                />
              ) : (
                <div className="text-sm">사진 없음</div>
              )}
            </div>
            <div
              className="col-span-2 justify-self-start hover:cursor-pointer"
              onClick={() => navigate(`/item/${product.itemId}`)}
            >
              {product.itemName}
            </div>
            <div className="col-span-1">
              {product.price.toLocaleString()} 원
            </div>
            <div className="col-span-1">{product.itemRamount} 개</div>
            <div className="col-span-2">{product.itemReserver}</div>
            <div className="col-span-1">
              <button
                className="h-8 w-20 rounded bg-blue-200"
                onClick={() => {
                  setPurchaseIndex([i]);
                  onClickPurchase();
                }}
              >
                구매 확정
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="mr-3 mt-4 h-8 w-44 rounded bg-blue-200"
            onClick={() => {
              const arr: number[] = checkedIndex
                .map((b, i) => (b ? i : -1))
                .filter((i) => i != -1);
              if (arr.length > 0) {
                setPurchaseIndex(arr);
                onClickPurchase();
              }
            }}
          >
            선택한 항목 구매 확정
          </button>
        </div>
        <PageButtons page={page} totalPage={totalPage} setPage={setPage} />
        <Popup
          open={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          modal
          {...{ overlayStyle }}
        >
          <div className="flex h-36 w-80 flex-col items-center justify-center rounded bg-white text-xl">
            <div className="mb-4">구매확정 하시겠습니까?</div>
            <div className="flex gap-2">
              <button
                className="w-20 rounded bg-red-300"
                onClick={() => {
                  setIsModalOpened(false);
                }}
              >
                취소
              </button>
              <button
                className="w-20 rounded bg-blue-300"
                onClick={() => {
                  purchase();
                  setIsModalOpened(false);
                }}
              >
                구매 확정
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </>
  );
}
