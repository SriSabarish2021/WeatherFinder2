//BODY AND CONTAINER 
const body=document.getElementById("body")
const container=document.getElementById("container")

//HEADING
const heading=document.getElementById("heading")

//INPUT
const btn=document.getElementById("btn")
const inputbox=document.querySelector(".user")
const input=document.getElementById("input")

//CONTENT
const data=document.querySelector(".box") 
const APIkey="f8c952215bf0b19989cd9305097a5421" 

//FROMT VIDEO
const prevvid=document.getElementById("myVideo")

//FUNCTIONALITY
inputbox.addEventListener("submit",async (event)=>{

    event.preventDefault()

    inputbox.style.paddingTop="0px";
    heading.classList.add("animation")
    heading.style.top="3px"

    const cityval=input.value
    if(cityval){
        try{
            const WeatherData=await getWeatherData(cityval)
            displayweatherData(WeatherData)
            heading.style.display="none"
            container.style.top="30px"
        }
        catch(error){
            console.log(error)
            inputerror(error)
           
        }
    }
    else{
        inputerror("Please Enter the City")
        heading.classList.remove("animation")
        heading.style.top="10px"
    }
})

//JSON
async function getWeatherData(city){
    
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
    const collect=await fetch(apiurl) 
    console.log(collect)

    if(!collect.ok){
        throw new Error("Could not fetch Weather")
    }
    return await collect.json()
}

//DESTRUCTURING
function displayweatherData(weadata){
    console.log(weadata)

    const {name: city, main: {temp,humidity}, weather: [{description,id}]}=weadata;

    data.textContent="";
    data.style.display="flex"

    const Cityname=document.createElement("h1")
    const degreeval=document.createElement("p")
    const humidityval=document.createElement("p")
    const skytype=document.createElement("p")
    const emojiname=document.createElement("p")

    Cityname.textContent=city
    data.appendChild(Cityname)
    Cityname.classList.add("city")


    degreeval.textContent=`${((temp - 273.15) * (9/5) + 32 ).toFixed(1)}°F`
    data.appendChild(degreeval)
    degreeval.classList.add("degree")


    humidityval.textContent=`Humidity: ${humidity}%`
    data.appendChild(humidityval)
    humidityval.classList.add("humidity")


    skytype.textContent=description
    data.appendChild(skytype)
    skytype.classList.add("sky")

    emojiname.textContent=emoji(id)
    data.appendChild(emojiname)
    emojiname.classList.add("img")

}

//WEATHER EMOJI
function emoji(weatheremoji){

    switch(true){
        case(weatheremoji>=200 && weatheremoji<300):
            prevvid.style.display="none"
            body.style.backgroundImage="url('thunder.jpg')"
            body.style.backgroundSize="cover"
            body.style.backgroundRepeat="norepeat"
            return "⛈️";
        case(weatheremoji>=300 && weatheremoji<400):
            prevvid.style.display="none"
            body.style.backgroundImage="url('rainyy.jpg')"
            body.style.backgroundSize="cover"
            body.style.backgroundRepeat="norepeat"
            return "🌦️";
        case(weatheremoji>=500 && weatheremoji<600):
            prevvid.style.display="none"
            body.style.backgroundImage="url('rainyy.jpg')"
            body.style.backgroundSize="cover"
            body.style.backgroundRepeat="norepeat"
            return "🌧️";
        case(weatheremoji>=600 && weatheremoji<700):
            prevvid.style.display="none"
            body.style.backgroundImage="url('snow.jpg.jpg')"
            body.style.backgroundSize="cover"
            body.style.backgroundRepeat="norepeat"
            return "❄️";
        case(weatheremoji>=700 && weatheremoji<800):
            prevvid.style.display="none"
            body.style.backgroundImage="url('sunnywea.jpg')"
            body.style.backgroundSize="cover"
            body.style.backgroundRepeat="norepeat"
            return "🌤️";
        case(weatheremoji===800):
            prevvid.style.display="none"
            body.style.backgroundImage="url('sunnywea.jpg')"
            body.style.backgroundSize="cover"
            body.style.backgroundRepeat="norepeat"
            return "🌞";
        case(weatheremoji>=804):
            prevvid.style.display="none"
            body.style.backgroundImage="url('cloudy.jpg')"
            body.style.backgroundSize="cover"
            body.style.backgroundRepeat="norepeat"
            return "☁️";
        case(weatheremoji>=801 && weatheremoji<=803):
            prevvid.style.display="none"
            body.style.backgroundImage="url('broken cloud.jpg')"
            body.style.backgroundSize="cover"
            body.style.backgroundRepeat="norepeat"
            return "🌥️";
        default:
            return "❓"   
    }
}

//ERROR
function inputerror(error){
    const errortext=document.createElement("p")
    errortext.textContent=error
    errortext.classList.add("error")

    data.textContent=""
    data.style.display="flex"
    data.appendChild(errortext)

    heading.classList.remove("animation")
    heading.style.display="none"
    prevvid.style.display="block"
}

//BTN
btn.addEventListener("mouseover",()=>{
    btn.style.backgroundColor="#DD58D6"
    btn.style.height="50px"
    btn.style.width="130px"
    btn.style.transition="0.3s"
})
btn.addEventListener("mouseout",()=>{
    btn.style.backgroundColor="#ec5bd6"
    btn.style.height="40px"
    btn.style.width="120px"
    btn.style.transition="0.3s"
})

//INPUTBOX
inputbox.addEventListener("mouseover",()=>{
    input.style.height="55px"
    input.style.width="250px"
    input.style.transition="0.3s"
})
inputbox.addEventListener("mouseout",()=>{
    input.style.height="50px"
    input.style.width="230px"
    input.style.transition="0.3s"
})




const time=document.getElementById("time")

function clock(){
    const date=new Date
    const hour=date.getHours().toString().padStart(2,0)
    const minutes=date.getMinutes().toString().padStart(2,0)
    const seconds=date.getSeconds().toString().padStart(2,0)
    let vari=hour>12?"PM":"AM" 
    time.textContent=`${hour}:${minutes}:${seconds}:${vari}`
}
clock()
setInterval(clock,1000)


