import { Algorithm } from "@/types/algorithms";
import { Problem } from "./Problem";
import { AlgorithmSection } from "./Algorithm";
import { Solution } from "./Solution";
import { Improvements } from "./Improvements";

export const exampleAlgorithm: Algorithm = {
  id: "example",
  title: "Example Algorithm",
  category: "example",
  
  problem: <Problem />,
  algorithm: <AlgorithmSection />,
  solution: <Solution />,
  improvements: <Improvements />,
  
  codeBlocks: [
    {
      description: <strong>Basic BFS Implementation</strong>,
      code: `package main

func hasRoute(graph map[string][]string, start, end string) bool {
    if start == end {
        return true
    }
    
    visited := make(map[string]bool)
    queue := []string{start}
    visited[start] = true
    
    for len(queue) > 0 {
        current := queue[0]
        queue = queue[1:]
        
        for _, neighbor := range graph[current] {
            if neighbor == end {
                return true
            }
            
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }
    }
    
    return false
}`,
    },
  ],
};
