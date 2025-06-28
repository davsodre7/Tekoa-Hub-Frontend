import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Content } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlayCircle, Mic, Heart } from "lucide-react";

interface ContentModalProps {
  content: Content | null;
  isOpen: boolean;
  onClose: () => void;
  isLiked: boolean;
  likesCount: number;
  toggleLike: () => void;
}

const ContentModal = ({ 
  content, 
  isOpen, 
  onClose,
  isLiked,
  likesCount,
  toggleLike
}: ContentModalProps) => {
  if (!content) return null;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fullImageUrl = content.imageUrl
    ? `${backendUrl}${content.imageUrl}`
    : "/placeholder.svg";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-full grid-rows-[auto_1fr_auto] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-3xl font-bold">{content.title}</DialogTitle>
          <div className="flex items-center gap-2 pt-2">
            <Badge variant="highlight">{content.type === 'story' ? 'História' : content.type === 'craft' ? 'Artesanato' : content.type === 'music' ? 'Música' : content.type === 'language' ? 'Língua' : content.type === 'ritual' ? 'Ritual' : content.type}</Badge>
            <Badge variant="outline">{content.ethnicity === 'Guarani' ? 'Tupi-Guarani' : (content.ethnicity || 'Etnia não especificada')}</Badge>
            <Badge variant="outline">{content.region || 'Região não especificada'}</Badge>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] h-full">
            <div className="px-6 py-4">
                <div className="relative mb-4">
                    <img
                        src={fullImageUrl}
                        alt={`Imagem para ${content.title}`}
                        onError={handleImageError}
                        className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                        loading="lazy"
                    />
                </div>
                
                <DialogDescription className="text-base text-foreground leading-relaxed">
                    {content.description}
                </DialogDescription>

                {/* Placeholder for Audio/Video */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Mídia Adicional</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="w-full justify-start items-center gap-2" disabled>
                            <Mic size={18} />
                            <span>Ouvir narração (Indisponível)</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start items-center gap-2" disabled>
                            <PlayCircle size={18} />
                            <span>Assistir vídeo (Indisponível)</span>
                        </Button>
                    </div>
                </div>

                {content.creator && (
                    <div className="mt-6 text-sm text-muted-foreground">
                        <p><strong>Colaborador:</strong> {content.creator}</p>
                    </div>
                )}
            </div>
        </ScrollArea>
        
        <DialogFooter className="p-6 pt-4 flex justify-center border-t">
            <Button 
              variant={isLiked ? "default" : "outline"}
              onClick={toggleLike}
              className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Curtido" : "Curtir"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal; 