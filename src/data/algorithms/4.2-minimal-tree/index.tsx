import { Algorithm } from "@/types/algorithms";
import { Paragraph, Heading, Section, List, ListItem } from "@/components/AlgorithmContent";
import { Problem } from "./Problem";
import { AlgorithmSection } from "./Algorithm";
import { Solution } from "./Solution";
import { Improvements } from "./Improvements";

export const alg4pt2: Algorithm = {
  id: "4.2-minimal-tree",
  title: "4.2 Minimal BST",
  category: "trees-and-graphs",
  
  problem: <Problem />,
  algorithm: <AlgorithmSection />,
  solution: <Solution />,
  improvements: <Improvements />,
};