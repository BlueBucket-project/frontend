import { ReactElement, useEffect, useState } from "react";
import Header from "../components/Header.tsx";
import {
  faChevronRight,
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { instanceH } from "../api";
import PageButtons from "../components/PageButtons.tsx";
import { useAppSelector } from "../app/hooks.ts";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router";

export default function InquiryList(): ReactElement {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiryIndex, setSelectedInquiryIndex] = useState<number>(-1);
  const [commentsText, setCommentsText] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>("");
  const [clickedNickname, setClickedNickname] = useState<string>("");
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const navigate = useNavigate();

  const refreshInquiries = (nextPage: number = 1, nickname: string = "") => {
    var api = "/admins/boards";
    if (nickname.length > 0) {
      api += `/${nickname}`;
    }
    instanceH(accessToken)
      .get(`${api}?page=${nextPage}`)
      .then((res) => {
        console.log(res);
        const inquiriesResponse: InquiriesResponse = res.data;
        setTotalPage(inquiriesResponse.totalPage);
        setInquiries(inquiriesResponse.items);
        setCommentsText(
          Array.from({ length: inquiriesResponse.items.length }, () => ""),
        );
      });
  };

  useEffect(() => {
    refreshInquiries(page, clickedNickname);
  }, [page, clickedNickname]);

  const postComment = (itemId: number, boardId: number) => {
    instanceH(accessToken)
      .post(`/${itemId}/boards/${boardId}/comments`, {
        comment: commentsText[selectedInquiryIndex],
      })
      .then(() => {
        setClickedNickname("");
        if (page !== 1) {
          setPage(1);
          return;
        }
        refreshInquiries();
      });
  };

  const editComment = (itemId: number, boardId: number, commentId: number) => {
    instanceH(accessToken)
      .put(`/${itemId}/boards/${boardId}/comments/${commentId}`, {
        comment: editText,
      })
      .then(() => {
        setClickedNickname("");
        setIsEdit(false);
        if (page !== 1) {
          setPage(1);
          return;
        }
        refreshInquiries();
      });
  };

  const deleteComment = (
    itemId: number,
    boardId: number,
    commentId: number,
  ) => {
    instanceH(accessToken)
      .delete(`/${itemId}/boards/${boardId}/comments/${commentId}`)
      .then(() => {
        setClickedNickname("");
        if (page !== 1) {
          setPage(1);
          return;
        }
        refreshInquiries();
      });
  };

  return (
    <>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="flex items-end border-b-2 border-black pb-2 text-3xl">
          <div>상품 문의</div>
          <div
            className={`ml-5 text-lg text-gray-400 ${
              clickedNickname.length <= 0 ? "hidden" : ""
            }`}
          >
            "{clickedNickname}"님이 작성한 글입니다.
          </div>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={`mt-2 h-3 w-3 self-start text-red-600 hover:cursor-pointer ${
              clickedNickname.length <= 0 ? "hidden" : ""
            }`}
            onClick={() => setClickedNickname("")}
          />
        </div>
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
                  setIsEdit(false);
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

              <Popup
                trigger={
                  <div className="relative col-span-1 flex text-center">
                    <div>{inquiry.nickName}</div>
                  </div>
                }
                position="right center"
                on={["hover", "focus"]}
                arrow={true}
              >
                <div className="flex w-24 flex-col items-center border border-black bg-white">
                  <div
                    onClick={() => {
                      setPage(1);
                      setClickedNickname(inquiry.nickName);
                    }}
                    className="hover:cursor-pointer"
                  >
                    문의 검색
                  </div>
                </div>
              </Popup>

              <div className="col-span-1 text-center">
                {inquiry.regTime.split("T")[0]}
              </div>
            </div>
            <div hidden={selectedInquiryIndex !== index}>
              <div className="grid max-w-5xl grid-cols-7 border-b border-gray-400">
                {inquiry.commentDTOList.length > 0 ? (
                  <div className="col-start-2 col-end-6 flex flex-col gap-2">
                    {inquiry.commentDTOList.map((c: Comment) => (
                      <div
                        className="flex whitespace-pre-line break-all border-b border-gray-300 py-2"
                        key={`comment_${c.commentId}`}
                      >
                        <FontAwesomeIcon
                          className="mr-4 mt-1"
                          icon={faChevronRight}
                        />
                        {isEdit ? (
                          <div className="flex w-full flex-col gap-2">
                            <textarea
                              name={`edit_${c.commentId}`}
                              id={`edit_${c.commentId}`}
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              cols={60}
                              rows={5}
                              className="border border-gray-800 px-2 py-2"
                            />
                            <div className="flex gap-2 self-end">
                              <button
                                className="w-24 self-end rounded bg-red-300"
                                onClick={() => setIsEdit(false)}
                              >
                                취소하기
                              </button>
                              <button
                                className="w-24 self-end rounded bg-blue-300"
                                onClick={() =>
                                  editComment(
                                    inquiry.itemId,
                                    inquiry.boardId,
                                    c.commentId,
                                  )
                                }
                              >
                                수정하기
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex w-full">
                            <div className="grow">{c.comment}</div>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="h-4 w-4 self-center pr-1 text-green-500 hover:cursor-pointer"
                              onClick={() => {
                                setEditText(c.comment);
                                setIsEdit(true);
                              }}
                            />
                            <FontAwesomeIcon
                              className="h-4 w-4 self-center text-red-600 hover:cursor-pointer"
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
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="col-start-2 col-end-6 flex flex-col gap-2 py-2">
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
        <PageButtons page={page} totalPage={totalPage} setPage={setPage} />
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
