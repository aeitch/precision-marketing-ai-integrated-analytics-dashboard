import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { generateCurrentReadings } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [overallHealth, setOverallHealth] = useState(94);

  // Simulate live health updates
  useEffect(() => {
    const interval = setInterval(() => {
      const readings = generateCurrentReadings();
      setOverallHealth(readings.overallHealth);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64 transition-all duration-300">
        <Header overallHealth={overallHealth} />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
