let userLoc = document.getElementById('const')
const kelvin = 273;
async function getUserIpLoc(){
    try{
        const ip_addr_loc = await fetch('http://ip-api.com/json')
        const ip_data = await ip_addr_loc.json()
        return ip_data
    }
    catch(error) {
        console.log(`An error occured ${error}`)
        return false
    }
}


function fillConstant() {
    let api_city;
    getUserIpLoc().then((data) => {
        if (data != false) {
            api_city = data.regionName
            fetch (`https://api.openweathermap.org/data/2.5/weather?q=${api_city}&APPID=a4f6446ec98aea31b03a0a082910316e`)
            .then(response => response.json())
            .then(data => {
                userLoc.dataset.id = `${data.name}`
                userLoc.innerHTML = `
                    <div class="icon">
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" style= 'height:5rem'/>
                    <figcaption class="fade">${data.weather[0].description}</figcaption>
                    </div>
                    <div class="temperature">
                    ${Math.floor(data.main.temp - kelvin) + "°C"}
                    <div></div>
                    </div>
                    <div class="location">
                    ${data.name}<span class="super">${data.sys.country}</span>
                    </div>
                `
            })
        }
        else {
        userLoc.style.display = 'none'
        }
        
    })
}
async function getWeatherInfo(city_name){
    try {
        const weather_req = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&APPID=a4f6446ec98aea31b03a0a082910316e`)
        const weather_req_return = await weather_req.json()
        return weather_req_return
    }
    catch(error) {
        console.log(`An error occured ${error}`)
        return false
    }
}

function searchCity() {
    let form = document.getElementById("search_city")
    let body = document.querySelector('.body')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let city_name = form['city'].value
        getWeatherInfo(city_name).then((data) => {
            if (data.cod == 404) {
                alert(data.message)
            }
            else {
                let remove_div = document.querySelectorAll(`[data-id="${data.name}"]`)
                for (i = 0; i < remove_div.length; i++) {
                    remove_div[i].remove()
                }
                body.innerHTML += `
                <div class="result custom" data-id="${data.name}">
                    <div class="icon">
                        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" style= 'height:5rem'/>
                        <figcaption class="fade">${data.weather[0].description}</figcaption>
                        </div>
                        <div class="temperature">
                        ${Math.floor(data.main.temp - kelvin) + "°C"}
                        <div></div>
                        </div>
                        <div class="location">
                        ${data.name}<span class="super">${data.sys.country}</span>
                    </div>
                </div>
                `
            }

        })
        form['city'].value = ""
        
    })
    
}


fillConstant()
searchCity()
