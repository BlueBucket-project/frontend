import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.tsx";
import ProductEditor from "../components/ProductEditor.tsx";
import { instance } from "../api";
import { emptyProduct } from "./emptyProduct.ts";

export default function ProductEdit(): ReactElement {
  const { productId } = useParams();
  const [initialProduct, setInitialProduct] = useState<Product>(emptyProduct);

  useEffect(() => {
    //TODO: validate product id
    fetchData();
  }, []);

  const fetchData = async () => {
    await instance
      .get(`/items/${productId}`)
      .then((res) => setInitialProduct(res.data));
  };

  return (
    <div>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="border-b pb-2 text-3xl">상품 관리</div>
        <ProductEditor initialProduct={initialProduct} />
      </div>
    </div>
  );
}
