import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const ContentForm: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const contentSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    type: z.enum(['story', 'craft', 'music', 'language', 'ritual'], { message: 'Tipo inválido' }),
    ethnicity: z.string().optional(),
    region: z.string().optional(),
    imageUrl: z.string()
      .min(1, 'URL da imagem é obrigatória')
      .refine(
        (val) => val.startsWith('/') || /^https?:\/\/.+\..+/.test(val),
        { message: 'URL da imagem inválida' }
      ),
    creator: z.string().optional(),
  });

  type ContentFormValues = z.infer<typeof contentSchema>;

  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/conteudos`;

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
  });

  useEffect(() => {
    if (isEditMode) {
      setIsLoadingData(true);
      axios.get(`${API_URL}/${id}`)
        .then(response => {
          const content = response.data;
          reset(content);
        })
        .catch(error => {
          console.error("Erro ao buscar conteúdo:", error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar o conteúdo para edição.",
            variant: "destructive",
          });
        })
        .finally(() => setIsLoadingData(false));
    }
  }, [id, isEditMode, reset, toast]);

  const onSubmit = async (data: ContentFormValues) => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${id}`, data);
        toast({
          title: "Sucesso",
          description: "Conteúdo atualizado com sucesso!",
        });
      } else {
        await axios.post(API_URL, data);
        toast({
          title: "Sucesso",
          description: "Conteúdo criado com sucesso!",
        });
      }
      navigate('/admin/conteudos');
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o conteúdo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const typeOptions = [
    { value: 'story', label: 'História' },
    { value: 'craft', label: 'Artesanato' },
    { value: 'music', label: 'Música' },
    { value: 'language', label: 'Língua' },
    { value: 'ritual', label: 'Ritual' },
  ];

  if (isLoadingData) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/conteudos')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEditMode ? 'Editar Conteúdo' : 'Novo Conteúdo'}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode ? 'Atualize as informações do conteúdo' : 'Crie um novo conteúdo cultural'}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isEditMode ? (
                <>
                  <Badge variant="secondary">Edição</Badge>
                  Conteúdo #{id}
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Novo Conteúdo
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input 
                    id="title" 
                    {...register('title')} 
                    placeholder="Digite o título do conteúdo"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea 
                    id="description" 
                    {...register('description')} 
                    placeholder="Descreva o conteúdo cultural"
                    rows={4}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="type">Tipo *</Label>
                  <Select onValueChange={(value) => setValue('type', value as any)}>
                    <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="creator">Colaborador</Label>
                  <Input 
                    id="creator" 
                    {...register('creator')} 
                    placeholder="Nome do colaborador (opcional)"
                  />
                </div>

                <div>
                  <Label htmlFor="ethnicity">Etnia</Label>
                  <Input 
                    id="ethnicity" 
                    {...register('ethnicity')} 
                    placeholder="Ex: Tupi-Guarani, Yanomami"
                    className={errors.ethnicity ? 'border-red-500' : ''}
                  />
                  {errors.ethnicity && (
                    <p className="text-red-500 text-sm mt-1">{errors.ethnicity.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="region">Região</Label>
                  <Input 
                    id="region" 
                    {...register('region')} 
                    placeholder="Ex: Sul, Norte, Nordeste"
                    className={errors.region ? 'border-red-500' : ''}
                  />
                  {errors.region && (
                    <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="imageUrl">URL da Imagem *</Label>
                  <Input 
                    id="imageUrl" 
                    {...register('imageUrl')} 
                    placeholder="https://exemplo.com/imagem.jpg"
                    className={errors.imageUrl ? 'border-red-500' : ''}
                  />
                  {errors.imageUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Insira a URL de uma imagem que represente o conteúdo
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/conteudos')}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isEditMode ? 'Salvar Alterações' : 'Criar Conteúdo'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentForm; 