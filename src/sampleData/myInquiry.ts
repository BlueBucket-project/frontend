export interface MyInquiry {
  thumbnailUrl: string;
  title: string;
  answer: string;
  date: string;
}

export const sampleMyInquiries: MyInquiry[] = [
  {
    thumbnailUrl:
      "https://health.chosun.com/site/data/img_dir/2022/05/04/2022050401754_0.jpg",
    title:
      "제품 문의 !@#$%!%!@#@!#!$!#제품 문의 !@#$%!%!@#@!#!$!#제품 문의 !@#$%!%!@#@!#!$!#제품 문의 !@#$%!%!@#@!#!$!#제품 문의 !@#$%!%!@#@!#!$!#\n제품 문의 !@#$%!%!@#@!#!$!#\n제품 문의 !@#$%!%!@#@!#!$!#",
    answer:
      "답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@답변 !%!@#!@$%!@#@\n답변 !%!@#!@$%!@#@\n답변 !%!@#!@$%!@#@",
    date: "2023.10.24",
  },
  {
    thumbnailUrl:
      "https://health.chosun.com/site/data/img_dir/2023/06/20/2023062002262_0.jpg",
    title: "제품 문의 !@#$%!%!@#@!#!$!#%!@#",
    answer: "답변 !%!@#!@$%!@#@!@#!@#",
    date: "2023.09.25",
  },
  {
    thumbnailUrl:
      "https://health.chosun.com/site/data/img_dir/2023/06/20/2023062002262_0.jpg",
    title: "제품 문의 !@#$%!%!@#@!#!$!#%!@#",
    answer: "",
    date: "2023.09.22",
  },
];
