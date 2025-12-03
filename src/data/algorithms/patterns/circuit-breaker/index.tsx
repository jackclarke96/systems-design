import { Algorithm } from "@/types/algorithms";
import { Content, CircuitBreakerQuiz } from "./Content";

export const circuitBreakerPattern: Algorithm = {
  id: "circuit-breaker",
  title: "Circuit Breaker",
  category: "patterns",
  singlePage: true,
  problem: <Content />,
  algorithm: <CircuitBreakerQuiz />,
  solution: null,
  improvements: null,
};
