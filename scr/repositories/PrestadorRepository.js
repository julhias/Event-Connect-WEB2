import PrestadorService from '../services/PrestadorService';

class PrestadorRepository {
  // Este repositório apenas encapsula as chamadas ao serviço
  // pois os dados vêm da API externa

  async findAll() {
    return await PrestadorService.getAll();
  }

  async findById(id) {
    return await PrestadorService.getById(id);
  }

  async search(termo) {
    return await PrestadorService.buscar(termo);
  }

  async filterByCategory(categoria) {
    return await PrestadorService.filtrarPorCategoria(categoria);
  }

  async getAvaliacoes(prestadorId) {
    return await PrestadorService.getAvaliacoes(prestadorId);
  }

  getCategories() {
    return PrestadorService.getCategorias();
  }
}

export default new PrestadorRepository();
