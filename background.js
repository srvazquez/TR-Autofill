// Al instalar o actualizar la extensión
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      console.log('Extensión instalada por primera vez.');
  
      // Configuración inicial por defecto
      chrome.storage.sync.set({
        useGeolocation: true,
        defaultCountry: '',
        phoneNumber: ''
      }, () => {
        console.log('Configuración por defecto guardada.');
      });
  
    } else if (details.reason === 'update') {
      console.log('Extensión actualizada a una nueva versión.');
    }
  });
  
  // Listener para posibles mensajes internos en el futuro
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getConfig') {
      // Enviar la configuración actual al content script o popup
      chrome.storage.sync.get(['useGeolocation', 'defaultCountry', 'phoneNumber'], (data) => {
        sendResponse(data);
      });
      return true; // Indica que la respuesta es asincrónica
    }
  
    if (request.type === 'log') {
      console.log('Mensaje desde otro script:', request.message);
    }
  });
  