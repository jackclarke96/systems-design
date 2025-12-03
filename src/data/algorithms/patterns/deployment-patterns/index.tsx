import { Algorithm } from "@/types/algorithms";
import { Content, DeploymentPatternsQuiz } from "./Content";

export const deploymentPatternsPattern: Algorithm = {
  id: "deployment-patterns",
  title: "Deployment & Feature Flags",
  category: "patterns",
  singlePage: true,
  problem: <Content />,
  algorithm: <DeploymentPatternsQuiz />,
  solution: null,
  improvements: null,
};
