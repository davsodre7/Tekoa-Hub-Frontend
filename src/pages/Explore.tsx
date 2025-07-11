import React, { useState, useEffect, useMemo } from 'react';
import { ExploreHeader } from '@/components/ExploreHeader';
import ContentGrid from '@/components/ContentGrid';
import axios from 'axios';
import { Content } from '@/lib/types';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/conteudos`;

export const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [allContent, setAllContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Content[]>(API_URL);
        console.log('Dados recebidos da API:', response.data);
        
        setAllContent(response.data);
      } catch (err) {
        console.error("Erro ao buscar conteúdos:", err);
        setError("Não foi possível carregar os conteúdos. Tente novamente mais tarde.");
        setAllContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const filters = [
    { key: 'all', label: 'Todo Conteúdo' },
    { key: 'stories', label: 'Histórias', type: 'story' },
    { key: 'crafts', label: 'Artesanato Tradicional', type: 'craft' },
    { key: 'music', label: 'Música e Dança', type: 'music' },
    { key: 'language', label: 'Línguas', type: 'language' },
    { key: 'rituals', label: 'Cerimônias e Rituais', type: 'ritual' }
  ];

  const filteredContent = useMemo(() => {
    let filtered = allContent;

    if (selectedFilter !== 'all') {
      const filterType = filters.find(f => f.key === selectedFilter)?.type;
      if (filterType) {
        filtered = filtered.filter(item => item.type === filterType);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(item => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    filtered = [...filtered].sort((a, b) => {
      const aDate = a[sortField] ? new Date(a[sortField]!).getTime() : 0;
      const bDate = b[sortField] ? new Date(b[sortField]!).getTime() : 0;
      return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
    });

    return filtered;
  }, [searchTerm, selectedFilter, filters, allContent, sortField, sortOrder]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-primary">Carregando conteúdos culturais...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ExploreHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filters={filters}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <ContentGrid
        filteredContent={filteredContent}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        setSearchTerm={setSearchTerm}
        filters={filters}
      />
    </div>
  );
};