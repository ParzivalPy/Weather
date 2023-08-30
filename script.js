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
}

function cityClick() {
    let cityToSearch = document.getElementById("cityName").value;
    console.log(cityToSearch);
    displayCityInfo(cityToSearch);
}

const buttonElement = document.getElementById("cityButton");

buttonElement.addEventListener("click", cityClick);
