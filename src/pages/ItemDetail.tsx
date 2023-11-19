import { redirect, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";
import { IBoardList, Item } from "../responseTypes";

export default function ItemDetail() {
  const { itemId } = useParams();
  if (typeof itemId == `undefined` || `null`) {
    redirect("/");
  }

  const [item, setItem] = useState<Item>();
  const [board, setBoard] = useState<IBoardList>();
  const [loading, setLoading] = useState(true);
  const [isfold, setIsfold] = useState(true);

  const accessToken = useAppSelector((state) => state.user.accessToken);

  function getItemDetailData() {
    instanceH(accessToken)
      .get(`/items/${itemId}`, { params: { page: 1 } })
      .then((res) => {
        setItem(res.data);
        setLoading(false);
      });
  }
  function getBoardData() {
    instanceH(accessToken)
      .get(`/${itemId}/boards`)
      .then((res) => {
        setBoard(res.data);
      });
  }

  useEffect(() => {
    getItemDetailData();
    getBoardData();
  }, []);

  function stockoption(SN: number) {
    const optionarr = [];
    for (let i = 0; i < SN; i++) {
      optionarr.push(
        <option key={i} value={i + 1}>
          {i + 1}
        </option>,
      );
    }
    return optionarr;
  }

  const [count, setCount] = useState("1");
  const handlecount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(e.target.value);
  };

  const onClick = () => {
    instanceH(accessToken)
      .post(`/cart`, { count, itemId })
      .then(() => {
        alert(`${count}개가 장바구니에 추가되었습니다.`);
      });
  };

  const postqna = () => {
    instanceH(accessToken)
      .post(`/${itemId}/boards`)
      .then((res) => console.log(res));
  };

  const imgdata = [1, 2, 3];

  const [focusedImg, setFocusedImg] = useState(0);

  const nextImg = () => {
    if (focusedImg < imgdata.length - 1) {
      setFocusedImg(focusedImg + 1);
    } else {
      setFocusedImg(0);
    }
  };
  const beforeImg = () => {
    if (focusedImg > 0) {
      setFocusedImg(focusedImg - 1);
    } else {
      setFocusedImg(imgdata.length);
    }
  };

  return (
    <>
      <Header />
      <div className="mx-auto mt-4 min-w-max max-w-5xl ">
        {loading ? (
          <div>로딩중</div>
        ) : (
          <>
            <div className="flex justify-start">
              <div>
                <div className="mr-16 h-96 w-96 rounded bg-blue-100 ">
                  <div className="flex h-full w-full justify-between">
                    <button
                      className="my-auto h-12 w-12 rounded-full bg-blue-50 text-2xl"
                      onClick={beforeImg}
                    >
                      &lt;
                    </button>
                    <button
                      className="my-auto h-12 w-12 rounded-full bg-blue-50 text-2xl"
                      onClick={nextImg}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
                <div className="my-4 flex">
                  {imgdata.map((item) => {
                    return (
                      <div
                        key={item}
                        className="mr-4 h-16 w-16 rounded bg-blue-100"
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
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
                  <select onChange={handlecount}>
                    {stockoption(item!.stockNumber)}
                  </select>
                </div>
                <div className="mt-4 flex text-sm text-slate-600">
                  <div className="w-24 ">올라온 날짜</div>
                  <div>{item!.regTime.slice(0, 10)}</div>
                </div>
                <button
                  className="mt-4 h-16 w-full rounded bg-sky-100"
                  onClick={onClick}
                >
                  장바구니에 담기
                </button>
              </div>
            </div>
            <div className="mt-16 border-y border-y-black ">
              <div className="grid grid-cols-2 justify-items-center self-center text-xl font-bold">
                <button className="border-r-gray w-full border-r py-4 text-center">
                  상품 설명
                </button>
                <button className="w-full py-4 text-center">Q&A</button>
              </div>
            </div>
            <div className="mb-8" id="상세설명">
              <div className="my-4 text-lg font-semibold">판매자 상품 설명</div>
              <div className="my-4">{item!.itemDetail}</div>
            </div>
            <div className="my-4" id="QA">
              <div className="my-4 text-lg font-bold">Q&A</div>
              <div className="border-y border-t-2 border-t-black">
                <div className="grid grid-cols-10 border-b border-b-gray-400 py-4 text-center">
                  <div>답변상태</div>
                  <div className="col-span-7 col-start-2">문의 내용</div>
                  <div>작성자</div>
                  <div>작성일</div>
                </div>
                {board && board.items.length > 0 ? (
                  board.items.map((item) => {
                    return (
                      <div className="grid grid-cols-10  border-b border-b-gray-400 py-4 text-center">
                        <div>답변상태</div>
                        <div className="col-span-7 col-start-2 text-left">
                          {item.content}
                        </div>
                        <div>{item.nickName.replace(/(?<=.{2})./gi, "*")}</div>
                        <div>{item.regTime.slice(0, 10)}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="my-4 text-center">문의 사항이 없습니다.</div>
                )}
              </div>
              {isfold ? (
                <button
                  onClick={() => setIsfold(!isfold)}
                  className="my-4 rounded-lg bg-blue-50 p-2"
                >
                  문의하기
                </button>
              ) : (
                <div>
                  <div>
                    <form>
                      <input type="text" />
                      <input type="text" />
                    </form>
                  </div>
                  <div>
                    <button onClick={postqna}>등록하기</button>
                    <button onClick={() => setIsfold(!isfold)}>취소하기</button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
