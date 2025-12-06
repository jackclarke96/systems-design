import { Algorithm } from "@/types/algorithms";
import { Content, AskingQuestionsQuiz } from "./Content";

export const askingQuestionsTopic: Algorithm = {
  id: "asking-questions",
  title: "Asking Questions",
  category: "backend",
  singlePage: true,
  problem: <Content />,
  algorithm: <AskingQuestionsQuiz />,
  solution: null,
  improvements: null,
};
