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

    console.log('City Information:');
    villeInfoList.forEach((ville, index) => {
    console.log(`${index + 1}. ${ville.name}, ${ville.adminDivision}`);
    });

    comboChange(villeInfoList);
}

function cityClick() {
    let cityToSearch = document.getElementById("cityName").value;
    console.log(cityToSearch);
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
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const results = data.results;

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
    const apiUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const results = data.results;

        let cityLatitude = results[0]["latitude"];
        let cityLongitude = results[0]["longitude"];
        console.log(cityLatitude + " / " + cityLongitude)
    } catch (error) {
        console.log('Une erreur s\'est produite : ' + error)
    }
}

async function recuperationMeteo(lat, lon) {
    const apiMeteo = 'https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m';
    try {
        const response = await fetch(apiMeteo);
        const data = await response.json();
        const hourly = data.hourly;

        for (i=0; i>= hourly.length; i++) {
            let time = hourly["time"][i].split('T')
            console.log(time)
        }
    } catch (error) {
        console.log('Une erreur s\'est produite : ' + error)
    }
}