import { Algorithm } from "@/types/algorithms";
import { Content, MessagingQuiz } from "./Content";

export const messagingDeliveryPattern: Algorithm = {
  id: "messaging-delivery",
  title: "Messaging & Delivery",
  category: "patterns",
  singlePage: true,
  problem: <Content />,
  algorithm: <MessagingQuiz />,
  solution: null,
  improvements: null,
};
