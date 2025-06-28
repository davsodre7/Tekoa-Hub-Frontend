# 🏛️ Tekoá Hub - Frontend

**Versão submetida:** Intermediária (Nível Padrão)  
**Público-alvo:** Povos Indígenas  
**ODS:** ODS 4 – Educação de Qualidade, ODS 10 – Redução das Desigualdades, ODS 16 – Paz, Justiça e Instituições Eficazes

Frontend do Tekoá Hub: plataforma digital para preservação e valorização da cultura indígena brasileira.

## 🎯 Sobre o Projeto

O Tekoá Hub é uma plataforma digital dedicada à preservação e divulgação da cultura indígena brasileira. O projeto visa conectar pessoas com o rico patrimônio cultural dos povos indígenas através de uma interface moderna e acessível.

### Público-Alvo
- **Povos Indígenas** - Para preservar e compartilhar sua cultura
- **Educadores** - Para usar em sala de aula
- **Público Geral** - Para conhecer e valorizar a cultura indígena

### ODS Alinhadas
- **ODS 4 - Educação de Qualidade**: Promovendo educação inclusiva sobre cultura indígena
- **ODS 10 - Redução das Desigualdades**: Valorizando e preservando culturas minoritárias
- **ODS 16 - Paz, Justiça e Instituições Eficazes**: Promovendo sociedades inclusivas

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes de UI
- **React Router** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Backend Spring Boot rodando na porta 8080

## 🔧 Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd tekoa-cultural-archive-hub-frontend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
VITE_BACKEND_URL=http://localhost:8080
```

### 4. Execute o projeto
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:8000`

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Layout/         # Componentes de layout
│   └── ...             # Outros componentes
├── pages/              # Páginas da aplicação
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e tipos
├── data/               # Dados estáticos
└── ...
```

## 📱 Funcionalidades

### Páginas Principais
- **Home** - Página inicial com apresentação do projeto
- **Explorar** - Galeria de conteúdos culturais com filtros e busca
- **Sobre** - Informações sobre o projeto e sua missão

### Área Administrativa
- **Listagem de Conteúdos** - Gerenciar todos os conteúdos
- **Formulário de Conteúdo** - Criar e editar conteúdos
- **Modal de Detalhes** - Visualizar conteúdo completo

### Funcionalidades
- ✅ Busca e filtros por tipo de conteúdo
- ✅ Sistema de curtidas (localStorage)
- ✅ Modal com detalhes completos
- ✅ Interface responsiva
- ✅ CRUD completo de conteúdos
- ✅ Integração com API REST

## 🔌 Integração com Backend

O frontend se conecta ao backend Spring Boot através da API REST:

### Endpoints Utilizados
- `GET /api/conteudos` - Listar todos os conteúdos
- `GET /api/conteudos/{id}` - Buscar conteúdo por ID
- `POST /api/conteudos` - Criar novo conteúdo
- `PUT /api/conteudos/{id}` - Atualizar conteúdo
- `DELETE /api/conteudos/{id}` - Excluir conteúdo

### Configuração da API
A URL do backend é configurada através da variável de ambiente `VITE_BACKEND_URL`.

## 🎨 Design System

O projeto utiliza o design system do Shadcn/ui com Tailwind CSS:

### Cores
- **Primary**: Tons de marrom/terracota
- **Secondary**: Tons neutros
- **Accent**: Destaques e elementos interativos

### Componentes
- Cards para exibição de conteúdo
- Badges para categorização
- Modais para detalhes
- Formulários com validação
- Tabelas para administração

## 📊 Dados de Exemplo

O backend inclui dados de exemplo com:
- 5 categorias culturais
- 8 conteúdos culturais
- Imagens e descrições completas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças seguindo Conventional Commits (`git commit -m 'feat: minha feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Seu Nome** - Desenvolvimento inicial
- **Outros Participantes** (se houver)

## 🙏 Agradecimentos

- Comunidades indígenas brasileiras
- Professores e orientadores
- Comunidade open source

---

**Status:** ✅ Funcional e Integrado  
**Última Atualização:** Junho 2024
