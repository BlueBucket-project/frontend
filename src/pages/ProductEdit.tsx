import { ReactElement } from "react";
import { useParams } from "react-router-dom";

export default function ProductEdit(): ReactElement {
  const { productId } = useParams();

  return <div>ProductEdit {productId}</div>;
}
