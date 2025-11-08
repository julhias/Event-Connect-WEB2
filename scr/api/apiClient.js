import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para adicionar token de autenticação (se necessário)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eventconnect_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Servidor respondeu com erro
      console.error('Erro na resposta:', error.response.status);
      
      switch (error.response.status) {
        case 401:
          // Não autorizado - redirecionar para login
          localStorage.removeItem('eventconnect_token');
          window.location.href = '/login';
          break;
        case 404:
          console.error('Recurso não encontrado');
          break;
        case 500:
          console.error('Erro interno do servidor');
          break;
        default:
          console.error('Erro:', error.response.data);
      }
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error('Sem resposta do servidor');
    } else {
      // Erro ao configurar a requisição
      console.error('Erro ao configurar requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
