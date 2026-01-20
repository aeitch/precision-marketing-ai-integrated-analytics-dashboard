import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import { cn } from "@/lib/utils";

interface SensorChartProps {
  data: { time: string; value: number; predicted?: number }[];
  title: string;
  unit: string;
  criticalThreshold?: number;
  warningThreshold?: number;
  color: 'primary' | 'success' | 'warning' | 'destructive';
  className?: string;
}

const colorMap = {
  primary: "hsl(187, 85%, 53%)",
  success: "hsl(142, 71%, 45%)",
  warning: "hsl(38, 92%, 50%)",
  destructive: "hsl(0, 72%, 51%)",
};

export function SensorChart({
  data,
  title,
  unit,
  criticalThreshold,
  warningThreshold,
  color,
  className,
}: SensorChartProps) {
  const chartColor = colorMap[color];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground font-mono mb-1">{label}</p>
          <p className="text-sm font-semibold" style={{ color: chartColor }}>
            Actual: {payload[0]?.value} {unit}
          </p>
          {payload[1] && (
            <p className="text-sm text-muted-foreground">
              Predicted: {payload[1]?.value} {unit}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("glass-card rounded-lg p-5", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded" style={{ backgroundColor: chartColor }} />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded bg-muted-foreground/50" />
            <span className="text-muted-foreground">Predicted</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 15%)" vertical={false} />
          
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
            interval="preserveStartEnd"
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
            domain={['auto', 'auto']}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          {criticalThreshold && (
            <ReferenceLine 
              y={criticalThreshold} 
              stroke="hsl(0, 72%, 51%)" 
              strokeDasharray="5 5"
              strokeWidth={1.5}
            />
          )}
          
          {warningThreshold && (
            <ReferenceLine 
              y={warningThreshold} 
              stroke="hsl(38, 92%, 50%)" 
              strokeDasharray="5 5"
              strokeWidth={1.5}
            />
          )}

          <Area
            type="monotone"
            dataKey="value"
            stroke="transparent"
            fill={`url(#gradient-${color})`}
          />
          
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="hsl(215, 20%, 45%)"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
          />
          
          <Line
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: chartColor, strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
