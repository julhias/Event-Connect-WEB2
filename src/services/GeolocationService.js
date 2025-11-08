class GeolocationService {
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não suportada pelo navegador'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            timestamp: position.timestamp
          });
        },
        (error) => {
          let errorMessage = 'Erro ao obter localização';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permissão de localização negada';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Localização indisponível';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tempo esgotado ao obter localização';
              break;
            default:
              errorMessage = 'Erro desconhecido';
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  watchPosition(callback, errorCallback) {
    if (!navigator.geolocation) {
      errorCallback(new Error('Geolocalização não suportada'));
      return null;
    }

    return navigator.geolocation.watchPosition(
      (position) => {
        callback({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
      },
      errorCallback,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  clearWatch(watchId) {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
  }

  async calculateDistance(lat1, lng1, lat2, lng2) {
    // Fórmula de Haversine para calcular distância entre dois pontos
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance; // em km
  }

  toRad(degrees) {
    return degrees * (Math.PI / 180);
  }
}

export default new GeolocationService();
