import { Algorithm } from "@/types/algorithms";
import { Content, FinanceTradeoffsQuiz } from "./Content";

export const financeTradeoffsDesign: Algorithm = {
  id: "finance-tradeoffs",
  title: "Finance Design Tradeoffs",
  category: "designs",
  singlePage: true,
  problem: <Content />,
  algorithm: <FinanceTradeoffsQuiz />,
  solution: null,
  improvements: null,
};
