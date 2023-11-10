import { useNavigate } from "react-router-dom";
import { Item } from "../responseTypes";

interface ItemProps {
  item: Item;
}

function Card({ item }: ItemProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/item/${item.itemId}`, { state: { item } });
  };

  return (
    <button onClick={onClick}>
      <div className="h-64 w-64 rounded-2xl bg-gray-100">
        <img
          className="h-full w-full"
          src={item.itemImgList![0].uploadImgUrl}
        />
      </div>
      <div className="mt-2 text-lg font-bold">{item.itemName}</div>
      <div className="text-slate-400">{item.sellPlace}</div>
      <div className="font-semibold text-orange-400">{item.price}</div>
    </button>
  );
}

export default Card;
