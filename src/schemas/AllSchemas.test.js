// src/schemas/AllSchemas.test.js
import { EventoSchema } from './EventoSchema';
import { ContratoSchema } from './ContratoSchema';
import { PrestadorSchema } from './PrestadorSchema';

// ===============================================
// === TESTES DO EVENTO SCHEMA ===================
// ===============================================
describe('Schema: EventoSchema', () => {

  // Dados base para os testes
  const getValidEventoData = () => ({
    nome: 'Minha Festa de Aniversário',
    tipo: 'Festa de Aniversário',
    data: '2030-10-20', // Data futura
    local: 'Rua Fictícia, 123',
    horario: '20:00',
    convidados: 50,
    observacoes: 'Tudo certo'
  });

  it('deve validar um evento com dados corretos (caminho feliz)', () => {
    const data = getValidEventoData();
    
    // Testa se a função NÃO lança um erro
    expect(() => EventoSchema.validate(data)).not.toThrow();
    
    // Testa se a função retorna os dados
    expect(EventoSchema.validate(data)).toEqual(data);
  });

  it('deve falhar se o nome for muito curto', () => {
    const data = { ...getValidEventoData(), nome: 'A' };
    
    // Testa se a função LANÇA um erro com a mensagem específica
    expect(() => EventoSchema.validate(data))
      .toThrow('Nome do evento deve ter no mínimo 3 caracteres');
  });

  it('deve falhar se o tipo estiver faltando', () => {
    const data = { ...getValidEventoData(), tipo: '' };
    expect(() => EventoSchema.validate(data))
      .toThrow('Tipo do evento é obrigatório');
  });

  it('deve falhar se a data for no passado', () => {
    const data = { ...getValidEventoData(), data: '2020-01-01' };
    expect(() => EventoSchema.validate(data))
      .toThrow('Data do evento não pode ser no passado');
  });

  it('deve falhar se o número de convidados for zero', () => {
    const data = { ...getValidEventoData(), convidados: 0 };
    expect(() => EventoSchema.validate(data))
      .toThrow('Número de convidados deve ser maior que zero');
  });
});

// ===============================================
// === TESTES DO CONTRATO SCHEMA =================
// ===============================================
describe('Schema: ContratoSchema', () => {

  const getValidContratoData = () => ({
    servico: 'Serviço de Fotografia Completa',
    prestadorId: 1,
    prestador: 'Foto Mágica',
    eventoId: 1,
    evento: 'Casamento Feliz',
    data: '2030-10-21',
    valor: 1500,
    descricao: 'Descrição longa o suficiente com mais de 10 caracteres',
  });

  it('deve validar um contrato com dados corretos (caminho feliz)', () => {
    const data = getValidContratoData();
    expect(() => ContratoSchema.validate(data)).not.toThrow();
    expect(ContratoSchema.validate(data)).toEqual(data);
  });

  it('deve falhar se a descrição for muito curta', () => {
    const data = { ...getValidContratoData(), descricao: 'curta' };
    expect(() => ContratoSchema.validate(data))
      .toThrow('Descrição deve ter no mínimo 10 caracteres');
  });

  it('deve falhar se o prestadorId estiver faltando', () => {
    const data = { ...getValidContratoData(), prestadorId: null };
    expect(() => ContratoSchema.validate(data))
      .toThrow('Prestador é obrigatório');
  });

  it('deve falhar se o valor for negativo', () => {
    const data = { ...getValidContratoData(), valor: -100 };
    expect(() => ContratoSchema.validate(data))
      .toThrow('Valor deve ser maior ou igual a zero');
  });
});

// ===============================================
// === TESTES DO PRESTADOR SCHEMA ================
// ===============================================
describe('Schema: PrestadorSchema', () => {

  const getValidPrestadorData = () => ({
    nome: 'DJ Somzera',
    email: 'dj@som.com',
    telefone: '11999998888',
    categoria: 'DJ',
    preco: 200,
  });

  it('deve validar um prestador com dados corretos (caminho feliz)', () => {
    const data = getValidPrestadorData();
    expect(() => PrestadorSchema.validate(data)).not.toThrow();
  });

  it('deve falhar se o email for inválido', () => {
    const data = { ...getValidPrestadorData(), email: 'email-invalido' };
    expect(() => PrestadorSchema.validate(data))
      .toThrow('Email inválido');
  });

  it('deve falhar se o telefone estiver faltando', () => {
    const data = { ...getValidPrestadorData(), telefone: '' };
    expect(() => PrestadorSchema.validate(data))
      .toThrow('Telefone é obrigatório');
  });

  it('deve falhar se o preço for negativo', () => {
    const data = { ...getValidPrestadorData(), preco: -50 };
    expect(() => PrestadorSchema.validate(data))
      .toThrow('Preço não pode ser negativo');
  });
});