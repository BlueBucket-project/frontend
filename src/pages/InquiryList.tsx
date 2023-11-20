import { ReactElement, useEffect, useState } from "react";
import Header from "../components/Header.tsx";
import {
  faChevronRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { instanceH } from "../api";
import PageButtons from "../components/PageButtons.tsx";
import { useAppSelector } from "../app/hooks.ts";

export default function InquiryList(): ReactElement {
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiryIndex, setSelectedInquiryIndex] = useState<number>(-1);
  const [commentsText, setCommentsText] = useState<string[]>([]);
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const refreshInquiries = () => {
    instanceH(accessToken)
      .get("/admins/boards")
      .then((res) => {
        const inquiriesResponse: InquiriesResponse = res.data;
        setTotalPage(inquiriesResponse.totalPage);
        setPage(inquiriesResponse.nowPageNumber);
        setInquiries(inquiriesResponse.items);
        setCommentsText(
          Array.from({ length: inquiriesResponse.items.length }, () => ""),
        );
        console.log(inquiriesResponse);
      });
  };

  useEffect(() => {
    refreshInquiries();
  }, [page]);

  const postComment = (itemId: number, boardId: number) => {
    instanceH(accessToken)
      .post(`/${itemId}/boards/${boardId}/comments`, {
        comment: commentsText[selectedInquiryIndex],
      })
      .then(() => refreshInquiries());
  };

  const deleteComment = (
    itemId: number,
    boardId: number,
    commentId: number,
  ) => {
    instanceH(accessToken)
      .delete(`/${itemId}/boards/${boardId}/comments/${commentId}`)
      .then(() => refreshInquiries());
  };

  return (
    <>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="border-b-2 border-black pb-2 text-3xl">상품 문의</div>
        <div className="grid h-10 grid-cols-7 border-b border-black text-center leading-10">
          <div className="col-span-1">답변상태</div>
          <div className="col-span-4">제목</div>
          <div className="col-span-1">작성자</div>
          <div className="col-span-1">작성일</div>
        </div>
        {inquiries.map((inquiry, index) => (
          <div
            key={`inquiry_${index}`}
            className={`${selectedInquiryIndex === index ? "bg-gray-100" : ""}`}
          >
            <div className="grid max-w-5xl grid-cols-7 place-items-center border-b border-gray-400 py-2">
              <div className="col-span-1">
                {inquiry.commentDTOList.length > 0 ? "답변완료" : "미답변"}
              </div>
              <div
                className="col-span-4 flex flex-col gap-2 place-self-start self-center justify-self-stretch whitespace-pre-line break-all"
                onClick={() => {
                  if (selectedInquiryIndex === index) {
                    setSelectedInquiryIndex(-1);
                    return;
                  }
                  setSelectedInquiryIndex(index);
                }}
              >
                <div className="font-bold text-blue-600">{inquiry.title}</div>
                <div>
                  {getTitle(inquiry.content, index === selectedInquiryIndex)}
                </div>
              </div>
              <div
                className="col-span-1 text-center"
                onClick={() => console.log("nickname clicked")}
              >
                {inquiry.nickName}
              </div>
              <div className="col-span-1 text-center">
                {inquiry.regTime.split("T")[0]}
              </div>
            </div>
            <div hidden={selectedInquiryIndex !== index}>
              <div className="grid max-w-5xl grid-cols-7 border-b border-gray-400 py-2">
                {inquiry.commentDTOList.length > 0 ? (
                  <div className="col-start-2 col-end-6 flex flex-col gap-2">
                    {inquiry.commentDTOList.map((c: Comment) => (
                      <div
                        className="flex whitespace-pre-line break-all border-b border-gray-300 pb-2"
                        key={`comment_${c.commentId}`}
                      >
                        <FontAwesomeIcon
                          className="mr-4 mt-1"
                          icon={faChevronRight}
                        />
                        <div className="grow">{c.comment}</div>
                        <FontAwesomeIcon
                          className="h-4 w-4 text-red-600 hover:cursor-pointer"
                          onClick={() =>
                            deleteComment(
                              inquiry.itemId,
                              inquiry.boardId,
                              c.commentId,
                            )
                          }
                          icon={faCircleXmark}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="col-start-2 col-end-6 flex flex-col gap-2">
                    <textarea
                      name={`answer_area_${index}`}
                      value={commentsText[index]}
                      onChange={(e) =>
                        setCommentsText(
                          commentsText.map((s, i) => {
                            return i === index ? e.target.value : s;
                          }),
                        )
                      }
                      id={`answer_area_${index}`}
                      placeholder="답변 입력"
                      cols={60}
                      rows={5}
                      className="border border-gray-800 px-2 py-2"
                    />
                    <button
                      className="w-32 self-end rounded bg-blue-300"
                      onClick={() =>
                        postComment(inquiry.itemId, inquiry.boardId)
                      }
                    >
                      답변하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <PageButtons page={page} totalPage={totalPage} onClickPage={setPage} />
      </div>
    </>
  );
}

const getTitle = (title: string, isSelected: boolean): string => {
  if (isSelected) {
    return title;
  }
  return title.length > 30 ? title.slice(0, 30) + " ..." : title;
};
