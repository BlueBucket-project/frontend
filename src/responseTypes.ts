export interface Item {
  itemDetail: string;
  itemId: number;
  itemImgList?: ItemImg[] | null;
  itemName: string;
  itemSellStatus: number;
  memberNickName: string;
  price: number;
  regtime: string;
  sellPlace: string;
  stockNumber: number;
}
export interface ItemImg {
  itemid: number;
  itemImgId: number;
  oriImgName: string;
  repImgYn: string;
  uploadImgName: string;
  uploadImgPath: string;
  uploadImgUrl: string;
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
