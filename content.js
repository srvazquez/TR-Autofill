const paisesTraduccion = {
    "Germany": "Alemania",
    "Spain": "España",
    "France": "Francia",
    "Italy": "Italia",
    "Portugal": "Portugal",
    "Netherlands": "Países Bajos",
    "Austria": "Austria",
    "Belgium": "Bélgica",
    "Greece": "Grecia",
    "Ireland": "Irlanda",
    "Luxembourg": "Luxemburgo",
    "Finland": "Finlandia",
    "Sweden": "Suecia",
    "Denmark": "Dinamarca",
    "Poland": "Polonia",
    "Czechia": "República Checa",
    "Hungary": "Hungría",
    "Slovakia": "Eslovaquia",
    "Slovenia": "Eslovenia",
    "Estonia": "Estonia",
    "Latvia": "Letonia",
    "Lithuania": "Lituania",
    "Bulgaria": "Bulgaria",
    "Croatia": "Croacia",
    "Romania": "Rumania",
    "Cyprus": "Chipre",
    "Malta": "Malta"
  };
  
  // Obtener país usando geolocalización
  function obtenerPaisPorGeolocalizacion(callback) {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const paisIngles = data.country_name;
        const paisEspanol = paisesTraduccion[paisIngles] || paisIngles;
        callback(paisEspanol);
      })
      .catch(error => {
        console.error("Error al obtener la geolocalización:", error);
        callback(null);
      });
  }
  
  // Rellenar país
  function rellenarPais(pais) {
    const dropdownButton = document.querySelector('.dropdownList__openButton');
  
    if (dropdownButton) {
      dropdownButton.click();
  
      setTimeout(() => {
        const opciones = document.querySelectorAll('.dropdownList__listItem');
        let encontrado = false;
  
        opciones.forEach(opcion => {
          const nombrePais = opcion.querySelector('.dropdownList__optionName')?.innerText.trim();
  
          if (nombrePais && nombrePais.toLowerCase() === pais.toLowerCase()) {
            opcion.click();
            console.log(`País seleccionado: ${nombrePais}`);
            encontrado = true;
          }
        });
  
        if (!encontrado) {
          console.warn(`No se encontró la opción para el país: ${pais}`);
        }
      }, 500);
    } else {
      console.error("No se encontró el botón del dropdown para seleccionar el país.");
    }
  }
  
  // Rellenar número de teléfono
  function rellenarTelefono(numero) {
    const inputTelefono = document.getElementById('loginPhoneNumber__input');
    if (inputTelefono) {
      inputTelefono.value = numero;
      inputTelefono.dispatchEvent(new Event('input', { bubbles: true }));
      console.log(`Número de teléfono rellenado: ${numero}`);
    } else {
      console.error("No se encontró el campo para el número de teléfono.");
    }
  }
  
  // Lógica principal
  window.addEventListener('load', () => {
    chrome.storage.sync.get(['useGeolocation', 'defaultCountry', 'phoneNumber'], (data) => {
      const { useGeolocation, defaultCountry, phoneNumber } = data;
  
      // Rellenar país
      if (useGeolocation) {
        obtenerPaisPorGeolocalizacion((pais) => {
          if (pais) rellenarPais(pais);
        });
      } else if (defaultCountry) {
        rellenarPais(defaultCountry);
      }
  
      // Rellenar teléfono
      if (phoneNumber) {
        rellenarTelefono(phoneNumber);
      }
    });
  });
  