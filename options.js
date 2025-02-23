// Cargar configuraciones guardadas
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['useGeolocation', 'defaultCountry', 'phoneNumber'], (data) => {
      const useGeolocationCheckbox = document.getElementById('useGeolocation');
      const defaultCountryInput = document.getElementById('defaultCountry');
      const phoneNumberInput = document.getElementById('phoneNumber');
  
      // Configurar valores iniciales
      useGeolocationCheckbox.checked = data.useGeolocation || false;
      defaultCountryInput.value = data.defaultCountry || '';
      phoneNumberInput.value = data.phoneNumber || '';
  
      // Deshabilitar o habilitar el campo de país por defecto según la geolocalización
      defaultCountryInput.disabled = useGeolocationCheckbox.checked;
    });
  
    // Añadir listener para el checkbox de geolocalización
    document.getElementById('useGeolocation').addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      document.getElementById('defaultCountry').disabled = isChecked;
    });
  });
  
  // Guardar configuraciones
  document.getElementById('save').addEventListener('click', () => {
    const useGeolocation = document.getElementById('useGeolocation').checked;
    const defaultCountry = document.getElementById('defaultCountry').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
  
    chrome.storage.sync.set({
      useGeolocation,
      defaultCountry,
      phoneNumber
    }, () => {
      alert('Configuración guardada correctamente');
    });
  });
  