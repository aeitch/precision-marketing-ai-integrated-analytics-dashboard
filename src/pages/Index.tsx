import { useState, useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SensorChart } from "@/components/dashboard/SensorChart";
import { MicroFaultLog } from "@/components/dashboard/MicroFaultLog";
import { KeyMetrics } from "@/components/dashboard/KeyMetrics";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import {
  generateCurrentReadings,
  generateTimeSeriesData,
  generateMicroFaults,
  generateAlerts,
  type Alert,
} from "@/lib/mockData";
import { Thermometer, Activity, Layers, Gauge } from "lucide-react";

const Index = () => {
  const [readings, setReadings] = useState(generateCurrentReadings());
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData(12, 30));
  const [microFaults, setMicroFaults] = useState(generateMicroFaults());
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts());

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setReadings(generateCurrentReadings());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update time series data less frequently
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeriesData(generateTimeSeriesData(12, 30));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Key Metrics Banner */}
        <KeyMetrics />

        {/* Real-time Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Heat Signatures (Thermal)"
            value={readings.temperature.value}
            unit="°C"
            icon={Thermometer}
            status={readings.temperature.status}
            subtitle={readings.temperature.status === 'critical' ? 'HIGH RISK — Exceeds 85°C threshold' : 'Within operational limits'}
          />
          
          <StatCard
            title="Vibration Analysis"
            value={readings.vibration.value}
            unit="mm/s"
            icon={Activity}
            status={readings.vibration.status}
            subtitle="Real-time accelerometer data"
          />
          
          <StatCard
            title="Visual Structural Health"
            value={readings.structural.value}
            unit="%"
            icon={Layers}
            status={readings.structural.status}
            subtitle="Computer Vision scan results"
          />
          
          <StatCard
            title="Overall System Score"
            value={readings.overallHealth}
            unit="%"
            icon={Gauge}
            status={readings.overallHealth >= 90 ? 'normal' : readings.overallHealth >= 75 ? 'warning' : 'critical'}
            subtitle="Aggregate health index"
          />
        </div>

        {/* Charts and Logs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Temperature Chart */}
          <SensorChart
            data={timeSeriesData.temperature}
            title="Predictive Maintenance Forecast — Thermal"
            unit="°C"
            criticalThreshold={85}
            warningThreshold={75}
            color="warning"
            className="lg:col-span-2"
          />
          
          {/* Micro-fault Log */}
          <MicroFaultLog faults={microFaults} />
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SensorChart
            data={timeSeriesData.vibration}
            title="Vibration Analysis — Time Series"
            unit="mm/s"
            criticalThreshold={8}
            warningThreshold={6}
            color="primary"
          />
          
          <SensorChart
            data={timeSeriesData.structural}
            title="Structural Health Index"
            unit="%"
            color="success"
          />
        </div>

        {/* Alert Panel */}
        <AlertPanel 
          alerts={alerts} 
          onAcknowledge={handleAcknowledge}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;