import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Content } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Heart, Users, MapPin, Tag } from "lucide-react";
import ContentModal from './ContentModal';
import { useLikes } from '@/hooks/useLikes';

const ContentCard = (content: Content) => {
  const { id, title, type, description, imageUrl, createdAt, likesCount: initialLikesCount = 0, ethnicity, region, category } = content;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLiked, likesCount, toggleLike } = useLikes(id.toString(), initialLikesCount);

  const placeholderImage = '/placeholder.svg';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fullImageUrl = imageUrl ? `${backendUrl}${imageUrl}` : placeholderImage;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderImage;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previne que o clique no botão abra o modal
    toggleLike();
  };

  const formattedDate = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ptBR })
    : 'Data indisponível';

  return (
    <>
      <Card 
        className="h-full flex flex-col rounded-xl overflow-hidden border bg-card group"
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader className="p-0 relative overflow-hidden">
        <img 
            src={fullImageUrl}
            alt={`Imagem para ${title}`}
            onError={handleImageError}
            className="w-full h-48 object-cover cursor-pointer"
            loading="lazy"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white/90 backdrop-blur-sm transition-all duration-200 ${
              isLiked ? 'text-red-500' : 'text-gray-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </CardHeader>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center space-x-2 mb-3">
              <Badge variant="highlight">{type === 'story' ? 'História' : type === 'craft' ? 'Artesanato' : type === 'music' ? 'Música' : type === 'language' ? 'Língua' : type === 'ritual' ? 'Ritual' : type}</Badge>
        </div>
          <CardTitle className="text-xl font-bold leading-tight mb-3 cursor-text">
            {title}
          </CardTitle>
          <p className="text-muted-foreground text-sm flex-1 cursor-text">{description}</p>
          
          {/* Ethnicity and Region Information */}
          <div className="mt-4 space-y-2">
            {ethnicity && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-text">
                <Users className="h-3 w-3" />
                <span className="font-medium">Etnia:</span>
                <span>{ethnicity === 'Guarani' ? 'Tupi-Guarani' : ethnicity}</span>
              </div>
            )}
            {region && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-text">
                <MapPin className="h-3 w-3" />
                <span className="font-medium">Região:</span>
                <span>{region}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center text-xs text-muted-foreground">
          <TooltipProvider>
              <Tooltip>
                  <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2 cursor-default cursor-text">
                          <Calendar size={14} />
                          <span>{formattedDate}</span>
      </div>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Publicado em {createdAt ? new Date(createdAt).toLocaleDateString('pt-BR') : 'N/A'}</p>
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>
          {likesCount > 0 && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Heart className="h-3 w-3" />
              <span>{likesCount}</span>
        </div>
          )}
      </CardFooter>
    </Card>
      
      <ContentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={content}
        isLiked={isLiked}
        likesCount={likesCount}
        toggleLike={toggleLike}
      />
    </>
  );
};

export default ContentCard;