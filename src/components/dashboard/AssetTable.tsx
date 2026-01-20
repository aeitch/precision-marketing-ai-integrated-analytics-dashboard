import { Asset } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cpu, Cog, Activity, Calendar, MapPin } from "lucide-react";

interface AssetTableProps {
  assets: Asset[];
  className?: string;
}

const statusConfig = {
  operational: {
    label: 'Operational',
    variant: 'success' as const,
  },
  warning: {
    label: 'Warning',
    variant: 'warning' as const,
  },
  critical: {
    label: 'Critical',
    variant: 'destructive' as const,
  },
  maintenance: {
    label: 'Maintenance',
    variant: 'secondary' as const,
  },
};

export function AssetTable({ assets, className }: AssetTableProps) {
  const getHealthColor = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getDaysColor = (days: number) => {
    if (days > 30) return 'text-success';
    if (days > 14) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className={cn("glass-card rounded-lg overflow-hidden", className)}>
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            Asset Management
          </h3>
          <span className="text-xs font-mono text-muted-foreground">
            Edge-to-Cloud Sync Active
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-muted-foreground">Asset ID</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">Name</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">Type</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">Location</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground text-center">Health Score</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground text-center">Maintenance</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => {
              const status = statusConfig[asset.status];
              
              return (
                <TableRow 
                  key={asset.id} 
                  className="border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-mono text-xs text-primary">
                    {asset.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {asset.type === 'modern' ? (
                        <Cpu className="h-4 w-4 text-primary" />
                      ) : (
                        <Cog className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium">{asset.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={asset.type === 'modern' ? 'default' : 'secondary'}
                      className="text-[10px] font-mono uppercase"
                    >
                      {asset.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {asset.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Activity className={cn("h-4 w-4", getHealthColor(asset.healthScore))} />
                      <span className={cn("font-bold font-mono", getHealthColor(asset.healthScore))}>
                        {asset.healthScore}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Calendar className={cn("h-3.5 w-3.5", getDaysColor(asset.daysUntilMaintenance))} />
                      <span className={cn("font-mono text-sm", getDaysColor(asset.daysUntilMaintenance))}>
                        {asset.daysUntilMaintenance} days
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={status.variant}
                      className="text-[10px] font-semibold uppercase"
                    >
                      {status.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
