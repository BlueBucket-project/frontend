import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.tsx";
import ProductEditor from "../components/ProductEditor.tsx";

const sampleProduct: ProductLegacy = {
  id: 1,
  name: "아이패드",
  price: 200000,
  quantity: 3,
};

export default function ProductEdit(): ReactElement {
  const { productId } = useParams();
  const [initialProduct, setInitialProduct] =
    useState<ProductLegacy>(sampleProduct);

  useEffect(() => {
    // validate product id
    // call backend api to get product info
    // set initialProduct
  }, []);

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
