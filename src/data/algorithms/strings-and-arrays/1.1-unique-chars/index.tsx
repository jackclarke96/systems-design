import { Algorithm } from "@/types/algorithms";
import { Paragraph, Heading, Section, List, ListItem } from "@/components/AlgorithmContent";
import { Problem } from "./Problem";
import { AlgorithmSection } from "./Algorithm";
import { Solution } from "./Solution";
import { Improvements } from "./Improvements";

export const alg4pt1: Algorithm = {
  id: "component-showcase",
  title: "Component Showcase - How to Use All Components",
  category: "examples",
  
  problem: <Problem />,
  algorithm: <AlgorithmSection />,
  solution: <Solution />,
  improvements: <Improvements />,
};