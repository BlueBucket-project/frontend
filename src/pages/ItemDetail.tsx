import { redirect, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";
import { IBoardList, Item } from "../responseTypes";
import { QNABoard } from "../components/QNABoard";

export default function ItemDetail() {
  const { itemId } = useParams();
  if (typeof itemId == `undefined` || `null`) {
    redirect("/");
  }

  const [item, setItem] = useState<Item>();
  const [board, setBoard] = useState<IBoardList>();
  const [loading, setLoading] = useState(true);
  const [isfold, setIsfold] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const accessToken = useAppSelector((state) => state.user.accessToken);
  const email = useAppSelector((state) => state.user.memberEmail);

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
      .get(`/${itemId}/boards`, { params: { email } })
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
      })
      .catch(() => {
        alert("이미 장바구니에 있는 물건입니다.");
      });
  };

  const postqna = () => {
    const body = { title, content };
    instanceH(accessToken)
      .post(`/${itemId}/boards`, body)
      .then(() => {
        getBoardData();
        setTitle("");
        setContent("");
        setIsfold(true);
        alert("문의가 등록되었습니다.");
      });
  };

  function handleRender() {
    getBoardData();
  }

  const imgdata = item?.itemImgList || [];

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
      setFocusedImg(imgdata.length - 1);
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
                  <div className="group relative flex h-full w-full justify-between">
                    {imgdata && imgdata.length > 0 ? (
                      <img src={imgdata[focusedImg].uploadImgUrl} />
                    ) : (
                      "이미지가 없습니다."
                    )}
                    {imgdata.length > 1 && (
                      <div className="flex opacity-0 group-hover:opacity-100">
                        <button
                          className="absolute left-2 my-auto h-12 w-12 self-center rounded-full bg-blue-50 text-2xl"
                          onClick={beforeImg}
                        >
                          &lt;
                        </button>
                        <button
                          className="absolute right-2 my-auto h-12 w-12 self-center rounded-full bg-blue-50 text-2xl"
                          onClick={nextImg}
                        >
                          &gt;
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="my-4 flex">
                  {imgdata.map((item) => {
                    return (
                      <div
                        key={item.itemImgId}
                        className="mr-4 h-16 w-16 rounded bg-blue-100"
                      >
                        <img
                          className="h-full w-full"
                          src={item.uploadImgUrl}
                        />
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
                <div className="grid grid-cols-10 border-b-2 border-b-gray-600 py-4 text-center text-lg font-bold">
                  <div>답변상태</div>
                  <div className="col-span-7 col-start-2">문의 내용</div>
                  <div>작성자</div>
                  <div>작성일</div>
                </div>
                {board && board.items.length > 0 ? (
                  board.items.map((item) => {
                    return (
                      <>
                        <QNABoard
                          key={item.boardId}
                          item={item}
                          rerender={handleRender}
                        />
                      </>
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
                <div className="ml-28">
                  <form className="flex flex-col">
                    <input
                      className="mt-4 w-48 outline  outline-1 outline-offset-2"
                      placeholder="문의 제목"
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      className="mt-4 w-3/4 outline outline-1 outline-offset-2"
                      placeholder="문의 내용"
                      rows={4}
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </form>
                  <div className="mt-4">
                    <button
                      className="rounded-4 mr-4 rounded-lg bg-blue-100 p-2"
                      onClick={postqna}
                    >
                      등록하기
                    </button>
                    <button
                      className="rounded-4 rounded-lg bg-red-100 p-2"
                      onClick={() => setIsfold(!isfold)}
                    >
                      취소하기
                    </button>
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
