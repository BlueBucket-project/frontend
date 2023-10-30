export interface History {
  thumbnailUrl: string;
  name: string;
  price: number;
  quantity: number;
  date: string;
}
export const SampleHistory: History[] = [
  {
    thumbnailUrl:
      "https://i.namu.wiki/i/w9ip3X295D53RqdqL6W5UD-3mrGRu097o-uMdaQqTFH-fgqP_iqcwpUd3u0JrlO-26pbh0v9zx7ciTlZdOAiN6BEj4P91mdPSPcKrzsvH-PKkMfw1mf-RPtMUCvWk_mJFG40CSQiyH5e_jXycvvApw.webp",
    name: "아이패드",
    price: 10000,
    quantity: 1,
    date: "23.09.19",
  },
  {
    thumbnailUrl:
      "https://health.chosun.com/site/data/img_dir/2022/05/04/2022050401754_0.jpg",
    name: "바나나",
    price: 500,
    quantity: 3,
    date: "23.10.23",
  },
  {
    thumbnailUrl:
      "https://health.chosun.com/site/data/img_dir/2023/06/20/2023062002262_0.jpg",
    name: "사과",
    price: 1000,
    quantity: 10,
    date: "23.10.25",
  },
];
