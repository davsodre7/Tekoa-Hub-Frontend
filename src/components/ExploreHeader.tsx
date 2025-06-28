import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterOption {
  key: string;
  label: string;
  type?: string;
}

interface ExploreHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  filters: FilterOption[];
  sortField: 'createdAt';
  setSortField: (field: 'createdAt') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  filters,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder
}) => {
  return (
    <section className="bg-muted/30 cultural-pattern py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Explorar Patrimônio Indígena Brasileiro
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Descubra histórias, tradições e sabedorias dos povos indígenas brasileiros
          </p>

          {/* Search, Filters, Sort, Date Range */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar histórias, artesanato, línguas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {filters.find(f => f.key === selectedFilter)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {filters.map((filter) => (
                  <DropdownMenuItem
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                  >
                    {filter.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Ordenação */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Ordenar por {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { setSortField('createdAt'); setSortOrder('desc'); }}>Mais recentes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortField('createdAt'); setSortOrder('asc'); }}>Mais antigos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </section>
  );
};
