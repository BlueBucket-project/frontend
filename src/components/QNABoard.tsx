import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";
import { IBoardItem } from "../responseTypes";
import { useState } from "react";

type BoardProps = {
  item: IBoardItem;
  rerender: () => void;
};

export function QNABoard({ item, rerender }: BoardProps) {
  const [seeReply, setSeeReply] = useState(false);
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const boardDelete = () => {
    instanceH(accessToken)
      .delete(`/${item.itemId}/boards/${item.boardId}`)
      .then(() => rerender());
  };

  const boardEdit = () => {
    instanceH(accessToken)
      .put(`/${item.itemId}/boards/${item.boardId}`, {
        title: item.title,
        content,
      })
      .then(() => {
        rerender();
        setIsEditing(false);
      });
  };

  return (
    <div>
      <div
        key={item.boardId}
        onClick={() => setSeeReply(!seeReply)}
        className="block grid  grid-cols-10 border-b border-b-gray-400 py-4 text-center hover:cursor-pointer"
      >
        <div>{item.replyStatus === "REPLY_O" ? "답변완료" : "미답변"}</div>
        <div className="col-span-7 col-start-2 flex text-left">
          {item.boardSecret === "LOCK" ? (
            "잠긴 문의글입니다."
          ) : isEditing ? (
            <div className="w-full">
              <input
                className="w-3/4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button onClick={boardEdit} className="bg-yellow-100 p-2">
                수정완료
              </button>
            </div>
          ) : (
            item.content
          )}
          {item.boardSecret === "LOCK" || isEditing ? null : (
            <div className="ml-4">
              {item.replyStatus === "REPLY_O" ? null : (
                <button
                  onClick={() => {
                    setContent(item.content);
                    setIsEditing(true);
                  }}
                  className="bg-yellow-100 p-2"
                >
                  수정하기
                </button>
              )}
              <button className="bg-red-100 p-2" onClick={boardDelete}>
                삭제하기
              </button>
            </div>
          )}
        </div>
        <div>{item.nickName.replace(/(?<=.{2})./gi, "*")}</div>
        <div>{item.regTime.slice(0, 10)}</div>
      </div>
      {seeReply && item.commentDTOList.length > 0 ? (
        <div
          onClick={() => setSeeReply(!seeReply)}
          className="block grid  grid-cols-10 border-b border-b-gray-400 bg-blue-50 py-4 text-center hover:cursor-pointer"
        >
          <div>답변</div>
          <div className="col-span-7 col-start-2 text-left">
            {item.commentDTOList[0].comment}
          </div>
          <div>관리자id?</div>
          <div>{item.commentDTOList[0].writeTime.slice(0, 10)}</div>
        </div>
      ) : null}
    </div>
  );
}
