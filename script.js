async function fetchCityInfo(city) {
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const results = data.results;
  
        const villeInfoList = results.map(result => {
            return {
              name: result.name,
              adminDivision: result.admin1 || result.admin2 || result.admin3 || result.admin4 || result.country
            };
        });
  
    return villeInfoList;
    } catch (error) {
    console.error('Error fetching city information:', error);
    return [];
    }
}
    
async function displayCityInfo(city) {
    const villeInfoList = await fetchCityInfo(city);

    if (villeInfoList.length === 0) {
    console.log('No city information available.');
    return;
    }

    comboChange(villeInfoList);
}

function cityClick() {
    let cityToSearch = document.getElementById("cityName").value;
    displayCityInfo(cityToSearch);
}

function comboChange(cityList) {
    const comboList = document.getElementById('comboList')

    while (comboList.firstChild) {
        comboList.removeChild(comboList.firstChild)
    }

    cityList.forEach((ville, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = ville.name + ", " + ville.adminDivision;
        comboList.appendChild(optionElement);
    });
}

const inputChange = document.getElementById("cityName");

inputChange.addEventListener("change", cityClick);

async function rechercher() {
    const apiUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=' + city + '&count=10&language=en&format=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const results = data.results;
        document.getElementById()
        const firstCity = data.features[0];
        const latitude = firstCity.latitude;
        const longitude = firstCity.longitude;
    } catch (error) {
        console.log('Une erreur s\'est produite' + error)
    }
}

const searchButton = document.getElementById('cityButton');

searchButton.addEventListener('click', rechercher);

async function rechercher() {
    let city = document.getElementById("cityName").value;
    const apiUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=' + city + '&count=10&language=en&format=json';
    try {
        const cityNumber = obtenirValeurOptionSelectionnee();
        const response = await fetch(apiUrl);
        const data = await response.json();
        const results = data.results[cityNumber];

        const cityLatitude = results["latitude"];
        const cityLongitude = results["longitude"];

        meteoApi(cityLatitude, cityLongitude);
    } catch (error) {
        console.log('Une erreur s\'est produite : ' + error)
    }
}

async function meteoApi(lat, lon) {
    const meteoApi = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&hourly=temperature_2m';

    try {
        const response = await fetch(meteoApi);
        const data = await response.json();
        const hourlyTemperature = data.hourly;

        for (let i = 0; i < hourlyTemperature['time'].length; i++) {
            const time = hourlyTemperature['time'][i].split('T');
            const temperature = hourlyTemperature['temperature_2m'][i];
        }
        createTable(hourlyTemperature['time'].length, hourlyTemperature)
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function obtenirValeurOptionSelectionnee() {
    selectElement = document.getElementById('comboList');
    var selectedIndex = selectElement.selectedIndex;
    var selectedValue = selectElement.options[selectedIndex].value;
    return selectedValue;
}

function createTable(len, data) {
    try {
        var tableBody = document.getElementById("tr1");

        for (var i = 1; i <= len; i++) {
        var td = document.createElement("td");
        td.textContent = "ID " + i;
        td.id = "tr1td" + i;
        tableBody.appendChild(td);
        }

        var tableBody = document.getElementById("tr2");

        for (var i = 1; i <= len; i++) {
        var td = document.createElement("td");
        td.textContent = "ID " + i;
        td.id = "tr2td" + i;
        tableBody.appendChild(td);
        }
        
        for (i = 1; i <= len; i ++) {
            let cell = document.getElementById("tr1td" + i);
            cell.textContent = data['time'][i];
        }

        for (i = 1; i <= len; i ++) {
            let cell = document.getElementById("tr2td" + i)
            cell.textContent = data['temperature_2m'][i];
        }
    } catch (error) {
        console.log('An error occured : ' + error)
    }
}

function fillTable(data) {
    for (i = 1; i <= data.length; i ++) {
        let cell = document.getElementById("tr1td" + i)
        console.log(document.getElementById('tr1td8').id)
        cell.textContent = data['time'][i];
    }
}

const buttonLocation = document.getElementById('geoloc');

buttonLocation.addEventListener("click", function() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            meteoApi(latitude, longitude);
        }, function(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.log("L'utilisateur a refusé la demande de géolocalisation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Les informations de géolocalisation ne sont pas disponibles.");
                    break;
                case error.TIMEOUT:
                    console.log("La demande de géolocalisation a expiré.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log("Une erreur inconnue est survenue.");
                    break;
            }
        });
    } else {
        console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
});