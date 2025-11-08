import apiClient from '../api/apiClient';
import API_ENDPOINTS from '../api/endpoints';

class PrestadorService {
  async getAll() {
    try {
      // Busca usuários da API JSONPlaceholder
      const response = await apiClient.get(API_ENDPOINTS.USERS);
      const users = response.data;

      // Transforma usuários em prestadores
      return users.slice(0, 10).map((user, index) => ({
        id: user.id,
        nome: user.company.name,
        email: user.email,
        telefone: user.phone,
        website: user.website,
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        preco: 100 + (index * 50),
        confiavel: true,
        categoria: this.getCategoriaByIndex(index),
        cidade: user.address.city,
        endereco: `${user.address.street}, ${user.address.suite}`,
        descricao: user.company.catchPhrase,
        servicos: Math.floor(20 + Math.random() * 80),
        imagem: `https://picsum.photos/seed/${user.id}/400/300`,
        usuario: user
      }));
    } catch (error) {
      console.error('Erro ao buscar prestadores:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const prestadores = await this.getAll();
      const prestador = prestadores.find(p => p.id === parseInt(id));
      
      if (!prestador) {
        throw new Error('Prestador não encontrado');
      }
      
      return prestador;
    } catch (error) {
      console.error('Erro ao buscar prestador:', error);
      throw error;
    }
  }

  async getAvaliacoes(prestadorId) {
    try {
      // Busca comentários da API como avaliações
      const response = await apiClient.get(API_ENDPOINTS.COMMENTS_BY_POST(prestadorId));
      const comments = response.data;

      return comments.slice(0, 5).map(c => ({
        id: c.id,
        nome: c.name,
        email: c.email,
        comentario: c.body,
        rating: (3 + Math.random() * 2).toFixed(1),
        data: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
          .toLocaleDateString('pt-BR')
      }));
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      throw error;
    }
  }

  async buscar(termo) {
    try {
      const prestadores = await this.getAll();
      const termoLower = termo.toLowerCase();
      
      return prestadores.filter(p => 
        p.nome.toLowerCase().includes(termoLower) ||
        p.categoria.toLowerCase().includes(termoLower) ||
        p.cidade.toLowerCase().includes(termoLower)
      );
    } catch (error) {
      console.error('Erro ao buscar prestadores:', error);
      throw error;
    }
  }

  async filtrarPorCategoria(categoria) {
    try {
      const prestadores = await this.getAll();
      
      if (categoria === 'todos') {
        return prestadores;
      }
      
      return prestadores.filter(p => 
        p.categoria.toLowerCase() === categoria.toLowerCase()
      );
    } catch (error) {
      console.error('Erro ao filtrar prestadores:', error);
      throw error;
    }
  }

  getCategoriaByIndex(index) {
    const categorias = [
      'Buffet',
      'DJ',
      'Fotografia',
      'Decoração',
      'Segurança',
      'Animação',
      'Barmans',
      'Garçons',
      'Florista',
      'Confeitaria'
    ];
    return categorias[index % categorias.length];
  }

  getCategorias() {
    return [
      'Buffet',
      'DJ',
      'Fotografia',
      'Decoração',
      'Segurança',
      'Animação',
      'Barmans',
      'Garçons',
      'Florista',
      'Confeitaria'
    ];
  }
}

export default new PrestadorService();
