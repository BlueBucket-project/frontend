import Header from "../components/Header";

export default function Cart() {
  return (
    <>
      <Header />
      <div className="mx-auto mt-4 min-w-max max-w-5xl ">
        <div className="mt-8 w-full border-b-2 pb-4">
          <select className="w-24 border">
            <option>장바구니</option>
            <option>예약중</option>
          </select>
        </div>
        <div className="">
          <div className="flex h-40 w-full items-center justify-between border-b py-8">
            <div>
              <input type="checkbox"></input>
            </div>
            <div className="h-28 w-28 rounded-lg bg-blue-100 ">이미지</div>
            <div className="flex-col justify-between ">
              <div className="mb-4 w-96">
                매우 긴 상품이름의 칸을 나타내기 위하여 작성된 길이 여기서 더
                길어지면 아래로 내려감
              </div>
              <div>10,000원</div>
            </div>
            <div>개수 선택</div>
            <div>최종 가격</div>
            <div className="flex flex-col items-end">
              <button className="mb-4">X</button>
              <button>선택구매예약</button>
            </div>
          </div>
          <div className="flex h-40 w-full items-center justify-between border-b py-8">
            <div>
              <input type="checkbox"></input>
            </div>
            <div className="h-28 w-28 rounded-lg bg-blue-100 ">이미지</div>
            <div className="flex-col justify-between ">
              <div className="mb-4 w-96">
                매우 긴 상품이름의 칸을 나타내기 위하여 작성된 길이 여기서 더
                길어지면 아래로 내려감
              </div>
              <div>10,000원</div>
            </div>
            <div>개수 선택</div>
            <div>최종 가격</div>
            <div className="flex flex-col items-end">
              <button className="mb-4">X</button>
              <button>선택구매예약</button>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full">
          <button className="mx-auto block rounded-lg border bg-blue-100 p-4">
            전체구매예약
          </button>
        </div>
      </div>
    </>
  );
}

// 개수선택은 아이템 디테일 참고
// 최종가격은 개수 선택 후 계산하여 집계
