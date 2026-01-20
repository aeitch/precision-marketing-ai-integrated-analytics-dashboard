import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status: 'normal' | 'warning' | 'critical';
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}

export function StatCard({
  title,
  value,
  unit,
  icon: Icon,
  status,
  subtitle,
  trend,
  className,
}: StatCardProps) {
  const statusStyles = {
    normal: {
      border: 'border-success/30',
      glow: 'glow-success',
      text: 'text-success',
      bg: 'bg-success/10',
    },
    warning: {
      border: 'border-warning/30',
      glow: 'glow-warning',
      text: 'text-warning',
      bg: 'bg-warning/10',
    },
    critical: {
      border: 'border-destructive/30',
      glow: 'glow-destructive',
      text: 'text-destructive',
      bg: 'bg-destructive/10',
    },
  };

  const styles = statusStyles[status];

  return (
    <div
      className={cn(
        "glass-card rounded-lg p-5 transition-all duration-300 hover:scale-[1.02]",
        styles.border,
        status === 'critical' && "animate-pulse-glow",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2.5 rounded-lg", styles.bg)}>
          <Icon className={cn("h-5 w-5", styles.text)} />
        </div>
        {status === 'critical' && (
          <span className="relative flex h-3 w-3">
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", styles.bg)} />
            <span className={cn("relative inline-flex rounded-full h-3 w-3", styles.bg)} />
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
      
      <div className="flex items-baseline gap-1">
        <span className={cn("stat-value", styles.text)}>
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground font-medium">{unit}</span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          {subtitle}
        </p>
      )}
    </div>
  );
}
