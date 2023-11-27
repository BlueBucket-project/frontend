export interface Item {
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
  itemSeller: number;
  itemRamount: number;
  itemImgList?: ItemImg[];
  boardDTOList: IBoardList[];
}
export interface ItemImg {
  itemImgId: number;
  uploadImgName: string;
  oriImgName: string;
  uploadImgUrl: string;
  uploadImgPath: string;
  repImgYn: string;
  item: number;
}
export interface Member {
  email: string;
  memberAddress: Address[];
  memberId: number;
  memberName: string;
  memberPoint: string;
  memberPw: string;
  memberRole: string;
  nickName: string;
  provider: string;
  providerId: string;
}
export interface Address {
  memberAddr: string;
  memberAddrDetail: string;
  memberAddrEtc: string;
}

export interface ICartItem {
  cart: {
    cartId: number;
    member: number;
    cartItems: number;
  };
  cartItemId: number;
  count: number;
  item: Item;
  mbrId: number;
  price: number;
  status: string;
}

export interface IBoardList {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  items: IBoardItem[];
  nowPageNumber: number;
  pageSize: number;
  totalPage: number;
}

export interface IBoardItem {
  boardId: string;
  boardSecret: string;
  commentDTOList: commentDTO[];
  content: string;
  itemId: number;
  nickName: string;
  regTime: string;
  replyStatus: string;
  title: string;
}

export interface commentDTO {
  comment: string;
  commentId: number;
  writeTime: string;
}
