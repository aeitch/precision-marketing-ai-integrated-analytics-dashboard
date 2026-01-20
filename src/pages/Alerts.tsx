import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import { generateAlerts, type Alert } from "@/lib/mockData";
import { Bell, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts());
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const handleAcknowledge = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleAcknowledgeAll = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
  };

  const filteredAlerts = alerts.filter(alert => 
    typeFilter === "all" || alert.type === typeFilter
  );

  const alertCounts = {
    total: alerts.length,
    unacknowledged: alerts.filter(a => !a.acknowledged).length,
    emergency: alerts.filter(a => a.type === 'emergency').length,
    warning: alerts.filter(a => a.type === 'warning').length,
    info: alerts.filter(a => a.type === 'info').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Alert Center</h1>
            <p className="text-sm text-muted-foreground">
              Emergency alerts and notifications for supervisors
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alerts</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleAcknowledgeAll}
              variant="outline"
              disabled={alertCounts.unacknowledged === 0}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Acknowledge All
            </Button>
          </div>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Alerts</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{alertCounts.total}</p>
          </div>

          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Unacknowledged</span>
            </div>
            <p className="text-2xl font-bold text-primary">{alertCounts.unacknowledged}</p>
          </div>

          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Emergency</span>
            </div>
            <p className="text-2xl font-bold text-destructive">{alertCounts.emergency}</p>
          </div>

          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">Warnings</span>
            </div>
            <p className="text-2xl font-bold text-warning">{alertCounts.warning}</p>
          </div>

          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Info</span>
            </div>
            <p className="text-2xl font-bold text-muted-foreground">{alertCounts.info}</p>
          </div>
        </div>

        {/* Alert Configuration Info */}
        <div className="glass-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Alert Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="font-medium text-destructive mb-1">Emergency Triggers</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Temperature exceeds 85°C threshold</li>
                <li>• Vibration exceeds 8 mm/s</li>
                <li>• Structural health below 75%</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="font-medium text-warning mb-1">Warning Triggers</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Temperature exceeds 75°C</li>
                <li>• Maintenance due within 14 days</li>
                <li>• Anomaly confidence above 80%</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="font-medium text-primary mb-1">Notification Channels</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• In-app real-time notifications</li>
                <li>• Email to shift supervisors</li>
                <li>• SMS for emergency alerts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alert List */}
        <AlertPanel 
          alerts={filteredAlerts}
          onAcknowledge={handleAcknowledge}
        />
      </div>
    </DashboardLayout>
  );
};

export default Alerts;