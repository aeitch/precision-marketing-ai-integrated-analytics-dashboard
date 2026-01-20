import { MicroFault } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Thermometer, Activity, Layers, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MicroFaultLogProps {
  faults: MicroFault[];
  className?: string;
}

const severityStyles = {
  low: {
    bg: 'bg-muted/50',
    text: 'text-muted-foreground',
    border: 'border-muted',
  },
  medium: {
    bg: 'bg-warning/10',
    text: 'text-warning',
    border: 'border-warning/30',
  },
  high: {
    bg: 'bg-warning/20',
    text: 'text-warning',
    border: 'border-warning/50',
  },
  critical: {
    bg: 'bg-destructive/10',
    text: 'text-destructive',
    border: 'border-destructive/30',
  },
};

const typeIcons = {
  thermal: Thermometer,
  vibration: Activity,
  structural: Layers,
};

export function MicroFaultLog({ faults, className }: MicroFaultLogProps) {
  return (
    <div className={cn("glass-card rounded-lg p-5", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Recent AI-Detected Micro-faults
        </h3>
        <span className="text-xs font-mono text-muted-foreground">
          PyTorch Vision Analysis
        </span>
      </div>

      <ScrollArea className="h-[320px] pr-3 scrollbar-thin">
        <div className="space-y-2">
          {faults.map((fault) => {
            const Icon = typeIcons[fault.type];
            const styles = severityStyles[fault.severity];

            return (
              <div
                key={fault.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-colors hover:bg-muted/30",
                  styles.border,
                  styles.bg
                )}
              >
                <div className={cn("p-1.5 rounded", styles.bg)}>
                  <Icon className={cn("h-4 w-4", styles.text)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm font-medium truncate", styles.text)}>
                      {fault.description}
                    </p>
                    <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                      {fault.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground font-mono">
                      ID: {fault.machineId}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Confidence: <span className="text-primary font-semibold">{fault.confidence}%</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
