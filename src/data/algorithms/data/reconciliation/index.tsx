import { Algorithm } from "@/types/algorithms";
import { Content, ReconciliationQuiz } from "./Content";

export const reconciliationTopic: Algorithm = {
  id: "reconciliation",
  title: "Reconciliation Patterns",
  category: "data",
  singlePage: true,
  problem: <Content />,
  algorithm: <ReconciliationQuiz />,
  solution: null,
  improvements: null,
};
