import { cn } from "@/lib/utils";
import { TrendingDown, DollarSign, Shield, Target } from "lucide-react";

interface KeyMetricsProps {
  className?: string;
}

const metrics = [
  {
    icon: TrendingDown,
    value: "50%",
    label: "Downtime Reduction",
    description: "Predictive maintenance impact",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: DollarSign,
    value: "20%",
    label: "Cost Savings",
    description: "Operational efficiency gains",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Shield,
    value: "15%",
    label: "Safety Increase",
    description: "Incident prevention rate",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Target,
    value: "94.7%",
    label: "Inference Accuracy",
    description: "PyTorch model performance",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function KeyMetrics({ className }: KeyMetricsProps) {
  return (
    <div className={cn("glass-card rounded-lg p-5", className)}>
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Key Performance Results
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className={cn("inline-flex p-2 rounded-lg mb-3", metric.bg)}>
              <metric.icon className={cn("h-5 w-5", metric.color)} />
            </div>
            
            <div className={cn("text-2xl font-bold mb-1", metric.color)}>
              {metric.value}
            </div>
            
            <div className="text-sm font-medium text-foreground mb-0.5">
              {metric.label}
            </div>
            
            <div className="text-[11px] text-muted-foreground">
              {metric.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
