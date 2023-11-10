export interface Item {
  itemId: number;
  itemName: string;
  price: number;
  itemDetail: string;
  itemSellStatus: number;
  regTime: string;
  memberNickName: string;
  stockNumber: number;
  sellPlace: string;
  itemReserver: boolean;
  itemRamount: number;
  itemImgList?: ItemImg[];
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
