import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AssetTable } from "@/components/dashboard/AssetTable";
import { generateAssets, type Asset } from "@/lib/mockData";
import { Search, Filter, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>(generateAssets());
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || asset.type === typeFilter;
    const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleRefresh = () => {
    setAssets(generateAssets());
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Asset Management</h1>
            <p className="text-sm text-muted-foreground">
              Monitor legacy and modern hardware health scores and maintenance schedules
            </p>
          </div>

          <Button onClick={handleRefresh} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="legacy">Legacy</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Asset Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Assets</p>
            <p className="text-2xl font-bold text-foreground">{assets.length}</p>
          </div>
          <div className="glass-card rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Operational</p>
            <p className="text-2xl font-bold text-success">
              {assets.filter(a => a.status === 'operational').length}
            </p>
          </div>
          <div className="glass-card rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Warnings</p>
            <p className="text-2xl font-bold text-warning">
              {assets.filter(a => a.status === 'warning').length}
            </p>
          </div>
          <div className="glass-card rounded-lg p-4">
            <p className="text-sm text-muted-foreground">In Maintenance</p>
            <p className="text-2xl font-bold text-muted-foreground">
              {assets.filter(a => a.status === 'maintenance').length}
            </p>
          </div>
        </div>

        {/* Asset Table */}
        <AssetTable assets={filteredAssets} />
      </div>
    </DashboardLayout>
  );
};

export default Assets;