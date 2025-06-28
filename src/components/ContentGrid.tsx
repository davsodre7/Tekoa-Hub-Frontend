import React, { useState, useMemo } from 'react';
import ContentCard from '@/components/ContentCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content } from '@/lib/types';

interface FilterOption {
  key: string;
  label: string;
  type?: string;
}

interface ContentGridProps {
  filteredContent: Content[];
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  setSearchTerm: (term: string) => void;
  filters: FilterOption[];
}

const ContentGrid: React.FC<ContentGridProps> = ({
  filteredContent,
  selectedFilter,
  setSelectedFilter,
  setSearchTerm,
  filters
}) => {
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFilter('all');
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 lg:px-8" aria-live="polite">
        {filteredContent.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Mostrando {filteredContent.length} resultado{filteredContent.length !== 1 ? 's' : ''}
              </p>
              {selectedFilter !== 'all' && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => setSelectedFilter('all')}
                >
                  {filters.find(f => f.key === selectedFilter)?.label} ×
                </Badge>
              )}
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              role="region"
              aria-label="Grade de conteúdos culturais"
            >
              {filteredContent.map((item, idx) => (
                <div key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <ContentCard {...item} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              Nenhum conteúdo encontrado com os critérios de busca.
            </p>
            <Button onClick={handleClearFilters}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentGrid;
