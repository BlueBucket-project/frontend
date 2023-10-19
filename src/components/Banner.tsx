function Banner() {
  return (
    <div className=" my-4 h-72 w-full bg-blue-100">
      <div className="relative mx-auto h-full max-w-5xl">
        <div className="h-full w-full bg-gray-100">배너 이미지 영역</div>
        <div className="absolute bottom-10 right-4 flex h-12 w-24 rounded-full bg-teal-100">
          <button className="block h-12 w-12 text-2xl">&lt;</button>
          <button className="block h-12 w-12 text-2xl">&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
