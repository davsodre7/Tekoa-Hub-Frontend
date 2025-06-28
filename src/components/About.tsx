import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted/30 cultural-pattern py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Sobre o Tekoá Hub
            </h1>
            <p className="text-lg text-muted-foreground">
              Uma plataforma dedicada à preservação, compartilhamento e valorização das culturas indígenas brasileiras
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">Nossa Missão</h2>
                <p className="text-muted-foreground mb-4">
                  O Tekoá Hub serve como uma ponte entre as comunidades indígenas brasileiras
                  e o mundo moderno, promovendo compreensão, respeito e valorização da rica herança
                  cultural dos povos originários do Brasil.
                </p>
                <p className="text-muted-foreground mb-4">
                  Nossa plataforma oferece um espaço para preservação cultural, educação e diálogo
                  intercultural, apoiando os Objetivos de Desenvolvimento Sustentável da ONU,
                  especialmente o ODS 4 (Educação de Qualidade) e ODS 16 (Paz, Justiça e Instituições Fortes).
                </p>
                <p className="text-muted-foreground">
                  Reconhecemos a importância dos 305 povos indígenas brasileiros e suas 274 línguas,
                  contribuindo para a manutenção dessa diversidade única no mundo.
                </p>
              </div>
              <div className="aspect-square">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/assets/img-about.jpg`}
                  alt="Comunidade indígena brasileira"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Respeito</h3>
                  <p className="text-muted-foreground">
                    Abordamos todo conteúdo cultural com profundo respeito e reverência,
                    honrando as tradições sagradas e conhecimentos dos povos indígenas brasileiros.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Preservação</h3>
                  <p className="text-muted-foreground">
                    Nossa plataforma serve como um repositório digital para o patrimônio cultural,
                    garantindo que tradições e conhecimentos sejam preservados para as futuras gerações.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Educação</h3>
                  <p className="text-muted-foreground">
                    Promovemos o entendimento intercultural através da educação,
                    fomentando o diálogo e valorização entre diferentes comunidades.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Brazilian Context */}
            <div className="bg-muted/30 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary text-center">Diversidade Indígena Brasileira</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">305</div>
                  <p className="text-muted-foreground">Povos Indígenas</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">274</div>
                  <p className="text-muted-foreground">Línguas Faladas</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">733</div>
                  <p className="text-muted-foreground">Terras Indígenas</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">900k+</div>
                  <p className="text-muted-foreground">População Indígena</p>
                </div>
              </div>
            </div>

            {/* Cultural Heritage Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="relative aspect-video">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/assets/danca-ritual-indigena-Brasil.jpeg`}
                  alt="Dança ritual indígena"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="relative aspect-video">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/assets/artesanato-indígena-brasileiro.jpg`}
                  alt="Artesanato indígena brasileiro"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Community Focus */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-primary">Nossa Comunidade</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                O Tekoá Hub reúne membros de comunidades indígenas, educadores, pesquisadores
                e pessoas interessadas em conhecer e valorizar a cultura indígena brasileira.
                Juntos, criamos um espaço respeitoso para intercâmbio cultural e aprendizado,
                garantindo que as vozes indígenas permaneçam no centro de nossa missão.
              </p>
              <div className="relative aspect-video max-w-3xl mx-auto">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/assets/foto_fogueira_gr.jpg`}
                  alt="Comunidade indígena em celebração"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 