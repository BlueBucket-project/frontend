import { Link } from "react-router-dom";
import { Item } from "../responseTypes";

interface ItemProps {
  item: Item;
}

function Card({ item }: ItemProps) {
  return (
    <Link to={`/item/${item.itemId}`}>
      <div className="h-64 w-64 rounded-2xl bg-gray-100">
        {item.itemImgList && item.itemImgList.length > 0 ? (
          <img
            className="h-full w-full"
            src={item.itemImgList[0].uploadImgUrl}
          />
        ) : (
          <div>이미지가 없습니다</div>
        )}
      </div>
      <div className="mt-2 text-lg font-bold">{item.itemName}</div>
      <div className="text-slate-400">{item.sellPlace}</div>
      <div className="font-semibold text-orange-400">{item.price}</div>
    </Link>
  );
}

export default Card;
