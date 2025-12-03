import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Algorithm } from "@/types/algorithms";
import { useEffect, useState } from "react";
import { Callout } from "./Callout";
import { TechTooltip } from "./TechTooltip";
import { RichText } from "./RichText";
import { DeepDiveModal } from "./DeepDiveModal";
import { AlgorithmVisualizer } from "./visualizer/AlgorithmVisualizer";
import { PathSumVisualizer } from "./visualizer/PathSumVisualizer";
import { FEATURES } from "@/config/features";

interface ContentTabsProps {
  algorithm: Algorithm;
}

export const ContentTabs = ({ algorithm }: ContentTabsProps) => {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  // Reset to "problem" tab when algorithm changes
  useEffect(() => {
    setActiveTab("problem");
  }, [algorithm.id]);

  const parseCalloutContent = (text: string) => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;
    
    while (i < lines.length) {
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
        i++;
        continue;
      }

      // Handle bullet points
      if (line.startsWith("• ") || line.startsWith("- ")) {
        elements.push(
          <div key={i} className="mb-1">
            <RichText content={line} />
          </div>
        );
        i++;
        continue;
      }

      if (line.trim()) {
        elements.push(
          <div key={i} className="mb-1">
            <RichText content={line} />
          </div>
        );
      }
      
      i++;
    }
    
    return elements;
  };

  const renderContent = (content: React.ReactNode, section: "problem" | "algorithm" | "solution" | "improvements") => {
    // If it's a ReactNode (not a string), just return it
    if (typeof content !== "string") {
      return content;
    }
    
    // Otherwise parse the legacy string format
    return parseLegacyContent(content, section);
  };

  const parseLegacyContent = (text: string, section: "problem" | "algorithm" | "solution" | "improvements") => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Handle callout blocks
      if (line.startsWith("[CALLOUT:")) {
        const typeMatch = line.match(/\[CALLOUT:(\w+)\]/);
        if (typeMatch) {
          const type = typeMatch[1].toLowerCase() as "info" | "warning" | "tip" | "definition" | "algorithm";
          let calloutContent = "";
          i++;
          
          while (i < lines.length && !lines[i].includes("[/CALLOUT]")) {
            calloutContent += lines[i] + "\n";
            i++;
          }
          
          elements.push(
            <Callout key={i} type={type}>
              <div className="whitespace-pre-wrap">
                {parseCalloutContent(calloutContent.trim())}
              </div>
            </Callout>
          );
          i++;
          continue;
        }
      }

      // Handle bold headings (lines that are fully bold)
      if (line.match(/^\*\*[^*]+\*\*$/) && line.length > 4) {
        elements.push(
          <h3 key={i} className="font-bold text-lg mt-4 mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
        i++;
        continue;
      }

      // Handle bullet points
      if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="ml-6 mb-1 list-disc">
            <RichText content={line.substring(2)} />
          </li>
        );
        i++;
        continue;
      }

      // Handle numbered lists
      const numberedMatch = line.match(/^(\d+)\.\s/);
      if (numberedMatch) {
        elements.push(
          <li key={i} className="ml-6 mb-1 list-decimal">
            <RichText content={line.substring(numberedMatch[0].length)} />
          </li>
        );
        i++;
        continue;
      }

      // Regular paragraph with potential tooltips and inline formatting
      if (line.trim()) {
        const explanations = algorithm.detailedExplanations?.filter(exp => exp.section === section) || [];
        let hasDeepDive = false;
        let content: React.ReactNode = <RichText content={line} />;
        
        // Check for deep dive modals and tooltips
        for (const explanation of explanations) {
          const explanationContent = typeof explanation.content === "string" ? explanation.content : "";
          if (line.includes(explanation.trigger)) {
            const parts = line.split(explanation.trigger);
            
            // Use modal for longer explanations (more than 500 chars), tooltip for shorter
            if (explanationContent.length > 500) {
              content = (
                <>
                  <RichText content={parts[0]} />
                  <DeepDiveModal 
                    trigger={explanation.trigger}
                    title={explanation.trigger}
                    content={explanation.content}
                  />
                  {parts[1] && <RichText content={parts[1]} />}
                </>
              );
              hasDeepDive = true;
            } else if (explanationContent) {
              content = (
                <>
                  <RichText content={parts[0]} />
                  <TechTooltip 
                    triggerText={explanation.trigger}
                    content={
                      <div className="whitespace-pre-wrap font-mono text-xs">
                        {explanationContent}
                      </div>
                    }
                  />
                  <RichText content={parts[1] || ""} />
                </>
              );
            }
            break;
          }
        }
        
        elements.push(
          <p key={i} className={`mb-2 ${hasDeepDive ? 'flex items-center flex-wrap gap-1' : ''}`}>
            {content}
          </p>
        );
      } else {
        elements.push(<br key={i} />);
      }
      
      i++;
    }

    return elements;
  };

  // Show visualizer for specific algorithms (only if feature flag is enabled)
  const showBFSVisualizer = FEATURES.SHOW_VISUALIZERS && algorithm.id === "route-between-nodes";
  const showPathSumVisualizer = FEATURES.SHOW_VISUALIZERS && algorithm.id === "path-sum";
  const showVisualizer = showBFSVisualizer || showPathSumVisualizer;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <TabsList className="border-b border-tab-border rounded-none bg-transparent p-0 h-auto inline-flex md:flex w-max md:w-full md:justify-start">
          <TabsTrigger 
            value="problem"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 md:px-4 py-2 text-sm whitespace-nowrap"
          >
            Problem
          </TabsTrigger>
          <TabsTrigger 
            value="algorithm"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 md:px-4 py-2 text-sm whitespace-nowrap"
          >
            Algorithm
          </TabsTrigger>
          <TabsTrigger 
            value="solution"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 md:px-4 py-2 text-sm whitespace-nowrap"
          >
            Solution
          </TabsTrigger>
          <TabsTrigger 
            value="improvements"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 md:px-4 py-2 text-sm whitespace-nowrap"
          >
            Improvements
          </TabsTrigger>
          {showVisualizer && (
            <TabsTrigger 
              value="visualizer"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 md:px-4 py-2 text-sm whitespace-nowrap"
            >
              Visualizer
            </TabsTrigger>
          )}
        </TabsList>
      </div>

      <TabsContent value="problem" className="mt-6 prose prose-sm md:prose-base max-w-none overflow-x-hidden">
        <div className="text-base leading-relaxed break-words">
          {renderContent(algorithm.problem, "problem")}
        </div>
      </TabsContent>

      <TabsContent value="algorithm" className="mt-6 prose prose-sm md:prose-base max-w-none overflow-x-hidden">
        <div className="text-base leading-relaxed break-words">
          {renderContent(algorithm.algorithm, "algorithm")}
          
          {algorithm.images && algorithm.images.length > 0 && (
            <div className="my-6 space-y-4">
              {algorithm.images.map((image, idx) => (
                <figure key={idx} className="border border-border rounded-lg p-4 bg-card">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="w-full max-w-full mx-auto"
                  />
                  {image.caption && (
                    <figcaption className="text-sm text-muted-foreground mt-3 text-center break-words">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="solution" className="mt-6 prose prose-sm md:prose-base max-w-none overflow-x-hidden">
        <div className="text-base leading-relaxed mb-6 break-words">
          {renderContent(algorithm.solution, "solution")}
        </div>
        
        {algorithm.codeBlocks && algorithm.codeBlocks.length > 0 && (
          <div className="mt-6 space-y-6">
            <h3 className="font-bold text-lg mb-3">Complexity</h3>
            <p className="mb-2 break-words">
              <strong>Time:</strong>{" "}
              {algorithm.detailedExplanations?.find(exp => exp.trigger.includes("O(")) ? (
                <TechTooltip 
                  triggerText="O(V + E)"
                  content={
                    <div className="whitespace-pre-wrap font-mono text-xs">
                      {typeof algorithm.detailedExplanations.find(exp => exp.trigger.includes("O("))?.content === "string" 
                        ? algorithm.detailedExplanations.find(exp => exp.trigger.includes("O("))?.content 
                        : ""}
                    </div>
                  }
                />
              ) : (
                "O(V + E)"
              )}
              {" "}— each vertex visited once, each edge considered once.
            </p>
            <p className="mb-4 break-words">
              <strong>Space:</strong> O(V) — queue + visited set.
            </p>
            
            {algorithm.codeBlocks.map((block, idx) => (
              <div key={idx} className="mt-6">
                {block.description && (
                  <div className="mb-3 break-words">
                    {typeof block.description === "string" ? (
                      <RichText content={block.description} />
                    ) : (
                      block.description
                    )}
                  </div>
                )}
                <div className="rounded-md overflow-hidden border border-border overflow-x-auto">
                  <SyntaxHighlighter
                    language={block.language || "go"}
                    style={isDark ? vscDarkPlus : vs}
                    customStyle={{
                      margin: 0,
                      padding: "0.75rem",
                      fontSize: "0.75rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {block.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="improvements" className="mt-6 prose prose-sm md:prose-base max-w-none overflow-x-hidden">
        <div className="text-base leading-relaxed break-words">
          {renderContent(algorithm.improvements, "improvements")}
        </div>
      </TabsContent>

      {showVisualizer && (
        <TabsContent value="visualizer" className="mt-6">
          {showBFSVisualizer && <AlgorithmVisualizer />}
          {showPathSumVisualizer && <PathSumVisualizer />}
        </TabsContent>
      )}
    </Tabs>
  );
};
