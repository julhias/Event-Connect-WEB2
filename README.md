
# EventConnect - DSW2

Plataforma que conecta prestadores de serviço (como garçons, DJs, fotógrafos, seguranças, entre outros) a pessoas que desejam contratar esses serviços para seus eventos.

## Colaboradores

- **Larissa Dias da Silva** - RA: 800204
- **Julia Fernanda Gonçalves Gaziero** - RA: 811852
- **Julia Pedro Silva** - RA: 820869

##  Sobre o Projeto

O **EventConnect** é uma Single Page Application (SPA) desenvolvida como requisito da disciplina de DSW2. A aplicação visa solucionar a dificuldade de encontrar e gerenciar prestadores de serviços para eventos (casamentos, aniversários, formaturas), oferecendo um ecossistema completo desde a busca até o pagamento.

## Telas e Funcionalidades

O sistema possui **6 telas totalmente funcionais**, validadas através da análise do código fonte:

### 1. HomePage (Tela Inicial)

- **Navegação:** Menu completo (Prestadores, Geolocalização, Meus Eventos, Contratos, Sobre).
- **Busca:** Barra de pesquisa de serviços e seção "Profissionais em Destaque".
- **Dashboard:** Estatísticas em tempo real (Prestadores, Eventos, Satisfação).
- **Categorias:** Cards para criação rápida de eventos (Aniversário, Casamento, etc).

### 2. EventosPage (Gestão de Eventos)

- **CRUD Completo:** Criar, Listar e Visualizar eventos.
- **Formulário Inteligente:** Validação de datas (impede datas no passado) e campos customizados.
- **Persistência:** Integração com `EventoService` e `LocalStorage`.

### 3. ContratosPage (Gestão de Contratos)

- **Workflow de Status:** Sistema de abas para contratos `Ativos`, `Negociando` e `Concluídos`.
- **Ações Rápidas:** Botões para iniciar Chat ou realizar Pagamento.
- **Criação Inline:** Formulário rápido para novos contratos.

### 4. PagamentoPage (Checkout)

- **Integração API (Requisito R5):** Simulação de transação via `POST` para `JSONPlaceholder`.
- **Múltiplos Métodos:** Cartão de Crédito (com formatação automática), PIX e Boleto.
- **Segurança:** Badges de ambiente seguro e validação de campos.

### 5. PerfilPrestadorPage

- **Dados Externos:** Perfis carregados via API externa.
- **Funcionalidades:** Status online, disponibilidade e sistema de avaliações.

### 6. PerfilUsuarioPage

- **Gestão de Conta:** Edição de perfil, acesso a pagamentos e contratos.
- **Design:** Interface organizada em seções (Conta, Preferências, Suporte).

##  Arquitetura do Backend

O projeto utiliza uma arquitetura em camadas (**Layered Architecture**) para separar responsabilidades.

### Estrutura de Pastas
```bash
src/
├── api/             # Configuração do cliente HTTP (Axios)
├── pages/           # Camada de Apresentação (UI)
├── services/        # Camada de Lógica de Negócio
├── repositories/    # Camada de Acesso a Dados
└── schemas/         # Camada de Validação
```

### Detalhamento das Camadas

#### Services (Regras de Negócio)

Responsável por toda a lógica e validação antes da persistência.

- **EventoService.js:** Gerencia regras de criação, valida datas, controla status (ativo/finalizado) e gera imagens aleatórias.
- **ContratoService.js:** Controla o ciclo de vida do contrato (negociando → ativo → concluído/cancelado) e timestamps.
- **PrestadorService.js:** Atua como adaptador, transformando dados da API JSONPlaceholder (`/users` e `/comments`) em objetos de domínio do sistema.

#### Repositories (Persistência)

Abstração da camada de dados.

- **EventoRepository.js & ContratoRepository.js:** Implementam persistência local usando LocalStorage (Requisito R6).
- **PrestadorRepository.js:** Abstrai as chamadas externas, permitindo busca, filtro por categoria e recuperação de avaliações.

#### Schemas (Validação)

Garantia de integridade dos dados.

- **EventoSchema:** Garante que datas não sejam passadas, campos obrigatórios e limites de caracteres.
- **ContratoSchema:** Valida valores monetários, descrições e vínculos com prestadores.
- **PrestadorSchema:** Valida formatos de email e integridade dos dados do perfil.

## ✅ Requisitos Técnicos Atendidos

| ID | Requisito | Status | Detalhes da Implementação |
|----|-----------|--------|---------------------------|
| R1 | Layout Consistente | ✅ Atendido | Identidade visual Roxo/Purple (Tailwind CSS). |
| R2 | 6 Telas Funcionais | ✅ Atendido | Todas as telas principais implementadas. |
| R3 | Responsividade | ✅ Atendido | Layout adaptável (Mobile/Desktop). |
| R4 | CRUD Funcional | ✅ Atendido | Create/Read/Update em Eventos e Contratos. |
| R5 | Acesso à Rede | ✅ Atendido | Integração Axios com API JSONPlaceholder. |
| R6 | APIs HTML5 | ✅ Atendido | Uso de LocalStorage e Geolocalização. |

## Tecnologias Utilizadas

- **Frontend:** React.js
- **Estilização:** Tailwind CSS
- **HTTP Client:** Axios
- **Validação:** Custom Schemas
- **Mock Data:** JSONPlaceholder & Picsum Photos

## Como Rodar o Projeto

1. Clone este repositório:
```bash
git clone https://github.com/seu-usuario/event-connect-dsw2.git
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm start
```

4. **Acesse:** Abra http://localhost:3000 no seu navegador.

## 📝 Licença e Desenvolvimento

Este projeto é um trabalho acadêmico da disciplina **Desenvolvimento de Software para Web 2 - UFSCar**.

Desenvolvimento realizado como parte da avaliação da disciplina DSW2, atendendo todos os requisitos (R1-R6).
