import { ReactNode } from "react";

export interface CodeBlock {
  code: string;
  description?: ReactNode;
  language?: string;
}

export interface Algorithm {
  id: string;
  title: string;
  category: string;
  problem: ReactNode;
  algorithm: ReactNode;
  solution: ReactNode;
  improvements: ReactNode;
  codeBlocks?: CodeBlock[];
  images?: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  detailedExplanations?: DetailedExplanation[];
}

export interface DetailedExplanation {
  trigger: string;
  content: ReactNode;
  section: "problem" | "algorithm" | "solution" | "improvements";
}

export interface Category {
  id: string;
  name: string;
  algorithms: Algorithm[];
}
