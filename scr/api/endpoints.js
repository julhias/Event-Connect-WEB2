const API_ENDPOINTS = {
  // JSONPlaceholder API
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  POSTS: '/posts',
  POST_BY_ID: (id) => `/posts/${id}`,
  COMMENTS: '/comments',
  COMMENTS_BY_POST: (postId) => `/posts/${postId}/comments`,
  
  // Weather API
  WEATHER: (lat, lon) => 
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=America/Sao_Paulo`,
  
  // Mock endpoints (para futuro backend real)
  EVENTOS: '/eventos',
  EVENTO_BY_ID: (id) => `/eventos/${id}`,
  CONTRATOS: '/contratos',
  CONTRATO_BY_ID: (id) => `/contratos/${id}`,
  PRESTADORES: '/prestadores',
  PRESTADOR_BY_ID: (id) => `/prestadores/${id}`,
  AVALIACOES: (prestadorId) => `/prestadores/${prestadorId}/avaliacoes`,
};

export default API_ENDPOINTS;
