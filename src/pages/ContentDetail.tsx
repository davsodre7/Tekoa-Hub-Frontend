import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContentDetailData {
  id: string;
  title: string;
  description: string;
  type: string;
  ethnicity: string;
  region: string;
  imageUrl: string;
  creator?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ContentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<ContentDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/conteudos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then(data => setContent(data))
      .catch(() => setError('Conteúdo não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-primary">Carregando...</div>;
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl text-red-500">
        {error || 'Conteúdo não encontrado.'}
        <Link to="/explore" className="mt-4 text-primary underline">Voltar para Explorar</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-2">
      <div className="container mx-auto max-w-2xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/explore" className="hover:underline text-primary">Explorar</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{content.title}</span>
        </nav>
        <Card className="overflow-hidden shadow-lg">
          <div className="aspect-video relative overflow-hidden bg-gray-100">
            <img
              src={content.imageUrl.startsWith('/assets/')
                ? `${import.meta.env.VITE_BACKEND_URL}${content.imageUrl}`
                : `${import.meta.env.VITE_BACKEND_URL}/assets/${content.imageUrl}`}
              alt={content.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="capitalize">Tipo: {content.type === 'story' ? 'História' : content.type === 'craft' ? 'Artesanato' : content.type === 'music' ? 'Música' : content.type === 'language' ? 'Língua' : content.type === 'ritual' ? 'Ritual' : content.type}</Badge>
              <Badge variant="outline">Etnia: {content.ethnicity}</Badge>
              {content.region && (
                <Badge variant="outline">Região: {content.region}</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4 text-primary">{content.title}</h1>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{content.description}</p>
            {content.createdAt && (
              <p className="text-xs text-muted-foreground mb-1">
                Criado em: {new Date(content.createdAt).toLocaleDateString('pt-BR')}
              </p>
            )}
            {content.creator && (
              <p className="text-xs text-muted-foreground mb-4">
                Compartilhado por: {content.creator}
              </p>
            )}
            <Link to="/explore" className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">← Voltar para Explorar</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentDetail; 