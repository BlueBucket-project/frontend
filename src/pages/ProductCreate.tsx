import { ReactElement } from "react";
import Header from "../components/Header.tsx";
import ProductEditor from "../components/ProductEditor.tsx";

export default function ProductCreate(): ReactElement {
  return (
    <div>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="border-b pb-2 text-3xl">상품 관리</div>
        <ProductEditor isCreate={true} />
      </div>
    </div>
  );
}
