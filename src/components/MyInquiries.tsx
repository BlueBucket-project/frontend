import { ReactElement, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks.ts";
import PageButtons from "./PageButtons.tsx";
import Popup from "reactjs-popup";

const overlayStyle = { background: "rgba(0,0,0,0.5)" };

export default function MyInquiries(): ReactElement {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiryIndex, setSelectedInquiryIndex] = useState<number>(-1);
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [editModalOpened, setEditModalOpened] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const refreshInquiries = () => {
    instanceH(accessToken)
      .get(`/users/myboards?page=${page}`)
      .then((res) => {
        const inquiriesResponse: InquiriesResponse = res.data;
        setTotalPage(inquiriesResponse.totalPage);
        setPage(inquiriesResponse.nowPageNumber);
        setInquiries(inquiriesResponse.items);
      });
  };

  const editInquiry = () => {
    const itemId = inquiries[targetIndex].itemId;
    const boardId = inquiries[targetIndex].boardId;
    instanceH(accessToken)
      .put(`/${itemId}/boards/${boardId}`, {
        title: editTitle,
        content: editContent,
      })
      .then(() => refreshInquiries());
    setEditModalOpened(false);
  };

  const deleteInquiry = () => {
    const itemId = inquiries[targetIndex].itemId;
    const boardId = inquiries[targetIndex].boardId;
    instanceH(accessToken)
      .delete(`/${itemId}/boards/${boardId}`)
      .then(() => refreshInquiries());
    setDeleteModalOpened(false);
  };

  useEffect(() => {
    refreshInquiries();
  }, [page]);

  return (
    <div className="max-w-5xl">
      <div className="border-b-2 border-black pb-2 pl-4 text-3xl">
        나의 문의
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
                if (selectedInquiryIndex === index) {
                  setSelectedInquiryIndex(-1);
                  return;
                }
                setSelectedInquiryIndex(index);
              }}
            >
              <div className="flex w-full">
                <div className="grow">
                  <div className="font-bold text-blue-600">{inquiry.title}</div>
                  {getContent(inquiry.content, index === selectedInquiryIndex)}
                </div>
                <div
                  className={`flex items-center ${
                    selectedInquiryIndex !== index ? "hidden" : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="z-50 h-4 w-4 self-center pr-1 text-green-500 hover:cursor-pointer"
                    onClick={() => {
                      setEditModalOpened(true);
                      setTargetIndex(index);
                      setEditTitle(inquiry.title);
                      setEditContent(inquiry.content);
                    }}
                  />
                  <FontAwesomeIcon
                    className="h-4 w-4 self-center text-red-600 hover:cursor-pointer"
                    onClick={() => {
                      setDeleteModalOpened(true);
                      setTargetIndex(index);
                    }}
                    icon={faCircleXmark}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 text-center" onClick={() => {}}>
              {inquiry.nickName}
            </div>
            <div className="col-span-1 text-center">
              {inquiry.regTime.split("T")[0]}
            </div>
          </div>
          <div hidden={selectedInquiryIndex !== index}>
            <div className="grid max-w-5xl grid-cols-7 border-b border-gray-400">
              {inquiry.commentDTOList.length > 0 && (
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
                      <div className="grow">{c.comment}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <PageButtons page={page} totalPage={totalPage} setPage={setPage} />
      <Popup
        open={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        modal
        {...{ overlayStyle }}
      >
        <div className="flex h-64 w-96 flex-col items-center gap-4 rounded bg-white px-8 py-8">
          <div className="flex w-full gap-4">
            <div>제목</div>
            <input
              className="w-5/6 outline outline-1 outline-offset-2"
              placeholder="문의 제목"
              type="text"
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div className="flex w-full gap-4">
            <div>내용</div>
            <textarea
              className="w-5/6 outline outline-1 outline-offset-2"
              placeholder="문의 내용"
              rows={4}
              id="content"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>

          <div className="flex w-full justify-end gap-2 pr-1">
            <button
              className="rounded-4 rounded-lg bg-red-100 p-2"
              onClick={() => setEditModalOpened(false)}
            >
              취소하기
            </button>
            <button
              className="rounded-4 rounded-lg bg-blue-100 p-2"
              onClick={() => editInquiry()}
            >
              수정하기
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        open={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        modal
        {...{ overlayStyle }}
      >
        <div className="flex w-96 flex-col items-center rounded bg-white">
          <div className="my-10">{targetIndex}번 문의를 삭제하시겠습니까?</div>
          <div className="mb-5 mr-5 flex gap-2 self-end">
            <button
              className="rounded-4 rounded-lg bg-gray-200 p-2"
              onClick={() => setDeleteModalOpened(false)}
            >
              취소하기
            </button>
            <button
              className="rounded-4 rounded-lg bg-red-200 p-2"
              onClick={() => deleteInquiry()}
            >
              삭제하기
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

const getContent = (title: string, isSelected: boolean): string => {
  if (isSelected) {
    return title;
  }
  return title.length > 30 ? title.slice(0, 30) + " ..." : title;
};
