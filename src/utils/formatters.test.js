// src/utils/formatters.test.js
import { formatters } from './formatters';

// describe agrupa um conjunto de testes relacionados
describe('Utils: Formatters', () => {

  // 'it' (ou 'test') define um caso de teste específico
  it('deve formatar o valor como moeda BRL', () => {
    const valor = 1234.5;
    const resultado = formatters.formatarMoeda(valor);

    // 'expect' verifica se o resultado é o esperado
    // O '\u00A0' é o espaço especial (non-breaking space) que o Intl usa.
    expect(resultado).toBe('R$\u00A01.234,50');
  });

  it('deve formatar um valor zero como moeda BRL', () => {
    const valor = 0;
    const resultado = formatters.formatarMoeda(valor);
    expect(resultado).toBe('R$\u00A00,00');
  });

  it('deve formatar uma data (ISO) para o padrão pt-BR', () => {
    // A data é UTC (Z), o teste vai converter para o fuso local
    // Para garantir consistência, usamos um formato que não dependa do fuso
    const dataISO = new Date('2025-10-25T10:00:00Z');
    const resultado = formatters.formatarData(dataISO);
    
    // O resultado pode variar um pouco dependendo do fuso da máquina
    // Mas para uma data simples, geralmente funciona assim:
    expect(resultado).toBe('25/10/2025');
  });

  it('deve formatar um telefone com 11 dígitos', () => {
    const telefone = '11987654321';
    const resultado = formatters.formatarTelefone(telefone);
    expect(resultado).toBe('(11) 98765-4321');
  });

  it('deve retornar o telefone original se for inválido', () => {
    const telefone = '12345';
    const resultado = formatters.formatarTelefone(telefone);
    expect(resultado).toBe('12345');
  });

  it('deve truncar um texto longo', () => {
    const texto = 'Este é um texto muito longo que precisa ser cortado';
    const resultado = formatters.truncarTexto(texto, 10);
    expect(resultado).toBe('Este é um ...');
  });

  it('não deve truncar um texto curto', () => {
    const texto = 'Texto curto';
    const resultado = formatters.truncarTexto(texto, 100);
    expect(resultado).toBe('Texto curto');
  });

  it('deve formatar um nome completo (capitalização)', () => {
    const nome = 'fulano de tal da silva';
    const resultado = formatters.formatarNomeCompleto(nome);
    expect(resultado).toBe('Fulano De Tal Da Silva');
  });

  it('deve capitalizar apenas a primeira letra', () => {
    const texto = 'teste';
    const resultado = formatters.capitalizarPrimeiraLetra(texto);
    expect(resultado).toBe('Teste');
  });

});