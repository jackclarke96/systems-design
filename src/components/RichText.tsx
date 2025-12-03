import { ReactNode } from "react";

interface RichTextProps {
  content: string;
}

export const RichText = ({ content }: RichTextProps) => {
  const parseInlineFormatting = (text: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let currentIndex = 0;
    // Combined regex to match both bold (**text**) and inline code (`code`)
    const combinedRegex = /(\*\*(.*?)\*\*|`([^`]+)`)/g;
    let match;

    while ((match = combinedRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }
      
      // Check if it's bold or code
      if (match[0].startsWith('**')) {
        parts.push(<strong key={match.index}>{match[2]}</strong>);
      } else if (match[0].startsWith('`')) {
        parts.push(
          <code 
            key={match.index} 
            className="px-1.5 py-0.5 rounded bg-code-background text-accent-foreground font-mono text-sm"
          >
            {match[3]}
          </code>
        );
      }
      
      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  return <>{parseInlineFormatting(content)}</>;
};
