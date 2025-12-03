import { Algorithm } from "@/types/algorithms";
import { Content, FinanceQuiz } from "./Content";

export const financeTopic: Algorithm = {
  id: "data-in-finance",
  title: "Data in Finance",
  category: "data",
  singlePage: true,
  problem: <Content />,
  algorithm: <FinanceQuiz />,
  solution: null,
  improvements: null,
};
