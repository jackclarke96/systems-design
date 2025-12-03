import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";

interface CodeViewerProps {
  code: string;
  language: string;
  highlightLine: number;
}

export const CodeViewer = ({ code, language, highlightLine }: CodeViewerProps) => {
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

  const lines = code.split("\n");

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-muted px-4 py-2 border-b border-border">
        <h3 className="font-semibold text-sm">BFS Implementation</h3>
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : vs}
          showLineNumbers
          wrapLines
          lineProps={(lineNumber) => {
            const style: React.CSSProperties = {
              display: "block",
              width: "100%",
              transition: "all 0.3s ease",
            };
            if (lineNumber === highlightLine) {
              style.backgroundColor = isDark 
                ? "rgba(59, 130, 246, 0.2)" 
                : "rgba(59, 130, 246, 0.15)";
              style.borderLeft = "4px solid rgb(59, 130, 246)";
              style.paddingLeft = "0.5rem";
            }
            return { style };
          }}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.6",
            backgroundColor: "transparent",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
