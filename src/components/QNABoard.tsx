import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks";
import { IBoardItem } from "../responseTypes";
import { useState } from "react";
import { faArrowRight, faLock } from "@fortawesome/free-solid-svg-icons";

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
    <div className="max-w-5xl">
      <div
        key={item.boardId}
        onClick={() => setSeeReply(!seeReply)}
        className="block grid  grid-cols-10 items-center border-b border-b-gray-400 py-4 text-center hover:cursor-pointer"
      >
        <div>{item.replyStatus === "REPLY_O" ? "답변완료" : "미답변"}</div>
        <div className="col-span-7 col-start-2 flex items-center text-ellipsis text-left">
          {item.boardSecret === "LOCK" ? (
            <>
              <FontAwesomeIcon icon={faLock} className="h-6 w-6" />
              잠긴 문의글입니다.
            </>
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
            <div className="ml-4 w-48">
              <div>
                {item.replyStatus === "REPLY_O" ? null : (
                  <button
                    onClick={() => {
                      setContent(item.content);
                      setIsEditing(true);
                    }}
                    className="mr-4 border bg-yellow-100 px-2 py-1 text-sm"
                  >
                    수정
                  </button>
                )}
                <button
                  className="border bg-red-100 px-2 py-1 text-sm"
                  onClick={boardDelete}
                >
                  삭제
                </button>
              </div>
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
          <div>
            <FontAwesomeIcon icon={faArrowRight} />
            답변
          </div>
          <div className="col-span-7 col-start-2 text-left">
            {item.commentDTOList[0].comment}
          </div>
          <div></div>
          <div>{item.commentDTOList[0].writeTime.slice(0, 10)}</div>
        </div>
      ) : null}
    </div>
  );
}
