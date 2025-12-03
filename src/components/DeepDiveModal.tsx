import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RichText } from "./RichText";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { Callout } from "./Callout";

interface DeepDiveModalProps {
  trigger: string;
  title: string;
  content: React.ReactNode;
}

export const DeepDiveModal = ({ trigger, title, content }: DeepDiveModalProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  const renderContent = () => {
    // If content is already a ReactNode, just return it
    if (typeof content !== "string") {
      return content;
    }

    // Otherwise parse the legacy string format
    return parseLegacyContent(content);
  };

  const parseLegacyContent = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("[CALLOUT:")) {
        const typeMatch = line.match(/\[CALLOUT:(\w+)\]/);
        if (typeMatch) {
          const type = typeMatch[1].toLowerCase() as
            | "info"
            | "warning"
            | "tip"
            | "definition"
            | "algorithm";
          let content = "";
          i++;
          while (i < lines.length && !lines[i].includes("[/CALLOUT]")) {
            content += lines[i] + "\n";
            i++;
          }
          elements.push(
            <Callout key={key++} type={type}>
              {parseCalloutContent(content.trim())}
            </Callout>
          );
          i++;
          continue;
        }
      }

      if (line.startsWith("```")) {
        const language = line.slice(3).trim() || "go";
        let code = "";
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          code += lines[i] + "\n";
          i++;
        }
        elements.push(
          <SyntaxHighlighter
            key={key++}
            language={language}
            style={isDark ? vscDarkPlus : oneDark}
            customStyle={{
              borderRadius: "0.5rem",
              padding: "1rem",
              fontSize: "0.875rem",
              margin: "1rem 0",
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        );
        i++;
        continue;
      }

      if (line.startsWith("**") && line.endsWith("**")) {
        const text = line.slice(2, -2);
        elements.push(
          <h4 key={key++} className="font-semibold mb-2 mt-4">
            {text}
          </h4>
        );
      } else if (line.match(/^[•-]\s/)) {
        const items: string[] = [];
        while (i < lines.length && lines[i].match(/^[•-]\s/)) {
          items.push(lines[i].replace(/^[•-]\s/, ""));
          i++;
        }
        elements.push(
          <ul key={key++} className="list-disc list-inside space-y-2 ml-4">
            {items.map((item, idx) => (
              <li key={idx} className="text-sm leading-relaxed">
                <RichText content={item} />
              </li>
            ))}
          </ul>
        );
        continue;
      } else if (line.match(/^\d+\.\s/)) {
        const items: string[] = [];
        while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
          items.push(lines[i].replace(/^\d+\.\s/, ""));
          i++;
        }
        elements.push(
          <ol key={key++} className="list-decimal list-inside space-y-2 ml-4">
            {items.map((item, idx) => (
              <li key={idx} className="text-sm leading-relaxed">
                <RichText content={item} />
              </li>
            ))}
          </ol>
        );
        continue;
      } else if (line.trim()) {
        elements.push(
          <p key={key++} className="text-sm leading-relaxed mb-4">
            <RichText content={line} />
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  const parseCalloutContent = (text: string) => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle code blocks within callouts
      if (line.startsWith("```")) {
        const language = line.substring(3).trim() || "go";
        let codeContent = "";
        i++;
        
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeContent += lines[i] + "\n";
          i++;
        }
        
        elements.push(
          <div key={i} className="rounded-md overflow-hidden border border-border my-2">
            <SyntaxHighlighter
              language={language}
              style={isDark ? vscDarkPlus : vs}
              customStyle={{
                margin: 0,
                padding: "0.75rem",
                fontSize: "0.8rem",
                lineHeight: "1.4",
              }}
            >
              {codeContent.trim()}
            </SyntaxHighlighter>
          </div>
        );
        continue;
      }

      // Handle bullet points
      if (line.startsWith("• ") || line.startsWith("- ")) {
        elements.push(
          <div key={i} className="mb-1">
            <RichText content={line} />
          </div>
        );
        continue;
      }

      if (line.trim()) {
        elements.push(
          <div key={i} className="mb-1">
            <RichText content={line} />
          </div>
        );
      }
    }
    
    return elements;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-auto p-1 text-info hover:text-info/80 hover:bg-info/10 inline-flex items-center"
        >
          <Info className="h-4 w-4 mr-1" />
          <span className="underline decoration-dotted">{trigger}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="mt-4 space-y-2 text-foreground overflow-x-hidden">
            {renderContent()}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
