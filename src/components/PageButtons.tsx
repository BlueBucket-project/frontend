import { ReactElement } from "react";

const ellipsis = "...";
export default function PageButtons({
  page,
  totalPage,
  setPage,
}: {
  page: number;
  totalPage: number;
  setPage: (i: number) => void;
}): ReactElement {
  const pageList = getPageList(page, totalPage);
  const nowPage = page.toString();
  return (
    <div className="mx-auto mt-10 flex justify-center text-center">
      {pageList.map((i, index) => (
        <div
          key={`page_${index}`}
          className={`h-10 w-10 rounded border border-b leading-10 ${
            i === nowPage ? "bg-blue-400" : ""
          } ${i !== ellipsis ? "hover:cursor-pointer" : ""}`}
          onClick={() => {
            const nextPage = parseInt(i, 10) || 0;
            if (nextPage > 0) {
              setPage(nextPage);
            }
          }}
        >
          {i}
        </div>
      ))}
    </div>
  );
}

const getPageList = (now: number, total: number): string[] => {
  if (total === 1) {
    return ["1"];
  }
  const ret: string[] = [];
  if (now <= 4) {
    ret.push(...Array.from({ length: now }, (_, i) => (i + 1).toString()));
  } else {
    ret.push("1", ellipsis);
    ret.push(...Array.from({ length: 3 }, (_, i) => (i + now - 2).toString()));
  }

  if (now >= total - 3) {
    ret.push(
      ...Array.from({ length: total - now + 1 }, (_, i) =>
        (i + now + 1).toString(),
      ),
    );
  } else {
    ret.push(
      (now + 1).toString(),
      (now + 2).toString(),
      ellipsis,
      total.toString(),
    );
  }
  return ret;
};
