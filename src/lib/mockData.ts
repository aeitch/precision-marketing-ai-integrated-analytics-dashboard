// Mock Data Generator for Precision Manufacturing Predictive Analytics Suite

export interface SensorReading {
  timestamp: Date;
  value: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface Asset {
  id: string;
  name: string;
  type: 'legacy' | 'modern';
  healthScore: number;
  daysUntilMaintenance: number;
  lastInspection: Date;
  status: 'operational' | 'warning' | 'critical' | 'maintenance';
  location: string;
}

export interface MicroFault {
  id: string;
  timestamp: Date;
  type: 'thermal' | 'vibration' | 'structural';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  machineId: string;
  machineName: string;
  confidence: number;
}

export interface Alert {
  id: string;
  timestamp: Date;
  type: 'emergency' | 'warning' | 'info';
  title: string;
  description: string;
  machineId: string;
  failureProbability: number;
  acknowledged: boolean;
}

// Generate random sensor value with controlled fluctuation
function generateSensorValue(baseValue: number, variance: number): number {
  return baseValue + (Math.random() - 0.5) * variance * 2;
}

// Determine status based on temperature thresholds
function getTemperatureStatus(temp: number): 'normal' | 'warning' | 'critical' {
  if (temp >= 85) return 'critical';
  if (temp >= 75) return 'warning';
  return 'normal';
}

// Determine status based on vibration thresholds
function getVibrationStatus(vibration: number): 'normal' | 'warning' | 'critical' {
  if (vibration >= 8) return 'critical';
  if (vibration >= 6) return 'warning';
  return 'normal';
}

// Generate time series data for charts
export function generateTimeSeriesData(hours: number = 24, interval: number = 30): {
  temperature: { time: string; value: number; predicted: number }[];
  vibration: { time: string; value: number; predicted: number }[];
  structural: { time: string; value: number }[];
} {
  const now = new Date();
  const data = {
    temperature: [] as { time: string; value: number; predicted: number }[],
    vibration: [] as { time: string; value: number; predicted: number }[],
    structural: [] as { time: string; value: number }[],
  };

  for (let i = hours * 60; i >= 0; i -= interval) {
    const time = new Date(now.getTime() - i * 60 * 1000);
    const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // Temperature with a spike pattern for demo
    const tempBase = 72 + Math.sin(i / 120) * 8;
    const tempSpike = i < 180 && i > 120 ? 15 : 0;
    const tempValue = generateSensorValue(tempBase + tempSpike, 3);
    const tempPredicted = tempBase + 2 + (i < 60 ? 5 : 0);

    // Vibration data
    const vibBase = 4 + Math.cos(i / 90) * 1.5;
    const vibValue = generateSensorValue(vibBase, 0.8);
    const vibPredicted = vibBase + 0.5;

    // Structural health (higher is better)
    const structValue = 95 - Math.abs(Math.sin(i / 200)) * 8 - (i < 180 && i > 120 ? 5 : 0);

    data.temperature.push({ time: timeStr, value: Math.round(tempValue * 10) / 10, predicted: Math.round(tempPredicted * 10) / 10 });
    data.vibration.push({ time: timeStr, value: Math.round(vibValue * 100) / 100, predicted: Math.round(vibPredicted * 100) / 100 });
    data.structural.push({ time: timeStr, value: Math.round(structValue * 10) / 10 });
  }

  return data;
}

// Generate current sensor readings
export function generateCurrentReadings(): {
  temperature: SensorReading;
  vibration: SensorReading;
  structural: SensorReading;
  overallHealth: number;
} {
  const temp = generateSensorValue(76, 8);
  const vib = generateSensorValue(5.2, 2);
  const struct = generateSensorValue(92, 5);

  const overallHealth = Math.round(
    (100 - (temp > 85 ? 30 : temp > 75 ? 15 : 0)) * 0.35 +
    (100 - (vib > 8 ? 30 : vib > 6 ? 15 : 0)) * 0.35 +
    struct * 0.30
  );

  return {
    temperature: {
      timestamp: new Date(),
      value: Math.round(temp * 10) / 10,
      status: getTemperatureStatus(temp),
    },
    vibration: {
      timestamp: new Date(),
      value: Math.round(vib * 100) / 100,
      status: getVibrationStatus(vib),
    },
    structural: {
      timestamp: new Date(),
      value: Math.round(struct * 10) / 10,
      status: struct >= 90 ? 'normal' : struct >= 80 ? 'warning' : 'critical',
    },
    overallHealth,
  };
}

// Generate mock assets
export function generateAssets(): Asset[] {
  const assetNames = [
    { name: 'CNC Mill Alpha-7', type: 'modern' as const, location: 'Assembly Line A' },
    { name: 'Robot Arm - Axis 3 Bearing', type: 'modern' as const, location: 'Welding Station B' },
    { name: 'Conveyor Belt System A', type: 'legacy' as const, location: 'Main Production Floor' },
    { name: 'Hydraulic Press Unit 12', type: 'legacy' as const, location: 'Forming Section C' },
    { name: 'Laser Cutter LC-500', type: 'modern' as const, location: 'Precision Cutting Bay' },
    { name: 'Industrial Furnace F3', type: 'legacy' as const, location: 'Heat Treatment Zone' },
    { name: 'Automated Welder AW-9', type: 'modern' as const, location: 'Welding Station A' },
    { name: 'Compressor Unit CU-4', type: 'legacy' as const, location: 'Utilities Section' },
  ];

  return assetNames.map((asset, index) => ({
    id: `ASSET-${String(index + 1).padStart(3, '0')}`,
    name: asset.name,
    type: asset.type,
    healthScore: Math.round(generateSensorValue(85, 15)),
    daysUntilMaintenance: Math.round(generateSensorValue(45, 40)),
    lastInspection: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    status: index === 1 ? 'warning' : index === 3 ? 'maintenance' : 'operational',
    location: asset.location,
  }));
}

// Generate micro-faults detected by AI Vision
export function generateMicroFaults(): MicroFault[] {
  const faultTypes = [
    { type: 'thermal' as const, desc: 'Thermal Spike on', severity: 'high' as const },
    { type: 'vibration' as const, desc: 'Vibration Anomaly on', severity: 'medium' as const },
    { type: 'structural' as const, desc: 'Micro-crack Detected on', severity: 'critical' as const },
    { type: 'thermal' as const, desc: 'Heat Dissipation Warning on', severity: 'low' as const },
  ];

  const machines = [
    { id: 'CNC-002', name: 'CNC Mill 2' },
    { id: 'CNC-001', name: 'CNC Mill 1' },
    { id: 'CONV-A', name: 'Conveyor Belt A' },
    { id: 'ROBO-4', name: 'Robot Arm 4' },
    { id: 'WELD-9', name: 'Welder AW-9' },
  ];

  const faults: MicroFault[] = [];
  const now = new Date();

  for (let i = 0; i < 8; i++) {
    const fault = faultTypes[Math.floor(Math.random() * faultTypes.length)];
    const machine = machines[Math.floor(Math.random() * machines.length)];
    
    faults.push({
      id: `FAULT-${String(i + 1).padStart(4, '0')}`,
      timestamp: new Date(now.getTime() - i * 15 * 60 * 1000),
      type: fault.type,
      severity: fault.severity,
      description: `${fault.desc} ${machine.name}`,
      machineId: machine.id,
      machineName: machine.name,
      confidence: Math.round(generateSensorValue(92, 8)),
    });
  }

  return faults.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Generate emergency alerts
export function generateAlerts(): Alert[] {
  return [
    {
      id: 'ALERT-001',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'emergency',
      title: 'Critical Temperature Threshold Exceeded',
      description: 'Robot Arm 4 - Axis 3 Bearing operating at 87°C. Immediate inspection required.',
      machineId: 'ROBO-4',
      failureProbability: 78,
      acknowledged: false,
    },
    {
      id: 'ALERT-002',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: 'warning',
      title: 'Predictive Maintenance Due',
      description: 'CNC Mill 2 showing early signs of bearing wear. Schedule maintenance within 48 hours.',
      machineId: 'CNC-002',
      failureProbability: 45,
      acknowledged: false,
    },
    {
      id: 'ALERT-003',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'info',
      title: 'PyTorch Analysis Complete',
      description: 'Edge-to-Cloud streaming inference completed for Assembly Line A. No anomalies detected.',
      machineId: 'ASM-A',
      failureProbability: 5,
      acknowledged: true,
    },
  ];
}

// Key performance metrics from case study
export const keyMetrics = {
  downtimeReduction: 50,
  costSavings: 20,
  safetyIncrease: 15,
  inferenceAccuracy: 94.7,
  assetsMonitored: 847,
  alertsProcessed: 12453,
};
