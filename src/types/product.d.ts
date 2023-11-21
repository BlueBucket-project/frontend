interface ProductListResponse {
  hasNextPage: boolean;
  totalPage: number;
  isLastPage: boolean;
  pageSize: number;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  items: Product[];
  nowPageNumber: number;
}

interface PurchaseHistory {
  orderDate: string;
  orderitemId: number;
  itemPrice: number;
  itemAmount: number;
  itemBuyer: number;
  itemSeller: number;
  itemId: number;
  item: Product;
}
interface Product {
  itemId: number;
  itemName: string;
  price: number;
  itemDetail: string;
  itemSellStatus: string;
  regTime: string;
  memberNickName: string;
  stockNumber: number;
  sellPlace: string;
  itemReserver: null;
  itemRamount: number;
  itemImgList: ItemImg[];
  itemSeller: number;
  boardDTOList: [];
}

interface ItemImg {
  itemImgId: number;
  uploadImgName: string;
  oriImgName: string;
  uploadImgUrl: string;
  uploadImgPath: string;
  repImgYn: string;
  item: null;
}

type ProductStatus = "RESERVED" | "SELL" | "SOLD_OUT";
