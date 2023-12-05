import { ReactElement } from "react";

export default function PageButtons2({
  page,
  totalPage,
  setPage,
}: {
  page: number;
  totalPage: number;
  setPage: (i: number) => void;
}): ReactElement {
  const pageList = getPageList(page, totalPage);
  const handlePage1 = (set: string) => {
    if (set === "prev") {
      if (page <= 5) {
        setPage(1);
      } else {
        setPage(Math.floor((page - 1) / 5) * 5);
      }
    } else {
      if (totalPage - page < 5) {
        setPage(totalPage);
      } else {
        setPage(Math.floor((page - 1) / 5) + 6);
      }
    }
  };
  const handlePage2 = (set: number) => {
    setPage(set);
  };
  return (
    <div className="mx-auto mt-10 flex justify-center text-center">
      {page > 5 ? (
        <>
          <div
            className="h-10 w-10 rounded border border-b leading-10"
            onClick={() => handlePage2(1)}
          >
            1
          </div>
          <div
            className="h-10 w-10 rounded border border-b leading-10"
            onClick={() => handlePage1("prev")}
          >
            &lt;
          </div>
        </>
      ) : (
        <div></div>
      )}
      {pageList.map((i) => (
        <div
          key={i}
          className={`h-10 w-10 rounded border border-b leading-10 ${
            i === page.toString() ? "bg-blue-400" : ""
          } `}
          onClick={() => handlePage2(parseInt(i))}
        >
          {i}
        </div>
      ))}
      {Math.floor(totalPage / 5) > Math.floor((page - 1) / 5) ? (
        <>
          <div
            className="h-10 w-10 rounded border border-b leading-10"
            onClick={() => handlePage1("next")}
          >
            &gt;
          </div>
          <div
            className="h-10 w-10 rounded border border-b leading-10"
            onClick={() => handlePage2(totalPage)}
          >
            {totalPage}
          </div>
        </>
      ) : null}
    </div>
  );
}

const getPageList = (now: number, total: number): string[] => {
  const ret: string[] = [];
  if (total <= 5)
    ret.push(...Array.from({ length: total }, (_, i) => (i + 1).toString()));
  if (total > 6) {
    const nlag = Math.floor((now - 1) / 5);
    const tlag = Math.floor((total - 1) / 5);
    if (nlag < 1) {
      ret.push(...Array.from({ length: 5 }, (_, i) => (i + 1).toString()));
    } else if (nlag == tlag) {
      ret.push(
        ...Array.from({ length: total - nlag * 5 }, (_, i) =>
          (i + nlag * 5 + 1).toString(),
        ),
      );
    } else if (nlag < tlag) {
      ret.push(
        ...Array.from({ length: 5 }, (_, i) => (i + nlag * 5 + 1).toString()),
      );
    }
  }
  return ret;
};
