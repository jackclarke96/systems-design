import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Layers, Box } from "lucide-react";
import { algorithmCategories } from "@/data/algorithms";
import { cn } from "@/lib/utils";

interface AlgorithmSidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const categoryIcons: Record<string, typeof Layers> = {
  patterns: Layers,
  designs: Box,
};

export const AlgorithmSidebar = ({ selectedId, onSelect }: AlgorithmSidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["patterns", "designs"]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside className="w-64 h-[calc(100vh-3.5rem)] md:h-screen border-r border-sidebar-border bg-sidebar p-5 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Navigation
        </h2>
      </div>
      
      <nav className="space-y-6">
        {algorithmCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          const Icon = categoryIcons[category.id] || Layers;
          
          return (
            <div key={category.id}>
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center gap-2 w-full text-left mb-2 group"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <h3 className="font-semibold text-sm text-sidebar-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="text-muted-foreground">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </button>
              
              {isExpanded && (
                <ul className="ml-6 space-y-0.5 border-l border-sidebar-border pl-3">
                  {category.algorithms.map((algorithm) => (
                    <li key={algorithm.id}>
                      <Link
                        to={`/${category.id}/${algorithm.id}`}
                        onClick={() => onSelect(algorithm.id)}
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-150",
                          selectedId === algorithm.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        {algorithm.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
