import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { ReactNode } from "react";

interface TechTooltipProps {
  content: ReactNode;
  triggerText?: string;
}

export const TechTooltip = ({ content, triggerText }: TechTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors border-b border-dashed border-accent cursor-help">
          {triggerText}
          <HelpCircle className="w-3.5 h-3.5" />
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-md p-4 text-sm leading-relaxed bg-popover text-popover-foreground border-border"
          side="top"
          align="start"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
