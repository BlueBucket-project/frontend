import Header from "../components/Header";

export default function ItemDetail() {
  return (
    <div>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="h-2xl mx-auto my-4 w-full rounded bg-sky-200 ">
          이미지 영역
        </div>
        <div className="w-full shadow-sm"></div>
        <div className="w-full ">// 아이디 등 기타 데이터</div>
      </div>
    </div>
  );
}
