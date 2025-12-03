import { Algorithm } from "@/types/algorithms";
import { Content, RateLimiterQuiz } from "./Content";

export const rateLimiterDesign: Algorithm = {
  id: "rate-limiter-design",
  title: "Rate Limiter",
  category: "designs",
  singlePage: true,
  problem: <Content />,
  algorithm: <RateLimiterQuiz />,
  solution: null,
  improvements: null,
};
