document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch weather data based on city and country
    function fetchWeatherData(city, country) {
        const apiKey = '3c8f457e48msh573618924841771p10bc34jsn30cfeed6189d';
        const apiUrl = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city},${country}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                'X-RapidAPI-Key': apiKey,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('lokasi').innerHTML = `<b>${data.location.name}, ${data.location.country}</b>`;
                document.getElementById('tanggal').innerHTML = data.location.localtime;
                document.getElementById('derajat').innerHTML = `<b>${data.current.temp_c}</b> C`;
                document.getElementById('cuaca').innerHTML = data.current.condition.text;
                document.getElementById('gbr_cuaca').src = data.current.condition.icon;
                document.getElementById('tgl').innerHTML = data.current.last_updated.split(' ')[0];
                document.getElementById('jam').innerHTML = `<b>${data.current.last_updated.split(' ')[1]}</b>`;
                document.getElementById('km').innerHTML = `<b>${data.current.wind_kph}</b> km/h`;
                document.getElementById('gbr_condition').src = data.current.condition.icon;
                document.getElementById('kondisi').innerHTML = `<b>${data.current.condition.text}</b>`;
                document.getElementById('uv').innerHTML = `<b>${data.current.uv}</b>`;
                document.getElementById('suhu').innerHTML = `<b>${data.current.temp_c}</b> C`;
                document.getElementById('humidity').innerHTML = `<b>${data.current.humidity}</b> %`;

                // 2. Atur display appear pada card-container ketika data berhasil ditemukan
                cardContainer.style.display = 'block';
                judulHighlight.innerHTML = 'Todays Highlight'; // Bersihkan pesan jika ada
                infoCuaca.style.display = 'block';
            })
            .catch(error => {
                // 3. Atur display none pada card-container dan tampilkan pesan jika data tidak ditemukan
                infoCuaca.style.display = 'none';
                cardContainer.style.display = 'none';
                judulHighlight.innerHTML = 'Kota tidak ditemukan';
                console.error('Error fetching weather data:', error);
            });
    }

    const searchInput = document.getElementById('searchInput');
    const citiesDatalist = document.getElementById('cities');
    const searchButton = document.getElementById('searchButton');
    const cardContainer = document.querySelector('.card-container');
    const judulHighlight = document.getElementById('judul_highlight');
    const infoCuaca = document.querySelector('.info_cuaca');

    cardContainer.style.display = 'none';

    searchInput.addEventListener('input', function () {
        const inputText = this.value;
        const suggestionsApiUrl = `https://weatherapi-com.p.rapidapi.com/search.json?q=${inputText}`;

        fetch(suggestionsApiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                'X-RapidAPI-Key': '3c8f457e48msh573618924841771p10bc34jsn30cfeed6189d',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                citiesDatalist.innerHTML = ''; // Clear datalist
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = `${item.name}, ${item.country}`;
                    citiesDatalist.appendChild(option);
                });
            })
            .catch(error => 
                
                console.error('Error fetching autocomplete suggestions:', error));
    });

    searchButton.addEventListener('click', function () {
        const selectedLocation = searchInput.value;
        const [city, country] = selectedLocation.split(',').map(item => item.trim());
        fetchWeatherData(city, country);
    });
});



