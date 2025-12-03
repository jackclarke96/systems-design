import { Algorithm } from "@/types/algorithms";
import { Paragraph, Heading, Section, List, ListItem } from "@/components/AlgorithmContent";
import { Problem } from "./Problem";
import { AlgorithmSection } from "./Algorithm";
import { Solution } from "./Solution";
import { Improvements } from "./Improvements";

export const alg2pt1: Algorithm = {
  id: "ll-remove-dupes",
  title: "2.1 Remove Dupes",
  category: "Linked Lists",
  
  problem: <Problem />,
  algorithm: <AlgorithmSection />,
  solution: <Solution />,
  improvements: <Improvements />,
};