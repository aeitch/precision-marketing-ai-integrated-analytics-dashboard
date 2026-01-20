import { Alert } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AlertPanelProps {
  alerts: Alert[];
  onAcknowledge?: (id: string) => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

const alertStyles = {
  emergency: {
    icon: AlertTriangle,
    bg: 'bg-destructive/10',
    border: 'border-destructive/50',
    iconColor: 'text-destructive',
    glow: 'shadow-[0_0_20px_hsl(0,72%,51%,0.3)]',
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-warning/10',
    border: 'border-warning/50',
    iconColor: 'text-warning',
    glow: '',
  },
  info: {
    icon: Info,
    bg: 'bg-primary/10',
    border: 'border-primary/50',
    iconColor: 'text-primary',
    glow: '',
  },
};

export function AlertPanel({ alerts, onAcknowledge, onDismiss, className }: AlertPanelProps) {
  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className={cn("glass-card rounded-lg overflow-hidden", className)}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-foreground">
            Alert Center
          </h3>
          {unacknowledgedCount > 0 && (
            <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
              {unacknowledgedCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Inference Engine Active
        </span>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-3 space-y-3">
          {alerts.map((alert) => {
            const styles = alertStyles[alert.type];
            const Icon = styles.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  "p-4 rounded-lg border transition-all",
                  styles.bg,
                  styles.border,
                  !alert.acknowledged && styles.glow,
                  alert.acknowledged && "opacity-60"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg", styles.bg)}>
                    <Icon className={cn("h-5 w-5", styles.iconColor)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">
                        {alert.title}
                      </h4>
                      <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                        {alert.timestamp.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">
                      {alert.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          Machine: <span className="text-primary">{alert.machineId}</span>
                        </span>
                        <span className="text-[10px] font-mono">
                          Failure Risk: 
                          <span className={cn(
                            "ml-1 font-bold",
                            alert.failureProbability >= 70 ? "text-destructive" :
                            alert.failureProbability >= 40 ? "text-warning" : "text-success"
                          )}>
                            {alert.failureProbability}%
                          </span>
                        </span>
                      </div>

                      {!alert.acknowledged && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs"
                            onClick={() => onAcknowledge?.(alert.id)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Acknowledge
                          </Button>
                        </div>
                      )}
                    </div>
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
