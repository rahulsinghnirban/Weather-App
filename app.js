window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempDes = document.querySelector('.temperature-description')
    let tempDeg = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let uiIcon = document.querySelector(".icon")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=> {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const proxy = 'https://cors-anywhere.herokuapp.com'

            const APIkey = '6f6de9368569e46cdbe140aa5c2e95c6'
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}`

            async function getData(){
                const response = await fetch(url);
                const res = await response.json();
                return res;
            }
            getData().then(data => {

                const celsius = data.main.temp - 273.15
                const des = data.weather[0].description;
                const city = data.name
                const country = data.sys.country
                const icon = data.weather[0].icon

                tempDeg.innerHTML = `${Math.floor(celsius)}&#8451`;
                tempDes.innerHTML = des;
                locationTimezone.innerHTML = `${city}, ${country}`;
                uiIcon.innerHTML = `<img src='http://openweathermap.org/img/wn/${icon}@4x.png'>`

            })
        })
    }
})

