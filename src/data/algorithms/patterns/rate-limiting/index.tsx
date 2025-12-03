import { Algorithm } from "@/types/algorithms";
import { Content, RateLimitingQuiz } from "./Content";

export const rateLimitingPattern: Algorithm = {
  id: "rate-limiting",
  title: "Rate Limiting & Bulkhead",
  category: "patterns",
  singlePage: true,
  problem: <Content />,
  algorithm: <RateLimitingQuiz />,
  solution: null,
  improvements: null,
};
