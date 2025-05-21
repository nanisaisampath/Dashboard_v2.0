import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useDashboard } from '@/context/DashboardContext';
import { calculateMetrics } from '@/utils/dataProcessor';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const SummaryCards = () => {
  const { filteredData, isLoading, filters } = useDashboard();
  
  // Calculate metrics from filtered data
  const metrics = React.useMemo(() => {
    if (!filteredData) return { 
      totalTickets: 0
    };
    
    return calculateMetrics(filteredData);
  }, [filteredData]);

  // Get active filters to display as badges
  const getActiveFilters = () => {
    const activeFilters = [];
    
    if (filters.technology && filters.technology !== 'All') {
      activeFilters.push({ label: 'Technology', value: filters.technology });
    }
    
    if (filters.client && filters.client !== 'All') {
      activeFilters.push({ label: 'Client', value: filters.client });
    }
    
    if (filters.ticketType && filters.ticketType !== 'All') {
      activeFilters.push({ label: 'Ticket Type', value: filters.ticketType });
    }
    
    if (filters.status && filters.status !== 'All') {
      activeFilters.push({ label: 'Status', value: filters.status });
    }
    
    if (filters.assignedTo && filters.assignedTo !== 'All') {
      activeFilters.push({ label: 'Assigned To', value: filters.assignedTo });
    }
    
    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="grid grid-cols-1 gap-8 mb-10">
      {/* Total Tickets */}
      <Card className="summary-card bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
        <CardContent className="p-6 flex flex-col">
          <h3 className="text-sm font-medium text-muted-foreground">Total Tickets</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold">
              {isLoading ? '...' : metrics.totalTickets}
            </p>
          </div>
          
          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium shadow-sm"
            >
          {filter.label}: {filter.value}
    </span>
  ))}
</div>

          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;