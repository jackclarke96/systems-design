import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DiagramWrapperProps {
  children: ReactNode;
  title?: string;
  caption?: string;
  compact?: boolean;
  className?: string;
}

export const DiagramWrapper = ({ 
  children, 
  title, 
  caption, 
  compact = false,
  className 
}: DiagramWrapperProps) => {
  return (
    <div className={cn(
      "my-4 rounded-lg border border-border bg-card overflow-hidden",
      compact ? "p-3" : "p-6",
      className
    )}>
      {title && (
        <div className={cn(
          "font-semibold text-foreground",
          compact ? "text-sm mb-2" : "text-base mb-4"
        )}>
          {title}
        </div>
      )}
      <div className="flex items-start justify-center w-full h-full [&>svg]:max-w-full [&>svg]:h-auto">
        {children}
      </div>
      {caption && (
        <div className={cn(
          "text-muted-foreground italic text-center",
          compact ? "text-xs mt-2" : "text-sm mt-4"
        )}>
          {caption}
        </div>
      )}
    </div>
  );
};

interface DiagramColumnProps {
  children: ReactNode;
  className?: string;
}

export const DiagramColumn = ({ children, className }: DiagramColumnProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
};
