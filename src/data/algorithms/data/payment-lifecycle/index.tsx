import { Algorithm } from "@/types/algorithms";
import { Content, PaymentLifecycleQuiz } from "./Content";

export const paymentLifecycleTopic: Algorithm = {
  id: "payment-lifecycle",
  title: "Payment Lifecycle (Card)",
  category: "data",
  singlePage: true,
  problem: <Content />,
  algorithm: <PaymentLifecycleQuiz />,
  solution: null,
  improvements: null,
};
