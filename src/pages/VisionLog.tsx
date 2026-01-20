import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MicroFaultLog } from "@/components/dashboard/MicroFaultLog";
import { generateMicroFaults, type MicroFault } from "@/lib/mockData";
import { Eye, Camera, Cpu, BarChart3, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VisionLog = () => {
  const [faults, setFaults] = useState<MicroFault[]>(generateMicroFaults());
  const [isScanning, setIsScanning] = useState(false);

  const handleNewScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setFaults(generateMicroFaults());
      setIsScanning(false);
    }, 2000);
  };

  const faultStats = {
    thermal: faults.filter(f => f.type === 'thermal').length,
    vibration: faults.filter(f => f.type === 'vibration').length,
    structural: faults.filter(f => f.type === 'structural').length,
    critical: faults.filter(f => f.severity === 'critical').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Vision Log</h1>
            <p className="text-sm text-muted-foreground">
              Computer Vision results for structural scans and micro-fault detection
            </p>
          </div>

          <Button 
            onClick={handleNewScan} 
            disabled={isScanning}
            className="gap-2"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4" />
                Run New Scan
              </>
            )}
          </Button>
        </div>

        {/* Vision System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-lg p-5 border-l-4 border-l-primary">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Cpu className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Inference Engine
              </span>
            </div>
            <p className="text-lg font-bold text-foreground">PyTorch v2.1</p>
            <p className="text-xs text-muted-foreground mt-1">
              Edge-optimized model deployment
            </p>
          </div>

          <div className="glass-card rounded-lg p-5 border-l-4 border-l-success">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-success/10">
                <BarChart3 className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Model Accuracy
              </span>
            </div>
            <p className="text-lg font-bold text-success">94.7%</p>
            <p className="text-xs text-muted-foreground mt-1">
              Cross-validated performance
            </p>
          </div>

          <div className="glass-card rounded-lg p-5 border-l-4 border-l-warning">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Eye className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Scans Today
              </span>
            </div>
            <p className="text-lg font-bold text-foreground">847</p>
            <p className="text-xs text-muted-foreground mt-1">
              Continuous streaming analysis
            </p>
          </div>

          <div className="glass-card rounded-lg p-5 border-l-4 border-l-destructive">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <Camera className="h-5 w-5 text-destructive" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Critical Detections
              </span>
            </div>
            <p className="text-lg font-bold text-destructive">{faultStats.critical}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Requires immediate attention
            </p>
          </div>
        </div>

        {/* Detection Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={cn(
            "glass-card rounded-lg p-5 transition-all hover:scale-[1.02]",
            "border-l-4 border-l-warning"
          )}>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Thermal Anomalies
            </h3>
            <p className="text-3xl font-bold text-warning mb-2">
              {faultStats.thermal}
            </p>
            <p className="text-xs text-muted-foreground">
              Heat signature deviations detected via infrared imaging
            </p>
          </div>

          <div className={cn(
            "glass-card rounded-lg p-5 transition-all hover:scale-[1.02]",
            "border-l-4 border-l-primary"
          )}>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Vibration Patterns
            </h3>
            <p className="text-3xl font-bold text-primary mb-2">
              {faultStats.vibration}
            </p>
            <p className="text-xs text-muted-foreground">
              Accelerometer anomalies indicating mechanical wear
            </p>
          </div>

          <div className={cn(
            "glass-card rounded-lg p-5 transition-all hover:scale-[1.02]",
            "border-l-4 border-l-destructive"
          )}>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Structural Defects
            </h3>
            <p className="text-3xl font-bold text-destructive mb-2">
              {faultStats.structural}
            </p>
            <p className="text-xs text-muted-foreground">
              Micro-cracks and deformations via visual inspection
            </p>
          </div>
        </div>

        {/* Fault Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MicroFaultLog faults={faults} className="lg:col-span-2" />
        </div>

        {/* Technical Details */}
        <div className="glass-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Edge-to-Cloud Streaming Pipeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Edge Sensors</p>
              <p className="text-xs text-muted-foreground">
                Industrial cameras & thermal arrays
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-warning/20 flex items-center justify-center">
                <Cpu className="h-6 w-6 text-warning" />
              </div>
              <p className="text-sm font-medium">Edge Inference</p>
              <p className="text-xs text-muted-foreground">
                Local PyTorch model execution
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-success" />
              </div>
              <p className="text-sm font-medium">Cloud Analytics</p>
              <p className="text-xs text-muted-foreground">
                Aggregated trend analysis
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                <Eye className="h-6 w-6 text-destructive" />
              </div>
              <p className="text-sm font-medium">Alert System</p>
              <p className="text-xs text-muted-foreground">
                Real-time supervisor notifications
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VisionLog;