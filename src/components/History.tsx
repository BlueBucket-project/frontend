import { ReactElement, useState } from "react";
import { History, SampleHistory } from "../sampleData/history.ts";

export default function History(): ReactElement {
  const [histories, _] = useState<History[]>(SampleHistory);

  return (
    <div>
      <div className="border-b pb-2 pl-4 text-3xl">구매 이력</div>
      <div className="grid grid-cols-2">
        {histories.map((h: History, i: number) => (
          <div
            key={`history_${i}`}
            className="m-4 flex rounded-xl bg-gray-100 p-5"
          >
            <img
              className="mr-6 h-24 w-24"
              src={h.thumbnailUrl}
              alt={i.toString()}
            />
            <div className="flex flex-col">
              <div className="text-sm text-gray-500">{h.date} 구매</div>
              <div className="text-lg">{h.name}</div>
              <div className="text-lg font-bold">
                {(h.price * h.quantity).toLocaleString()}원
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
