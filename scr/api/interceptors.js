
export const requestLogger = (config) => {
  console.log(`[${config.method.toUpperCase()}] ${config.url}`, config.data);
  return config;
};

export const responseLogger = (response) => {
  console.log(`[RESPONSE] ${response.config.url}`, response.data);
  return response;
};

export const errorLogger = (error) => {
  if (error.response) {
    console.error(`[ERROR ${error.response.status}] ${error.config.url}`, error.response.data);
  } else {
    console.error('[ERROR]', error.message);
  }
  return Promise.reject(error);
};

// Cache simples para requisições GET
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const cacheInterceptor = (config) => {
  if (config.method === 'get') {
    const cachedData = cache.get(config.url);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      console.log('[CACHE HIT]', config.url);
      return Promise.resolve({
        data: cachedData.data,
        status: 200,
        statusText: 'OK (cached)',
        headers: {},
        config,
      });
    }
  }
  return config;
};

export const cacheResponseInterceptor = (response) => {
  if (response.config.method === 'get') {
    cache.set(response.config.url, {
      data: response.data,
      timestamp: Date.now(),
    });
  }
  return response;
};

