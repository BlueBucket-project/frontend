import { ReactElement, useState } from "react";
import { sampleMyInquiries } from "../sampleData/myInquiry.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function MyInquiries(): ReactElement {
  const [selectedId, setSelectedId] = useState<number>(-1);

  const getTitle = (text: string, index: number): string => {
    if (selectedId === index) {
      return text;
    }
    return text.length > 30 ? text.slice(0, 30) + " ..." : text;
  };
  return (
    <div className="max-w-5xl">
      <div className="border-b pb-2 pl-4 text-3xl">나의 문의</div>
      <div className="grid grid-cols-8 border-b border-t py-4 text-center">
        <div className="col-span-1">상품</div>
        <div className="col-span-1">답변상태</div>
        <div className="col-span-5">제목</div>
        <div className="col-span-1">작성일</div>
      </div>
      {sampleMyInquiries.map((inquiry, index) => (
        <div
          className={`flex flex-col ${
            selectedId === index ? "bg-gray-100" : ""
          }`}
          key={`inquiry_${index}`}
          onClick={() =>
            selectedId !== index ? setSelectedId(index) : setSelectedId(-1)
          }
        >
          <div className="grid grid-cols-8 items-center border-b py-2">
            <img
              className="col-span-1 h-20 w-20 place-self-center"
              src={inquiry.thumbnailUrl}
              alt={`thumbnail_${index}`}
            />
            <div className="col-span-1 text-center">
              {inquiry.answer ? "답변완료" : "미답변"}
            </div>
            <div className="col-span-5 whitespace-pre-line break-all">
              {getTitle(inquiry.title, index)}
            </div>
            <div className="col-span-1 place-self-center">{inquiry.date}</div>
          </div>
          {inquiry.answer && (
            <div hidden={index !== selectedId}>
              <div className="grid grid-cols-8">
                <div className="col-start-3 col-end-8 my-4 flex">
                  <FontAwesomeIcon
                    className="mr-4 mt-1"
                    icon={faChevronRight}
                  />
                  <div className="whitespace-pre-line break-all">
                    {inquiry.answer}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
