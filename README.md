# EventConnect - DSW2

Plataforma que conecta prestadores de serviço (como garçons, DJs, fotógrafos, seguranças, entre outros) a pessoas que desejam contratar esses serviços para seus eventos.

## 👥 Colaboradores
- Larissa Dias da Silva - RA: 800204
- Julia Fernanda Gonçalves Gaziero - RA: 811852
- Julia Pedro Silva - RA: 820869

## 🎯 Requisitos Atendidos

### R1 - Layout e Identidade Visual ✅
- Design consistente com paleta de cores roxa/purple
- Interface moderna e profissional
- Seguindo princípios do Material Design

### R2 - Múltiplas Telas ✅
- Home
- Criar Novo Evento
- Meus Eventos
- Detalhes do Evento
- Meus Contratos
- Detalhes do Contrato
- Detalhes do Prestador
- Contratar Serviço
- Perfil/Configurações

### R3 - Layout Responsivo ✅
- Otimizado para mobile, tablet e desktop
- Uso de Tailwind CSS para responsividade
- Componentes adaptáveis

### R4 - Telas Funcionais ✅
- Sistema completo de CRUD para Eventos
- Sistema completo de CRUD para Contratos
- Navegação entre telas
- Estados e interações funcionais

### R5 - Acesso à Rede ✅
- Integração com JSONPlaceholder API (usuários e comentários)
- Sistema de loading e tratamento de erros
- Operações assíncronas

### R6 - APIs Adicionais ✅
- **Geolocalização**: Detecção automática da localização do usuário
- **LocalStorage**: Persistência de dados localmente

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Passos para rodar o projeto

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd eventconnect
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 🏗️ Arquitetura do Projeto

### Frontend (React)
- **Components**: Componentes reutilizáveis
- **Pages**: Páginas completas da aplicação
- **Services**: Lógica de negócio e chamadas API
- **Repositories**: Camada de acesso a dados
- **Controllers**: Controle de fluxo da aplicação
- **Hooks**: Custom hooks para lógica compartilhada
- **Context**: Gerenciamento de estado global

### APIs Utilizadas
1. **JSONPlaceholder** (https://jsonplaceholder.typicode.com)
   - Usuários (transformados em prestadores)
   - Comentários (transformados em avaliações)


3. **Geolocation API** (Navigator)
   - Detecção automática de localização
   - Precisão em metros

## 📊 Funcionalidades Implementadas

### Gestão de Eventos
- ✅ Criar novo evento
- ✅ Listar eventos (ativos/finalizados)
- ✅ Visualizar detalhes do evento
- ✅ Editar evento
- ✅ Excluir evento
- ✅ Filtrar eventos por status

### Gestão de Contratos
- ✅ Criar contrato/proposta
- ✅ Listar contratos (ativos/negociando/concluídos)
- ✅ Visualizar detalhes do contrato
- ✅ Cancelar contrato
- ✅ Filtrar contratos por status

### Prestadores de Serviço
- ✅ Listar prestadores disponíveis
- ✅ Visualizar perfil completo do prestador
- ✅ Ver avaliações em tempo real (da API)
- ✅ Filtrar por categoria
- ✅ Buscar por nome ou categoria
- ✅ Contratar serviço

### Recursos Adicionais
- ✅ Detecção de localização geográfica
- ✅ Sistema de notificações
- ✅ Persistência de dados (LocalStorage)
- ✅ Loading states
- ✅ Tratamento de erros
- ✅ Validação de formulários

## 🎨 Tecnologias Utilizadas

- **React 18**: Framework JavaScript
- **Tailwind CSS**: Estilização
- **Lucide React**: Ícones
- **Axios**: HTTP Client
- **LocalStorage**: Persistência local
- **Geolocation API**: Localização
- **Open-Meteo API**: Dados climáticos
- **JSONPlaceholder**: Mock API

## 📱 Screenshots

[Adicionar screenshots das principais telas aqui]

## 🔄 Fluxo da Aplicação

1. Usuário acessa a Home
2. Sistema detecta localização e clima
3. Usuário pode:
   - Criar um evento
   - Buscar prestadores
   - Ver contratos existentes
4. Ao encontrar um prestador:
   - Ver perfil completo
   - Ver avaliações (API real)
   - Contratar serviço
5. Contratação gera uma proposta
6. Gerenciar eventos e contratos

## 📝 Licença

Este projeto é um trabalho acadêmico da disciplina Desenvolvimento de Software para Web 2 - UFSCar

## 👨‍💻 Desenvolvimento

Projeto desenvolvido como parte da avaliação da disciplina DSW2, atendendo todos os requisitos (R1-R6).
```
