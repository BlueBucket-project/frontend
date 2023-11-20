interface InquiriesResponse {
  hasNextPage: boolean;
  totalPage: number;
  isLastPage: boolean;
  pageSize: number;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  items: Inquiry[];
  nowPageNumber: number;
}

interface Inquiry {
  boardId: number;
  title: string;
  content: string;
  nickName: string;
  regTime: string;
  commentDTOList: Comment[];
  boardSecret: string;
  itemId: number;
}

interface Comment {
  commentId: number;
  comment: string;
  writeTime: string;
}
