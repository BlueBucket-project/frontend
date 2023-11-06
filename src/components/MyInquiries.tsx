import { ReactElement, useState } from "react";
import { sampleMyInquiries } from "../sampleData/myInquiry.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function MyInquiries(): ReactElement {
  const [selectedId, setSelectedId] = useState<number>(-1);
  return (
    <div>
      <div className="border-b pb-2 pl-4 text-3xl">나의 문의</div>
      {sampleMyInquiries.map((inquiry, index) => (
        <div
          className={`flex items-center border-b py-2 ${
            selectedId === index ? "bg-gray-100" : ""
          }`}
          key={`inquiry_${index}`}
          onClick={() =>
            selectedId !== index ? setSelectedId(index) : setSelectedId(-1)
          }
        >
          <div className="mx-5">{index + 1}</div>
          <img
            className="mr-4 h-20 w-20"
            src={inquiry.thumbnailUrl}
            alt={`thumbnail_${index}`}
          />
          <div className="flex flex-col">
            <div>{inquiry.inquiry}</div>
            <div hidden={index !== selectedId} className="ml-5 mt-2">
              <FontAwesomeIcon className="mr-3" icon={faChevronRight} />
              {inquiry.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
