import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUpDown, 
  Loader2,
  BookOpen,
  Brush,
  Music,
  Languages,
  Drama,
  MoreHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Content } from '@/lib/types';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/conteudos`;

const typeIcons: { [key: string]: React.ElementType } = {
  story: BookOpen,
  história: BookOpen,
  historia: BookOpen,
  craft: Brush,
  artesanato: Brush,
  music: Music,
  música: Music,
  musica: Music,
  language: Languages,
  linguagem: Languages,
  ritual: Drama,
  default: MoreHorizontal,
};

// Função utilitária para traduzir e capitalizar o tipo
const getTypeLabel = (type: string) => {
  switch (type) {
    case 'story':
    case 'história':
    case 'historia':
      return 'História';
    case 'craft':
    case 'artesanato':
      return 'Artesanato';
    case 'music':
    case 'música':
    case 'musica':
      return 'Música';
    case 'language':
    case 'linguagem':
      return 'Língua';
    case 'ritual':
      return 'Ritual';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

const ContentList: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortField, setSortField] = useState<'createdAt' | 'title' | 'type'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; contentId: number | null; contentTitle: string }>({
    isOpen: false,
    contentId: null,
    contentTitle: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Buscar conteúdos da API ao carregar a página
  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    setIsLoading(true);
      try {
      const response = await axios.get(API_URL);
      setContents(response.data);
      } catch (error) {
      console.error("Erro ao buscar conteúdos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os conteúdos.",
        variant: "destructive",
      });
      setContents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para abrir diálogo de exclusão
  const handleDeleteClick = (content: Content) => {
    setDeleteDialog({
      isOpen: true,
      contentId: content.id,
      contentTitle: content.title
    });
  };

  // Função para confirmar exclusão
  const handleDeleteConfirm = async () => {
    if (!deleteDialog.contentId) return;

    try {
      await axios.delete(`${API_URL}/${deleteDialog.contentId}`);
      setContents(contents.filter(content => content.id !== deleteDialog.contentId));
      toast({
        title: "Sucesso",
        description: "Conteúdo excluído com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao excluir conteúdo:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o conteúdo.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialog({ isOpen: false, contentId: null, contentTitle: '' });
    }
  };

  const sortedAndFilteredContents = useMemo(() => {
    let filtered = contents;
    if (searchTerm) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.ethnicity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.region?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType !== 'all') {
      filtered = filtered.filter(content => content.type === selectedType);
    }
    return [...filtered].sort((a, b) => {
        let aValue: any = a[sortField];
        let bValue: any = b[sortField];
        if (sortField === 'createdAt') {
          aValue = new Date(aValue || 0).getTime();
          bValue = new Date(bValue || 0).getTime();
        } else {
          aValue = String(aValue || '').toLowerCase();
          bValue = String(bValue || '').toLowerCase();
        }
        return sortOrder === 'asc' ? aValue - bValue : -1 * (bValue - aValue);
    });
  }, [contents, searchTerm, selectedType, sortField, sortOrder]);

  const typeOptions = [
    { value: 'all', label: 'Todos os tipos' },
    { value: 'story', label: 'História' },
    { value: 'craft', label: 'Artesanato' },
    { value: 'music', label: 'Música' },
    { value: 'language', label: 'Língua' },
    { value: 'ritual', label: 'Ritual' },
  ];

  const renderContent = () => {
    if (isMobile) {
      return (
        <div className="space-y-4">
          {sortedAndFilteredContents.map(content => {
            const Icon = typeIcons[content.type] || typeIcons.default;
            return (
              <Card key={content.id} className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span className="font-bold text-lg leading-tight">{content.title}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/admin/conteudos/${content.id}/editar`)}>
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(content)} className="text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="outline">{getTypeLabel(content.type)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Criado em: {new Date(content.createdAt).toLocaleDateString()}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      );
    }

    return (
      <Card className="shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Etnia/Região</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredContents.map(content => {
              const Icon = typeIcons[content.type] || typeIcons.default;
              return (
                <TableRow key={content.id}>
                  <TableCell className="font-medium">{content.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline">{getTypeLabel(content.type)}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{content.ethnicity || '-'} / {content.region || '-'}</TableCell>
                  <TableCell>{new Date(content.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/conteudos/${content.id}/editar`)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(content)} className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Conteúdos</h1>
          <p className="text-muted-foreground">
            {sortedAndFilteredContents.length} conteúdo(s) encontrado(s)
          </p>
        </div>
        <Link to="/admin/conteudos/novo">
          <Button className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" /> Novo Conteúdo
          </Button>
        </Link>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por título, etnia, região..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Type select can be added here if needed */}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : renderContent()}
      
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ ...deleteDialog, isOpen: false })}
        onConfirm={handleDeleteConfirm}
        title={`Excluir "${deleteDialog.contentTitle}"`}
        description="Esta ação não pode ser desfeita. Tem certeza que deseja excluir este conteúdo permanentemente?"
      />
    </div>
  );
};

export default ContentList; 