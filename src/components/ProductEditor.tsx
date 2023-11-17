import { ReactElement, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const emptyProduct: ProductLegacy = {
  name: "",
  price: 0,
  quantity: 0,
};
export default function ProductEditor({
  isCreate,
  initialProduct,
}: {
  isCreate?: boolean;
  initialProduct?: ProductLegacy;
}): ReactElement {
  console.log(initialProduct || emptyProduct);
  const [product, setProduct] = useState<ProductLegacy>(
    initialProduct || emptyProduct,
  );
  const [images, setImages] = useState<any[]>([]);

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (reader.result) {
          setImages([...images, reader.result]);
          resolve();
        }
      };
    });
  };

  return (
    <>
      <div className="flex h-screen flex-col">
        {!isCreate && (
          <div className="flex border-b py-2">
            <div className="w-28">ID</div>
            <div>{product.id}</div>
          </div>
        )}
        <div className="flex border-b py-2">
          <div className="w-28">상품명</div>
          <input
            type="text"
            placeholder="상품명"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-1/3 border bg-gray-50 pl-2"
          />
        </div>
        <div className="flex border-b py-2">
          <div className="w-28">가격</div>
          <input
            type="text"
            value={product.price.toLocaleString()}
            onChange={(e) =>
              setProduct({
                ...product,
                price: Number(e.target.value.replaceAll(",", "")) || 0,
              })
            }
            className="mr-2 w-32 border bg-gray-50 text-right"
          />
          <div>원</div>
        </div>
        <div className="flex border-b py-2">
          <div className="w-28">수량</div>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: Number(e.target.value) || 0 })
            }
            className="mr-2 w-20 border bg-gray-50 text-right"
          />
          <div>개</div>
        </div>
        <div className="flex border-b py-2">
          <div className="w-28">상품 설명</div>
          <textarea
            placeholder="상품설명"
            rows={4}
            className="w-1/2 border bg-gray-50 pl-2"
          />
        </div>
        <div className="flex border-b py-2">
          <div className="w-28">상품 사진</div>
          <div className="flex gap-2">
            {images.map((imagePath, index) => (
              <img
                key={`image_${index}`}
                src={imagePath}
                alt={`image_${index}`}
                className="h-20 w-20"
              />
            ))}
          </div>
          <form>
            <label htmlFor="chooseFile">
              <div className="flex h-20 w-20 items-center justify-center bg-gray-200 hover:cursor-pointer">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="h-10 w-10 text-gray-600"
                />
              </div>
            </label>
            <input
              id="chooseFile"
              name="chooseFile"
              type="file"
              hidden={true}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  onUpload(e.target.files[0]);
                }
              }}
            />
          </form>
        </div>
        <div className="mt-6 flex gap-4 self-end">
          <button className="h-8 w-24 rounded bg-red-200">취소</button>
          {isCreate ? (
            <button
              className="h-8 w-24 rounded bg-blue-200"
              onClick={() => console.log("create")}
            >
              등록
            </button>
          ) : (
            <button
              className="h-8 w-24 rounded bg-blue-200"
              onClick={() => console.log("edit")}
            >
              수정
            </button>
          )}
        </div>
      </div>
    </>
  );
}
