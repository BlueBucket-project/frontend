export interface MyInquiry {
  thumbnailUrl: string;
  inquiry: string;
  answer: string;
}

export const sampleMyInquiries: MyInquiry[] = [
  {
    thumbnailUrl:
      "https://health.chosun.com/site/data/img_dir/2022/05/04/2022050401754_0.jpg",
    inquiry: "제품 문의 !@#$%!%!@#@!#!$!#",
    answer: "답변 !%!@#!@$%!@#@",
  },
  {
    thumbnailUrl:
      "https://health.chosun.com/site/data/img_dir/2023/06/20/2023062002262_0.jpg",
    inquiry: "제품 문의 !@#$%!%!@#@!#!$!#%!@#",
    answer: "답변 !%!@#!@$%!@#@!@#!@#",
  },
];
