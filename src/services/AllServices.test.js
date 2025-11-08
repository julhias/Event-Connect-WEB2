// src/services/AllServices.test.js
import EventoService from './EventoService';
import ContratoService from './ContratoService';
import PrestadorService from './PrestadorService';
import GeolocationService from './GeolocationService';

import EventoRepository from '../repositories/EventoRepository';
import ContratoRepository from '../repositories/ContratoRepository';
import apiClient from '../api/apiClient';
import API_ENDPOINTS from '../api/endpoints';

// --- MOCKS DE REPOSITÓRIO (para Evento e Contrato) ---
jest.mock('../repositories/EventoRepository', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
}));

jest.mock('../repositories/ContratoRepository', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
}));

// --- MOCK DE API (para Prestador) ---
jest.mock('../api/apiClient', () => ({
  get: jest.fn(),
}));

// --- MOCK DE NAVEGADOR (para Geolocation) ---
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn()
};
Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true
});

// ===============================================
// === TESTES DO EVENTO SERVICE ==================
// ===============================================
describe('Service: EventoService', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Limpa mocks ENTRE os testes
  });

  it('deve retornar todos os eventos ordenados por criação (mais novo primeiro)', async () => {
    const eventosFalsos = [
      { id: 1, nome: 'Evento Antigo', criacao: '2024-01-01T10:00:00Z' },
      { id: 2, nome: 'Evento Novo', criacao: '2025-01-01T10:00:00Z' },
    ];
    EventoRepository.findAll.mockResolvedValue(eventosFalsos);

    const resultado = await EventoService.getAll();

    expect(resultado[0].nome).toBe('Evento Novo');
    expect(resultado[1].nome).toBe('Evento Antigo');
    expect(EventoRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve criar um novo evento com dados padrão (status, id, etc.)', async () => {
    const dadosEvento = {
      nome: 'Meu Novo Evento',
      tipo: 'Festa',
      data: '2025-12-30',
      local: 'Minha casa',
      horario: '18:00',
      convidados: 50,
    };
    
    EventoRepository.save.mockImplementation(evento => Promise.resolve(evento));
    const resultado = await EventoService.create(dadosEvento);

    expect(resultado.status).toBe('ativo');
    expect(resultado.valor).toBe(0);
    expect(resultado.id).toBeDefined();
    expect(EventoRepository.save).toHaveBeenCalledTimes(1);
  });

  it('deve falhar ao criar evento sem nome (validação do schema)', async () => {
    const dadosEvento = { tipo: 'Festa', data: '2025-12-30', local: 'Minha casa', horario: '18:00', convidados: 50 };

    await expect(EventoService.create(dadosEvento))
      .rejects
      .toThrow('Nome do evento deve ter no mínimo 3 caracteres');
      
    expect(EventoRepository.save).not.toHaveBeenCalled();
  });
  
  it('deve falhar ao criar evento com data no passado (validação do schema)', async () => {
    const dadosEvento = { nome: 'Festa no Passado', tipo: 'Festa', data: '2020-01-01', local: 'Minha casa', horario: '18:00', convidados: 50 };

    await expect(EventoService.create(dadosEvento))
      .rejects
      .toThrow('Data do evento não pode ser no passado');
      
    expect(EventoRepository.save).not.toHaveBeenCalled();
  });
});

