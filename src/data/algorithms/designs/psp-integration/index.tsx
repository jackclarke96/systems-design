import { Algorithm } from "@/types/algorithms";
import { Content, PSPIntegrationQuiz } from "./Content";

export const pspIntegration: Algorithm = {
  id: "psp-integration",
  title: "Card Payments / PSP Integration",
  category: "designs",
  singlePage: true,
  problem: <Content />,
  algorithm: <PSPIntegrationQuiz />,
  solution: null,
  improvements: null,
};
