import { ReactElement, useState } from "react";
import Header from "../components/Header.tsx";
import { sampleMyInquiries } from "../sampleData/myInquiry.ts";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InquiryList(): ReactElement {
  const [filterUnanswered, setFilterUnanswered] = useState<boolean>(false);
  const [selectedInquiryIndex, setSelectedInquiryIndex] = useState<number>(-1);
  return (
    <>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="flex max-w-5xl items-end justify-between border-b-2 border-black pb-2 text-3xl">
          <div>상품 문의</div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={filterUnanswered}
              onChange={() => setFilterUnanswered(!filterUnanswered)}
            />
            <div className="text-base">답변 미완료만 보기</div>
          </div>
        </div>
        <div className="grid grid-cols-8 border-b border-black text-center">
          <div className="col-span-1">답변상태</div>
          <div className="col-span-1">상품</div>
          <div className="col-span-4">제목</div>
          <div className="col-span-1">작성자</div>
          <div className="col-span-1">작성일</div>
        </div>
        {sampleMyInquiries.map((inquiry, index) => (
          <div
            key={`inquiry_${index}`}
            className={`${selectedInquiryIndex === index ? "bg-gray-100" : ""}`}
          >
            <div className="grid max-w-5xl grid-cols-8 place-items-center border-b border-gray-400 py-2">
              <div className="col-span-1">
                {inquiry.answer ? "답변완료" : "미답변"}
              </div>
              <img
                src={inquiry.thumbnailUrl}
                alt={`thumbnail_${index}`}
                className="col-span-1 h-20 w-20"
              />
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
                <div className="font-bold text-blue-600">상품명</div>
                <div>
                  {getTitle(inquiry.title, index === selectedInquiryIndex)}
                </div>
              </div>
              <div
                className="col-span-1 text-center"
                onClick={() => console.log("HI")}
              >{`작성자${index + 1}`}</div>
              <div className="col-span-1 text-center">{inquiry.date}</div>
            </div>
            <div hidden={selectedInquiryIndex !== index}>
              {renderAnswerArea(inquiry.answer)}
            </div>
          </div>
        ))}
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

const renderAnswerArea = (answer: string): ReactElement => {
  return (
    <div className="grid max-w-5xl grid-cols-8 border-b border-gray-400 py-2">
      {answer === "" ? (
        <div className="col-start-3 col-end-7 flex flex-col gap-2">
          <textarea
            name="answer_area"
            id="answer_area"
            placeholder="답변 입력"
            cols={60}
            rows={5}
            className="border border-gray-800 px-2 py-2"
          />
          <button className="w-32 self-end rounded bg-blue-300">
            답변하기
          </button>
        </div>
      ) : (
        <div className="col-start-3 col-end-7 flex whitespace-pre-line break-all">
          <FontAwesomeIcon className="mr-4 mt-1" icon={faChevronRight} />
          <div>{answer}</div>
        </div>
      )}
    </div>
  );
};