// ===============================================
// === TESTES DO CONTRATO SERVICE ===============
// ===============================================
describe('Service: ContratoService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo contrato com dados padrão (status negociando)', async () => {
    const dadosContrato = {
      servico: "DJ para Festa", prestadorId: 1, prestador: "DJ Top",
      eventoId: 10, evento: "Minha Festa", data: "2025-12-25",
      valor: 500, descricao: "DJ com equipamento completo por 4 horas."
    };

    ContratoRepository.save.mockImplementation(contrato => Promise.resolve(contrato));
    const resultado = await ContratoService.create(dadosContrato);

    expect(resultado.status).toBe('negociando');
    expect(resultado.pagamento).toBe('Aguardando');
    expect(resultado.id).toBeDefined();
    expect(ContratoRepository.save).toHaveBeenCalledTimes(1);
  });

  it('deve falhar ao criar contrato sem descrição (validação do schema)', async () => {
    const dadosContrato = {
      servico: "DJ para Festa", prestadorId: 1, prestador: "DJ Top",
      eventoId: 10, evento: "Minha Festa", data: "2025-12-25",
      valor: 500, descricao: "Curta"
    };

    await expect(ContratoService.create(dadosContrato))
      .rejects
      .toThrow('Descrição deve ter no mínimo 10 caracteres');
    expect(ContratoRepository.save).not.toHaveBeenCalled();
  });

  it('deve atualizar o status para cancelado', async () => {
    const contratoExistente = { id: 1, status: 'ativo' };
    ContratoRepository.findById.mockResolvedValue(contratoExistente);
    ContratoRepository.update.mockResolvedValue(true);

    await ContratoService.cancelarContrato(1);

    expect(ContratoRepository.update).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ status: 'cancelado' })
    );
  });
});

// ===============================================
// === TESTES DO PRESTADOR SERVICE ===============
// ===============================================
describe('Service: PrestadorService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar usuários da API e transformá-los em Prestadores', async () => {
    const mockUsers = {
      data: [
        {
          id: 1, email: 'u1@api.com', phone: '123', website: 'site.com',
          address: { city: 'Cidade 1' },
          company: { name: 'Empresa 1', catchPhrase: 'Frase 1' }
        },
        {
          id: 2, email: 'u2@api.com', phone: '456', website: 'site2.com',
          address: { city: 'Cidade 2' },
          company: { name: 'Empresa 2', catchPhrase: 'Frase 2' }
        }
      ]
    };
    apiClient.get.mockResolvedValue(mockUsers);

    const prestadores = await PrestadorService.getAll();

    expect(apiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.USERS);
    expect(prestadores).toHaveLength(2);
    expect(prestadores[0].nome).toBe('Empresa 1');
    expect(prestadores[0].categoria).toBe('Buffet');
    expect(prestadores[1].nome).toBe('Empresa 2');
    expect(prestadores[1].categoria).toBe('DJ');
  });

  it('deve buscar comentários da API e transformá-los em Avaliações', async () => {
    const mockComments = {
      data: [ { id: 10, name: 'A', email: 'a@a.com', body: 'Comentário 1' } ]
    };
    apiClient.get.mockResolvedValue(mockComments);
    
    const avaliacoes = await PrestadorService.getAvaliacoes(5);

    expect(apiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.COMMENTS_BY_POST(5));
    expect(avaliacoes[0].comentario).toBe('Comentário 1');
    expect(avaliacoes[0].rating).toBeDefined();
  });
});

// ===============================================
// === TESTES DO GEOLOCATION SERVICE =============
// ===============================================
describe('Service: GeolocationService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar a posição com sucesso', async () => {
    const mockPosition = {
      coords: { latitude: -20.5, longitude: -47.4, accuracy: 10 }
    };
    mockGeolocation.getCurrentPosition.mockImplementation((successCallback) => {
      successCallback(mockPosition);
    });

    const position = await GeolocationService.getCurrentPosition();

    expect(position.lat).toBe(-20.5);
    expect(position.lng).toBe(-47.4);
  });

  it('deve falhar se o usuário negar a permissão', async () => {
    const mockError = { 
  code: 1, 
  message: 'Usuário negou',
  // Adicionando as constantes que o serviço espera
  PERMISSION_DENIED: 1, 
  POSITION_UNAVAILABLE: 2, 
  TIMEOUT: 3 
};
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
      error(mockError);
    });

    await expect(GeolocationService.getCurrentPosition())
      .rejects
      .toThrow('Permissão de localização negada');
  });
});