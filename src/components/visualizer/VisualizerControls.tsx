import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VisualizerControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  description: string;
  variables: Record<string, any>;
}

export const VisualizerControls = ({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
  description,
  variables,
}: VisualizerControlsProps) => {
  return (
    <div className="space-y-4">
      {/* Description */}
      <div className="bg-muted border border-border rounded-lg p-4">
        <p className="text-sm font-medium">{description}</p>
      </div>

      {/* Variables State */}
      {Object.keys(variables).length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">Variables:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(variables).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="font-mono text-xs">
                {key}: {typeof value === "object" ? JSON.stringify(value) : String(value)}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Step Counter */}
          <div className="text-sm font-medium">
            Step {currentStep + 1} of {totalSteps}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onReset}
              disabled={currentStep === 0}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={onStepBackward}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {isPlaying ? (
              <Button onClick={onPause} size="icon">
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={onPlay} 
                size="icon"
                disabled={currentStep === totalSteps - 1}
              >
                <Play className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={onStepForward}
              disabled={currentStep === totalSteps - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center gap-3 min-w-[180px]">
            <span className="text-sm font-medium whitespace-nowrap">Speed:</span>
            <Slider
              value={[speed]}
              onValueChange={(values) => onSpeedChange(values[0])}
              min={0.5}
              max={3}
              step={0.5}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground w-8">{speed}x</span>
          </div>
        </div>
      </div>
    </div>
  );
};
