import { Category } from "@/types/algorithms";
import { componentShowcase } from "./componentExamples";
import { alg4pt1 } from "./algorithms/4.1-bfs";
import { alg4pt2 } from "./algorithms/4.2-minimal-tree";
import { FEATURES } from "@/config/features";
import { consistentHashing } from "./algorithms/patterns/consistent-hashing";


const patternsTopics = [
  consistentHashing,
  ...(FEATURES.SHOW_EXAMPLES ? [{
    ...componentShowcase,
    id: "example-components",
    title: "Component Showcase",
    category: "patterns",
  }] : []),
];


const designsTopics = [
  {
    ...alg4pt2,
    id: "url-shortener",
    title: "URL Shortener",
    category: "designs",
  },
  ...(FEATURES.SHOW_EXAMPLES ? [{
    ...componentShowcase,
    id: "example-components-2",
    title: "Component Showcase",
    category: "designs",
  }] : []),
];

export const algorithmCategories: Category[] = [
  {
    id: "patterns",
    name: "Patterns",
    algorithms: patternsTopics,
  },
  {
    id: "designs",
    name: "Designs",
    algorithms: designsTopics,
  },
];
