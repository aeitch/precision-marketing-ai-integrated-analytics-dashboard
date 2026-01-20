import { cn } from "@/lib/utils";
import { Bell, Settings, User, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  overallHealth: number;
  className?: string;
}

export function Header({ overallHealth, className }: HeaderProps) {
  const healthStatus = overallHealth >= 90 ? 'Stable' : overallHealth >= 75 ? 'Warning' : 'Critical';
  const healthColor = overallHealth >= 90 ? 'text-success' : overallHealth >= 75 ? 'text-warning' : 'text-destructive';

  return (
    <header className={cn(
      "sticky top-0 z-30 flex items-center justify-between px-6 py-3",
      "bg-background/80 backdrop-blur-xl border-b border-border",
      className
    )}>
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Precision Manufacturing Ltd — Predictive Analytics Suite
          </h1>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50 border border-border">
          <Activity className={cn("h-4 w-4", healthColor)} />
          <span className="text-sm text-muted-foreground">
            Overall Assembly Line Health:
          </span>
          <span className={cn("text-lg font-bold", healthColor)}>
            {overallHealth}%
          </span>
          <Badge 
            variant={overallHealth >= 90 ? "success" : overallHealth >= 75 ? "warning" : "destructive"}
            className="text-[10px] uppercase font-semibold"
          >
            {healthStatus}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          Schedule Maintenance
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            2
          </span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
