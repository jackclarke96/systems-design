import { ReactNode } from "react";
import { Callout } from "./Callout";
import { GraphDiagram } from "./GraphDiagram";
import { TreeDiagram } from "./TreeDiagram";
import { LinkedListDiagram } from "./LinkedListDiagram";
import { ArrayDiagram } from "./ArrayDiagram";
import { MapDiagram } from "./MapDiagram";
import { StackDiagram } from "./StackDiagram";
import { QueueDiagram } from "./QueueDiagram";
import { RichText } from "./RichText";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Re-export components that users will need
export { Callout, GraphDiagram, TreeDiagram, LinkedListDiagram, ArrayDiagram, MapDiagram, StackDiagram, QueueDiagram };
export { DiagramWrapper, DiagramColumn } from "./DiagramWrapper";

interface CodeProps {
  children: string;
  language?: string;
}

export const Code = ({ children, language = "go" }: CodeProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={document.documentElement.classList.contains("dark") ? vscDarkPlus : oneDark}
      customStyle={{
        borderRadius: "0.5rem",
        padding: "1rem",
        fontSize: "0.875rem",
        margin: "1rem 0",
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

interface SectionProps {
  title?: string;
  children: ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="my-6">
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export const List = ({ children }: { children: ReactNode }) => {
  return <ul className="list-disc list-inside space-y-2 ml-4">{children}</ul>;
};

export const ListItem = ({ children }: { children: ReactNode }) => {
  return <li className="text-sm leading-relaxed">{children}</li>;
};

export const Paragraph = ({ children }: { children: ReactNode }) => {
  // Support inline code rendering with backticks
  if (typeof children === 'string') {
    return <p className="text-sm leading-relaxed mb-4"><RichText content={children} /></p>;
  }
  return <p className="text-sm leading-relaxed mb-4">{children}</p>;
};

export const Heading = ({ children }: { children: ReactNode }) => {
  return <h4 className="font-semibold mb-2 mt-4">{children}</h4>;
};
