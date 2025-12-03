import { Algorithm } from "@/types/algorithms";
import { Problem } from "./Problem";
import { AlgorithmSection } from "./Algorithm";
import { Solution } from "./Solution";
import { Improvements } from "./Improvements";

export const consistentHashing: Algorithm = {
  id: "consistent-hashing",
  title: "Consistent Hashing",
  category: "patterns",
  
  problem: <Problem />,
  algorithm: <AlgorithmSection />,
  solution: <Solution />,
  improvements: <Improvements />,
};
