import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlgorithmSidebar } from "@/components/AlgorithmSidebar";
import { ContentTabs } from "@/components/ContentTabs";
import { algorithmCategories } from "@/data/algorithms";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { category, algorithmId } = useParams();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const defaultAlgorithm = algorithmCategories[0]?.algorithms[0]?.id || "";
  const selectedAlgorithmId = algorithmId || defaultAlgorithm;

  const selectedAlgorithm = algorithmCategories
    .flatMap((cat) => cat.algorithms)
    .find((alg) => alg.id === selectedAlgorithmId);

  useEffect(() => {
    if (!category && !algorithmId) {
      const firstCategory = algorithmCategories[0];
      const firstAlgorithm = firstCategory?.algorithms[0];
      if (firstAlgorithm) {
        navigate(`/${firstCategory.id}/${firstAlgorithm.id}`, { replace: true });
      }
    }
  }, [category, algorithmId, navigate]);

  const handleAlgorithmSelect = (id: string) => {
    const targetCategory = algorithmCategories.find(cat =>
      cat.algorithms.some(alg => alg.id === id)
    );
    if (targetCategory) {
      navigate(`/${targetCategory.id}/${id}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-2 ml-2 md:ml-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SD</span>
            </div>
            <h1 className="text-lg font-bold">Systems Design</h1>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-40 
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          top-14 md:top-0
        `}>
          <AlgorithmSidebar
            selectedId={selectedAlgorithmId}
            onSelect={handleAlgorithmSelect}
          />
        </div>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden top-14"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full min-w-0">
          {selectedAlgorithm && (
            <article className="max-w-4xl mx-auto">
              <header className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                  {selectedAlgorithm.title}
                </h2>
                <p className="text-muted-foreground">
                  Learn scalable system architecture and design patterns
                </p>
              </header>
              
              {selectedAlgorithm.singlePage ? (
                <div className="prose prose-sm md:prose-base max-w-none">
                  {selectedAlgorithm.problem}
                </div>
              ) : (
                <ContentTabs algorithm={selectedAlgorithm} />
              )}
            </article>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
