import { ReactElement, useEffect, useState } from "react";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { instanceH } from "../api";
import { useAppSelector } from "../app/hooks.ts";
import { useNavigate } from "react-router-dom";

interface ProductDto {
  itemId: number;
  itemName: string;
  itemDetail: string;
  price: number;
  stockNumber: number;
  sellPlace: string;
  itemSeller?: number;
  remainImgId?: number[];
}

interface Img {
  imgId?: number;
  imgPath: string;
}

export default function ProductEditor({
  isCreate,
  initialProduct,
}: {
  isCreate?: boolean;
  initialProduct: Product;
}): ReactElement {
  const [product, setProduct] = useState<ProductDto>(initialProduct);
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<Img[]>([]);
  const navigate = useNavigate();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const createItem = () => {
    const form = new FormData();
    form.append(
      "key",
      new Blob([JSON.stringify(product)], { type: "application/json" }),
    );
    form.append("files", new Blob(files));
    instanceH(accessToken)
      .post("/items", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((_) => {
        alert("등록되었습니다.");
        navigate("/admin/product");
      });
  };

  const editItem = () => {
    const form = new FormData();
    form.append(
      "key",
      new Blob([JSON.stringify(product)], { type: "application/json" }),
    );
    form.append("files", new Blob(files));
    instanceH(accessToken)
      .put(`/items/${product.itemId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((_) => {
        alert("수정되었습니다.");
        navigate("/admin/product");
      });
  };

  const deleteImg = (index: number) => {
    if (images[index].imgId !== undefined) {
      const nextDelImgId =
        product.remainImgId?.filter((id) => id !== images[index].imgId) || [];
      setProduct({ ...product, remainImgId: nextDelImgId });
    } else {
      const filesIndex = index - (product.remainImgId?.length || 0);
      setFiles(files.filter((_, i) => i !== filesIndex));
    }
    const nextImages = images.filter((_, i) => i !== index);
    setImages(nextImages);
  };

  useEffect(() => {
    const parsedProduct: ProductDto = {
      itemId: initialProduct.itemId,
      itemName: initialProduct.itemName,
      itemDetail: initialProduct.itemDetail,
      price: initialProduct.price,
      stockNumber: initialProduct.stockNumber,
      sellPlace: initialProduct.sellPlace,
    };
    if (!isCreate) {
      parsedProduct.itemSeller = initialProduct.itemSeller;
      if (initialProduct.itemImgList.length > 0) {
        parsedProduct.remainImgId = initialProduct.itemImgList.map(
          (img) => img.itemImgId,
        );
        const parsedImages = initialProduct.itemImgList.map((img) => {
          return {
            imgId: img.itemImgId,
            imgPath: img.uploadImgUrl,
          };
        });
        setImages(parsedImages);
      }
    }
    setProduct(parsedProduct);
  }, [initialProduct]);

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setFiles([...files, file]);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (reader.result) {
          setImages([...images, { imgPath: reader.result as string }]);
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
            <div>{product.itemId}</div>
          </div>
        )}
        <div className="flex border-b py-2">
          <div className="w-28">상품명</div>
          <input
            type="text"
            placeholder="상품명"
            value={product.itemName}
            onChange={(e) => {
              setProduct({ ...product, itemName: e.target.value });
            }}
            className="w-1/3 border bg-gray-50 pl-2"
          />
        </div>
        <div className="flex border-b py-2">
          <div className="w-28">판매 장소</div>
          <input
            type="text"
            placeholder="판매 장소"
            value={product.sellPlace}
            onChange={(e) => {
              setProduct({ ...product, sellPlace: e.target.value });
            }}
            className="w-1/3 border bg-gray-50 pl-2"
          />
        </div>
        <div className="flex border-b py-2">
          <div className="w-28">가격</div>
          <input
            type="text"
            value={product?.price.toLocaleString()}
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
            value={product?.stockNumber}
            onChange={(e) =>
              setProduct({
                ...product,
                stockNumber: Number(e.target.value) || 0,
              })
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
            value={product.itemDetail}
            onChange={(e) =>
              setProduct({
                ...product,
                itemDetail: e.target.value,
              })
            }
          />
        </div>
        <div className="flex border-b py-2">
          <div className="w-28">상품 사진</div>
          <div className={`flex gap-2 ${images.length > 0 ? "mr-2" : ""}`}>
            {images.map((imagePath, index) => (
              <div className="relative" key={`image_${index}`}>
                <img
                  src={imagePath.imgPath}
                  alt={`image_${index}`}
                  className="h-20 w-20"
                />
                <div
                  className="absolute bottom-16 left-16 h-5 w-5 rounded-3xl bg-white hover:cursor-pointer"
                  onClick={() => deleteImg(index)}
                >
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="h-5 w-5 text-red-600"
                  />
                </div>
              </div>
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
          <button
            className="h-8 w-24 rounded bg-red-200"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          {isCreate ? (
            <button
              className="h-8 w-24 rounded bg-blue-200"
              onClick={() => createItem()}
            >
              등록
            </button>
          ) : (
            <button
              className="h-8 w-24 rounded bg-blue-200"
              onClick={() => editItem()}
            >
              수정
            </button>
          )}
        </div>
      </div>
    </>
  );
}
