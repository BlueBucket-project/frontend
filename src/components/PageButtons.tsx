import { ReactElement } from "react";

export default function PageButtons({
  page,
  totalPage,
  onClickPage,
}: {
  page: number;
  totalPage: number;
  onClickPage: (i: number) => void;
}): ReactElement {
  const arr = Array.from(Array(totalPage));
  return (
    <div className="mx-auto mt-10 flex justify-center text-center">
      {arr.map((_, i) => (
        <div
          key={`page_${i}`}
          className={`h-10 w-10 rounded border border-b leading-10 hover:cursor-pointer ${
            i === page ? "bg-blue-400" : ""
          }`}
          onClick={() => onClickPage(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
