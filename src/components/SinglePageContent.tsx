import { ReactNode } from "react";

interface SinglePageContentProps {
  children: ReactNode;
}

export const SinglePageContent = ({ children }: SinglePageContentProps) => {
  return (
    <div className="prose prose-sm md:prose-base max-w-none">
      <div className="text-base leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  );
};

// Layout components for the single page
export const TwoColumn = ({ children }: { children: ReactNode }) => (
  <div className="grid md:grid-cols-2 gap-6 my-6">
    {children}
  </div>
);

export const Column = ({ children }: { children: ReactNode }) => (
  <div className="space-y-4">
    {children}
  </div>
);

export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl font-bold text-center my-8 text-foreground border-b border-border pb-4">
    {children}
  </h2>
);

export const SubTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`text-center text-muted-foreground italic mb-6 ${className}`}>
    {children}
  </p>
);

export const StepTitle = ({ children }: { children: ReactNode }) => (
  <h4 className="font-bold text-base text-foreground mt-4 mb-2">
    {children}
  </h4>
);

export const HighlightBox = ({ 
  children, 
  variant = "yellow" 
}: { 
  children: ReactNode; 
  variant?: "yellow" | "blue" | "green" | "red";
}) => {
  const variants = {
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700",
    blue: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700",
    green: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
    red: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700",
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]} my-4`}>
      {children}
    </div>
  );
};

export const GoalBox = ({ 
  goal, 
  worksWellWhen, 
  problem 
}: { 
  goal: string; 
  worksWellWhen: string; 
  problem: string; 
}) => (
  <HighlightBox variant="yellow">
    <div className="space-y-2 text-sm">
      <p><strong className="text-foreground">Goal:</strong> {goal}</p>
      <p><strong className="text-green-700 dark:text-green-400">Works well when:</strong> <span className="text-green-700 dark:text-green-400 italic">{worksWellWhen}</span></p>
      <p><strong className="text-red-700 dark:text-red-400">The problem:</strong> <span className="text-red-700 dark:text-red-400 italic">{problem}</span></p>
    </div>
  </HighlightBox>
);

export const DefinitionBox = ({ 
  title, 
  children,
  image
}: { 
  title: string; 
  children: ReactNode;
  image?: ReactNode;
}) => (
  <div className="border border-border rounded-lg p-4 bg-card">
    <h4 className="font-bold text-primary mb-2">{title}</h4>
    <div className="text-sm text-foreground">
      {children}
    </div>
    {image && (
      <div className="mt-3 flex justify-center">
        {image}
      </div>
    )}
  </div>
);

export const ProblemTitle = ({ children }: { children: ReactNode }) => (
  <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">
    {children}
  </h4>
);

export const SolutionTitle = ({ children }: { children: ReactNode }) => (
  <h4 className="font-bold text-green-600 dark:text-green-400 mb-2">
    {children}
  </h4>
);

export const FooterBox = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: ReactNode;
}) => (
  <div className="border-t-2 border-border mt-8 pt-6">
    <h3 className="font-bold text-lg text-center mb-4">{title}</h3>
    {children}
  </div>
);

export const ImageWithText = ({
  src,
  alt,
  children,
  imagePosition = "right"
}: {
  src: string;
  alt: string;
  children: ReactNode;
  imagePosition?: "left" | "right";
}) => (
  <div className={`flex flex-col md:flex-row gap-4 items-start ${imagePosition === "left" ? "md:flex-row-reverse" : ""}`}>
    <div className="flex-1 text-sm">
      {children}
    </div>
    <div className="w-full md:w-48 flex-shrink-0">
      <img src={src} alt={alt} className="rounded-lg border border-border bg-white/90 w-full" />
    </div>
  </div>
);
