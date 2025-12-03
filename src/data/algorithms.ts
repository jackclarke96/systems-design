import { Category } from "@/types/algorithms";
import { componentShowcase } from "./componentExamples";
import { alg4pt1 } from "./algorithms/4.1-bfs";
import { alg4pt2 } from "./algorithms/4.2-minimal-tree";
import { FEATURES } from "@/config/features";
import { alg2pt1 } from "./algorithms/linked-lists/2.1-remove-dupes";


const linkedListsAlgorithms = [
  alg2pt1
]
const graphsAlgorithms = [
  {
    ...alg4pt1,
    id: "route-between-nodes",
    title: "4.1 Path from S to E",
    category: "graphs",
  },
  ...(FEATURES.SHOW_EXAMPLES ? [{
    ...componentShowcase,
    id: "example-components",
    title: "4.0 Example - Component Showcase",
    category: "graphs",
  }] : []),
];


const treesAlgorithms = [
  {
    ...alg4pt2,
    id: "minimal-bst",
    title: "4.2 Minimal BST",
    category: "trees",
  },
  ...(FEATURES.SHOW_EXAMPLES ? [{
    ...componentShowcase,
    id: "example-components-2",
    title: "4.0 Example - Component Showcase",
    category: "graphs",
  }] : []),
];

export const algorithmCategories: Category[] = [
  {
    id: "linkedlists",
    name: "Linked Lists",
    algorithms: linkedListsAlgorithms,
  },
  {
    id: "graphs",
    name: "Graphs",
    algorithms: graphsAlgorithms,
  },
  {
    id: "trees",
    name: "Trees",
    algorithms: treesAlgorithms,
  },
];
