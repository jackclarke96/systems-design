import { Algorithm } from "@/types/algorithms";
import { Content, RetriesDlqQuiz } from "./Content";

export const retriesDlqPattern: Algorithm = {
  id: "retries-dlq",
  title: "Retries & Dead Letter Queues",
  category: "patterns",
  singlePage: true,
  problem: <Content />,
  algorithm: <RetriesDlqQuiz />,
  solution: null,
  improvements: null,
};
