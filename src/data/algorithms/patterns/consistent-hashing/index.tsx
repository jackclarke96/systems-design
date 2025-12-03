import { Algorithm } from "@/types/algorithms";
import { ConsistentHashingContent } from "./Content";

export const consistentHashing: Algorithm = {
  id: "consistent-hashing",
  title: "Pattern: Consistent Hashing (Sharding)",
  category: "patterns",
  singlePage: true,
  
  problem: <ConsistentHashingContent />,
  algorithm: null,
  solution: null,
  improvements: null,
};
