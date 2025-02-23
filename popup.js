// Cargar configuraciones guardadas al abrir el popup
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['useGeolocation', 'defaultCountry', 'phoneNumber'], (data) => {
      document.getElementById('toggleGeolocation').checked = data.useGeolocation || false;
      document.getElementById('currentCountry').textContent = data.defaultCountry || 'No configurado';
      document.getElementById('currentPhone').textContent = data.phoneNumber || 'No configurado';
    });
  });
  
  // Actualizar configuración al cambiar el checkbox de geolocalización
  document.getElementById('toggleGeolocation').addEventListener('change', (e) => {
    const useGeolocation = e.target.checked;
    chrome.storage.sync.set({ useGeolocation }, () => {
      console.log(`Geolocalización ${useGeolocation ? 'activada' : 'desactivada'}`);
    });
  });
  
  // Abrir la página de opciones al hacer clic en el botón
  document.getElementById('openOptions').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
  