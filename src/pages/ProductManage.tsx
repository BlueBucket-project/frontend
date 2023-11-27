import { ReactElement, useEffect, useState } from "react";
import Header from "../components/Header.tsx";
import { instance, instanceH } from "../api";
import { useAppSelector } from "../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Popup from "reactjs-popup";
import PageButtons from "../components/PageButtons.tsx";

const overlayStyle = { background: "rgba(0,0,0,0.5)" };

export default function ProductManage(): ReactElement {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [queryProductStatus, setQueryProductStatus] =
    useState<ProductStatus>("SELL");
  const [deleteTargetId, setDeleteTargetId] = useState<number>(-1);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);

  const refreshProducts = () => {
    let api = `/items/search?page=${page}`;
    if (queryProductStatus.length > 0) {
      api += `&itemSellStatus=${queryProductStatus}`;
    }
    instance
      .get(api)
      .then((res) => {
        const response: ProductListResponse = res.data;
        setTotalPage(response.totalPage);
        setPage(response.nowPageNumber);
        setProducts(response.items);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          setProducts([]);
          alert(error.response.data);
        }
      });
  };

  useEffect(() => {
    refreshProducts();
  }, [page, queryProductStatus]);

  const deleteItem = () => {
    instanceH(user.accessToken)
      .delete(`/admins/items/${deleteTargetId}`)
      .then(() => {
        refreshProducts();
      });
  };
  return (
    <>
      <Header />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="flex justify-between border-b pb-2">
          <div className="text-3xl">상품 관리</div>
          <select
            onChange={(e) =>
              setQueryProductStatus(e.target.value as ProductStatus)
            }
          >
            <option value="SELL">판매중</option>
            <option value="RESERVED">예약중</option>
            <option value="SOLD_OUT">판매완료</option>
          </select>
        </div>
        <div className="grid max-w-5xl grid-cols-8 gap-3 border-b py-4 pl-10 text-center font-bold">
          <div className="col-span-1">썸네일</div>
          <div className="col-span-3">상품명</div>
          <div className="col-span-1">가격</div>
          <div className="col-span-1">수량</div>
          <div className="col-span-1">등록일</div>
          <div className="col-span-1"></div>
        </div>
        {products.map((product: Product, i: number) => (
          <div
            key={`product_${i}`}
            className="grid max-w-5xl grid-cols-8 items-center justify-items-center gap-3 border-b py-4 pl-10"
          >
            <div
              className="col-span-1 flex h-20 w-20 items-center justify-center bg-gray-200 hover:cursor-pointer"
              onClick={() => navigate(`/item/${product.itemId}`)}
            >
              {product.itemImgList.length !== 0 ? (
                <img
                  src={product.itemImgList[0].uploadImgUrl}
                  alt={`product_img_${i}`}
                  className="h-20 w-20"
                />
              ) : (
                <div className="text-sm">사진 없음</div>
              )}
            </div>
            <div
              className="col-span-3 justify-self-start hover:cursor-pointer"
              onClick={() => navigate(`/item/${product.itemId}`)}
            >
              {product.itemName}
            </div>
            <div className="col-span-1">
              {product.price.toLocaleString()} 원
            </div>
            <div className="col-span-1">{product.stockNumber} 개</div>
            <div className="col-span-1">{product.regTime.split("T")[0]}</div>
            <div className="col-span-1 flex flex-col gap-2">
              <button
                className="w-16 rounded bg-blue-200"
                onClick={() =>
                  navigate(`/admin/product/edit/${product.itemId}`)
                }
              >
                수정
              </button>
              <button
                className="w-16 rounded bg-red-200"
                onClick={() => {
                  setDeleteTargetId(product.itemId);
                  setIsModalOpened(true);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
        <div className="flex h-12 justify-end pr-6 pt-4">
          <button
            className="w-24 rounded bg-blue-200"
            onClick={() => navigate(`/admin/product/create`)}
          >
            상품 추가
          </button>
        </div>
        <PageButtons page={page} totalPage={totalPage} setPage={setPage} />
      </div>

      <Popup
        open={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        modal
        {...{ overlayStyle }}
      >
        <div className="flex w-96 flex-col items-center rounded bg-white">
          <div className="my-10">
            {deleteTargetId}번 상품을 삭제하시겠습니까?
          </div>
          <div className="mb-5 mr-5 flex gap-2 self-end">
            <button
              className="w-20 rounded bg-gray-200"
              onClick={() => setIsModalOpened(false)}
            >
              취소
            </button>
            <button
              className="w-20 rounded bg-red-300"
              onClick={() => {
                deleteItem();
                setIsModalOpened(false);
                refreshProducts();
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
}
