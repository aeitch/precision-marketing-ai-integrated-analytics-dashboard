import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Cpu,
  Eye,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface SidebarProps {
  className?: string;
}

const navItems = [
  {
    title: "Central Hub",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Asset Management",
    icon: Cpu,
    path: "/assets",
  },
  {
    title: "AI Vision Log",
    icon: Eye,
    path: "/vision",
  },
  {
    title: "Alerts",
    icon: Bell,
    path: "/alerts",
    badge: 2,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 flex flex-col",
        "bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Logo Section */}
      <div className={cn(
        "flex items-center gap-3 p-4 border-b border-sidebar-border",
        collapsed && "justify-center"
      )}>
        <img 
          src={logo} 
          alt="Precision Manufacturing" 
          className="h-10 w-10 object-contain"
        />
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-foreground truncate">
              Precision Manufacturing
            </h1>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              Predictive Analytics
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent",
                isActive && "bg-sidebar-accent text-sidebar-primary",
                !isActive && "text-sidebar-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0",
                isActive && "text-sidebar-primary"
              )} />
              
              {!collapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* System Status */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-success animate-pulse" />
            <span className="font-mono">Edge-to-Cloud Streaming</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono">847 Assets Monitored</span>
          </div>
        </div>
      )}

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-background shadow-md hover:bg-muted"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </aside>
  );
}
