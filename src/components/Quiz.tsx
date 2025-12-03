import { useState } from "react";
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
}

export const Quiz = ({ questions, title = "Test Your Knowledge" }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const current = questions[currentQuestion];
  const isCorrect = selectedAnswer === current.correctIndex;

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
    setAnswers(new Array(questions.length).fill(null));
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="border border-border rounded-xl p-8 bg-card text-center">
        <div className="mb-6">
          <div className={cn(
            "w-20 h-20 rounded-full mx-auto flex items-center justify-center text-2xl font-bold",
            percentage >= 80 ? "bg-green-100 dark:bg-green-950 text-green-600" :
            percentage >= 50 ? "bg-amber-100 dark:bg-amber-950 text-amber-600" :
            "bg-red-100 dark:bg-red-950 text-red-600"
          )}>
            {percentage}%
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">
          {percentage >= 80 ? "Excellent!" : percentage >= 50 ? "Good effort!" : "Keep studying!"}
        </h3>
        <p className="text-muted-foreground mb-6">
          You got {score} out of {questions.length} questions correct.
        </p>
        <Button onClick={handleRestart} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-muted/50 px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="p-6">
        <p className="text-lg font-medium mb-6">{current.question}</p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {current.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === current.correctIndex;
            
            let optionStyle = "border-border hover:border-primary/50 hover:bg-muted/50";
            if (showExplanation) {
              if (isCorrectOption) {
                optionStyle = "border-green-500 bg-green-50 dark:bg-green-950/30";
              } else if (isSelected && !isCorrectOption) {
                optionStyle = "border-red-500 bg-red-50 dark:bg-red-950/30";
              } else {
                optionStyle = "border-border opacity-50";
              }
            } else if (isSelected) {
              optionStyle = "border-primary bg-primary/5";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showExplanation}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all duration-150 flex items-center gap-3",
                  optionStyle
                )}
              >
                <span className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium border-2 flex-shrink-0",
                  showExplanation && isCorrectOption ? "border-green-500 text-green-600" :
                  showExplanation && isSelected && !isCorrectOption ? "border-red-500 text-red-600" :
                  isSelected ? "border-primary text-primary" : "border-muted-foreground/30 text-muted-foreground"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showExplanation && isCorrectOption && (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
                {showExplanation && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={cn(
            "p-4 rounded-lg mb-6",
            isCorrect ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900" :
            "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900"
          )}>
            <p className="text-sm font-medium mb-1">
              {isCorrect ? "✓ Correct!" : "✗ Not quite"}
            </p>
            <p className="text-sm text-muted-foreground">{current.explanation}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!showExplanation ? (
            <Button 
              onClick={handleCheck} 
              disabled={selectedAnswer === null}
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
