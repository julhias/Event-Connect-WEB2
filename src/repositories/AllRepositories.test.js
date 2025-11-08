// src/repositories/AllRepositories.test.js

// --- MOCKS ---
// Repositórios que usam localStorage
import EventoRepository from './EventoRepository';
import ContratoRepository from './ContratoRepository';
// Repositório que usa Service
import PrestadorRepository from './PrestadorRepository'; 
import PrestadorService from '../services/PrestadorService';

// ==========================================================
// MOCK 1: Simulação do PrestadorService
// (O PrestadorRepository apenas chama o PrestadorService)
// ==========================================================
jest.mock('../services/PrestadorService', () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  getAvaliacoes: jest.fn(),
  getCategorias: jest.fn(),
}));

// ==========================================================
// MOCK 2: Simulação do localStorage
// (O Jest não tem localStorage, então criamos um falso)
// ==========================================================
let localStorageStore = {}; // Nosso "banco de dados" falso

const localStorageMock = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, value) => {
    localStorageStore[key] = value.toString();
  },
  removeItem: (key) => {
    delete localStorageStore[key];
  },
  clear: () => {
    localStorageStore = {};
  }
};

// "Engana" o Jest dizendo que 'global.localStorage' é o nosso mock
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

// --- FIM DOS MOCKS ---


// ==========================================================
// === TESTES DO EVENTO REPOSITORY (localStorage) ==========
// ==========================================================
describe('Repository: EventoRepository', () => {

  const storageKey = 'eventconnect_eventos';

  // Limpa o localStorage falso antes de cada teste
  beforeEach(() => {
    localStorage.clear();
    // Limpa mocks se houver (boa prática)
    jest.clearAllMocks();
  });
  
  // O seu repositório inicializa com dados. Vamos limpar isso.
  it('deve salvar um novo evento no localStorage', () => {
    localStorage.clear(); // Garante que começa vazio
    
    const novoEvento = { id: 1, nome: 'Meu Evento' };
    EventoRepository.save(novoEvento);

    // 1. Verifica o que está "cru" no localStorage
    const dadosSalvos = localStorage.getItem(storageKey);
    expect(dadosSalvos).toBeDefined();
    // 2. Verifica se o que foi salvo é o array com o evento
    expect(dadosSalvos).toEqual(JSON.stringify([novoEvento]));
  });
  
  it('deve encontrar todos os eventos', () => {
    const eventos = [{ id: 1, nome: 'A' }, { id: 2, nome: 'B' }];
    localStorage.setItem(storageKey, JSON.stringify(eventos));
    
    const resultado = EventoRepository.findAll();
    
    expect(resultado).toHaveLength(2);
    expect(resultado[1].nome).toBe('B');
  });

  it('deve encontrar um evento por ID', () => {
    const eventos = [{ id: 1, nome: 'A' }, { id: 2, nome: 'B' }];
    localStorage.setItem(storageKey, JSON.stringify(eventos));
    
    const resultado = EventoRepository.findById(2);
    
    expect(resultado.nome).toBe('B');
  });

  it('deve atualizar um evento', () => {
    const eventosIniciais = [{ id: 1, nome: 'Evento Original' }];
    localStorage.setItem(storageKey, JSON.stringify(eventosIniciais));

    const eventoAtualizado = { nome: 'Evento Atualizado' };
    EventoRepository.update(1, eventoAtualizado);

    const eventoSalvo = EventoRepository.findById(1);
    expect(eventoSalvo.nome).toBe('Evento Atualizado');
  });

  it('deve deletar um evento', () => {
    const eventosIniciais = [{ id: 1, nome: 'Para Deletar' }, { id: 2, nome: 'Para Manter' }];
    localStorage.setItem(storageKey, JSON.stringify(eventosIniciais));

    EventoRepository.delete(1);
    
    const eventosRestantes = EventoRepository.findAll();
    expect(eventosRestantes).toHaveLength(1);
    expect(eventosRestantes[0].id).toBe(2);
  });
});


// ==========================================================
// === TESTES DO CONTRATO REPOSITORY (localStorage) ========
// ==========================================================
describe('Repository: ContratoRepository', () => {

  const storageKey = 'eventconnect_contratos';

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('deve salvar um novo contrato no localStorage', () => {
    localStorage.clear();
    
    const novoContrato = { id: 1, servico: 'DJ' };
    ContratoRepository.save(novoContrato);

    const dadosSalvos = localStorage.getItem(storageKey);
    expect(dadosSalvos).toEqual(JSON.stringify([novoContrato]));
  });

  it('deve encontrar todos os contratos', () => {
    const contratos = [{ id: 1, servico: 'A' }, { id: 2, servico: 'B' }];
    localStorage.setItem(storageKey, JSON.stringify(contratos));
    
    const resultado = ContratoRepository.findAll();
    
    expect(resultado).toHaveLength(2);
    expect(resultado[0].servico).toBe('A');
  });

  it('deve encontrar contratos por status (lógica do repo)', () => {
    const contratos = [
      { id: 1, status: 'ativo' }, 
      { id: 2, status: 'negociando' },
      { id: 3, status: 'ativo' },
    ];
    localStorage.setItem(storageKey, JSON.stringify(contratos));
    
    const resultado = ContratoRepository.findByStatus('ativo');
    expect(resultado).toHaveLength(2);
    expect(resultado[0].id).toBe(1);
    expect(resultado[1].id).toBe(3);
  });
});


// ==========================================================
// === TESTES DO PRESTADOR REPOSITORY (Service) ============
// ==========================================================
describe('Repository: PrestadorRepository', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar o PrestadorService.getAll() em findAll()', async () => {
    // Configura o mock do serviço
    PrestadorService.getAll.mockResolvedValue(['dado_falso']);
    
    await PrestadorRepository.findAll();
    
    // Verifica se o serviço foi chamado
    expect(PrestadorService.getAll).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o PrestadorService.getById() em findById()', async () => {
    PrestadorService.getById.mockResolvedValue({ id: 5 });
    
    await PrestadorRepository.findById(5);
    
    // Verifica se o serviço foi chamado com o ID correto
    expect(PrestadorService.getById).toHaveBeenCalledTimes(1);
    expect(PrestadorService.getById).toHaveBeenCalledWith(5);
  });

  it('deve chamar o PrestadorService.getAvaliacoes()', async () => {
    PrestadorService.getAvaliacoes.mockResolvedValue(['avaliacao_falsa']);
    
    await PrestadorRepository.getAvaliacoes(10);
    
    expect(PrestadorService.getAvaliacoes).toHaveBeenCalledTimes(1);
    expect(PrestadorService.getAvaliacoes).toHaveBeenCalledWith(10);
  });
});