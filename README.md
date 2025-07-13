# 🏛️ Tekoá Hub - Frontend

**Versão submetida:** Intermediária (Nível Padrão)  
**Público-alvo:** Povos Indígenas  
**ODS:** ODS 4 – Educação de Qualidade, ODS 10 – Redução das Desigualdades, ODS 16 – Paz, Justiça e Instituições Eficazes

Frontend do Tekoá Hub: plataforma digital para preservação e valorização da cultura indígena brasileira.

## 🎯 Sobre o Projeto

O Tekoá Hub é uma plataforma digital dedicada à preservação e divulgação da cultura indígena brasileira. O frontend React oferece uma interface moderna, responsiva e acessível para conectar pessoas com o rico patrimônio cultural dos povos indígenas.

### Público-Alvo
- **Povos Indígenas** - Para preservar e compartilhar sua cultura
- **Educadores** - Para usar em sala de aula
- **Público Geral** - Para conhecer e valorizar a cultura indígena

### ODS Alinhadas
- **ODS 4 - Educação de Qualidade**: Promovendo educação inclusiva sobre cultura indígena
- **ODS 10 - Redução das Desigualdades**: Valorizando e preservando culturas minoritárias
- **ODS 16 - Paz, Justiça e Instituições Eficazes**: Promovendo sociedades inclusivas

## 🚀 Tecnologias Utilizadas

- **React 18**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **Shadcn/ui**
- **Radix UI**
- **Lucide React**
- **TanStack Query**
- **React Hook Form**
- **Zod**
- **Axios**
- **ESLint**
- **PostCSS**
- **SWC**

## 📋 Pré-requisitos

- **Node.js 18+**
- **npm ou yarn**
- **Backend Spring Boot** rodando na porta 8080
- **MySQL** configurado no backend

## 🚀 Como Executar o Frontend

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd tekoa-hub-frontend
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
VITE_BACKEND_URL=http://localhost:8080
```

### 4. Execute o projeto
```bash
npm run dev
# ou
yarn dev
```

### 5. Acesse a aplicação
O frontend estará disponível em: **http://localhost:8000**

## ⚡ Comandos Rápidos

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Executar linting
npm run lint
```

## ✅ Verificação de Funcionamento

1. Abra o navegador e acesse `http://localhost:8000`
2. Verifique se a página inicial carrega corretamente
3. Teste a navegação entre as páginas (Home, Explorar, Sobre)
4. Confirme a integração com o backend acessando a página "Explorar"

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Layout/         # Header e Footer
│   ├── ContentCard.tsx # Card de conteúdo cultural
│   ├── ContentGrid.tsx # Grid responsivo de conteúdos
│   ├── ContentModal.tsx # Modal de detalhes
│   ├── ExploreHeader.tsx # Header da página explorar
│   ├── ImageWithFallback.tsx # Imagem com fallback
│   └── About.tsx       # Componente sobre
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   ├── Explore.tsx     # Galeria de conteúdos
│   ├── About.tsx       # Sobre o projeto
│   ├── ContentDetail.tsx # Detalhes do conteúdo
│   ├── ContentList.tsx # Lista administrativa
│   ├── ContentForm.tsx # Formulário CRUD
│   ├── NotFound.tsx    # Página 404
│   └── Index.tsx       # Redirecionamento
├── hooks/              # Hooks customizados
│   ├── use-mobile.tsx  # Hook para detecção mobile
│   ├── use-toast.ts    # Hook para notificações
│   └── useLikes.ts     # Hook para sistema de curtidas
├── lib/                # Utilitários e tipos
│   ├── types.ts        # Definições de tipos
│   └── utils.ts        # Funções utilitárias
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 📱 Funcionalidades

- Busca e filtros por tipo de conteúdo cultural
- Sistema de curtidas persistido no localStorage
- Modal responsivo com detalhes completos
- Interface totalmente responsiva para mobile e desktop
- CRUD completo de conteúdos culturais
- Integração com API REST do backend Spring Boot
- Validação de formulários com Zod
- Notificações toast para feedback do usuário
- Loading states e tratamento de erros
- Fallback de imagens para melhor UX

## 🔌 Integração com Backend

O frontend se conecta ao backend Spring Boot através da API REST:

### Endpoints Utilizados
- `GET /api/categories` - Listar categorias culturais
- `GET /api/contents` - Listar todos os conteúdos
- `GET /api/contents/{id}` - Buscar conteúdo por ID
- `POST /api/contents` - Criar novo conteúdo cultural
- `PUT /api/contents/{id}` - Atualizar conteúdo
- `DELETE /api/contents/{id}` - Excluir conteúdo

A URL do backend é configurada através da variável de ambiente `VITE_BACKEND_URL`.

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run build:dev    # Build para desenvolvimento
npm run preview      # Preview do build
npm run lint         # Executa ESLint
```

## 🤝 Contribuição

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças seguindo Conventional Commits (`git commit -m 'feat: minha feature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Commit
Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/):
- `feat:` novas funcionalidades
- `fix:` correções de bugs
- `docs:` documentação
- `style:` formatação de código
- `refactor:` refatoração
- `chore:` tarefas de manutenção

## 👥 Autores

- **Davi Sodré Gonçalves** - Desenvolvimento inicial

## 🙏 Agradecimentos

- Comunidades indígenas brasileiras - Inspiração e propósito
- Professores e orientadores - Apoio e mentoria
- Comunidade open source - Ferramentas e bibliotecas
- Shadcn/ui - Componentes de UI acessíveis
- Vite - Build tool ultra-rápido

## 🔗 Links Úteis

- [Backend Repository](../tekoa-hub-backend)
- [API Documentation](../tekoa-hub-backend/README.md#endpoints)
- [Design System](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Query](https://tanstack.com/query)
