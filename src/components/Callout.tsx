import { ReactNode } from "react";
import { AlertCircle, BookOpen, Code, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "definition" | "algorithm";

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const calloutConfig = {
  info: {
    icon: Info,
    bgColor: "bg-callout-info",
    borderColor: "border-callout-info-border",
    textColor: "text-callout-info-text",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-callout-warning",
    borderColor: "border-callout-warning-border",
    textColor: "text-callout-warning-text",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "bg-callout-tip",
    borderColor: "border-callout-tip-border",
    textColor: "text-callout-tip-text",
  },
  definition: {
    icon: BookOpen,
    bgColor: "bg-callout-definition",
    borderColor: "border-callout-definition-border",
    textColor: "text-callout-definition-text",
  },
  algorithm: {
    icon: Code,
    bgColor: "bg-callout-algorithm",
    borderColor: "border-callout-algorithm-border",
    textColor: "text-callout-algorithm-text",
  },
};

export const Callout = ({ type, title, children, className }: CalloutProps) => {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-lg border-l-4 p-4 my-4",
        config.bgColor,
        config.borderColor,
        config.textColor,
        className
      )}
    >
      <div className="flex gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};
