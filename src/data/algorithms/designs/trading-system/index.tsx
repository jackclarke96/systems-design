import { Algorithm } from "@/types/algorithms";
import { Content, TradingSystemQuiz } from "./Content";

export const tradingSystem: Algorithm = {
  id: "trading-system",
  title: "Trading / Order System",
  category: "designs",
  singlePage: true,
  problem: <Content />,
  algorithm: <TradingSystemQuiz />,
  solution: null,
  improvements: null,
};
