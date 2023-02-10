f = document.getElementById('form_f');
function myFunction(){
    f.style.border = "1px solid var(--main-color)"
}

function myFunction2(){
    f.style.border = "0.5px solid rgba(255, 255, 255, 0.1)"
}


if(localStorage.getItem('ville')){
    ville=localStorage.getItem('ville')
}else{
    ville='bouira'
    localStorage.setItem('ville','Bouira')
}


const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        result = JSON.parse(this.responseText)
        resultL = JSON.parse(this.responseText).location
        resultC = JSON.parse(this.responseText).current
        i = 1
        resultF = JSON.parse(this.responseText).forecast.forecastday
        villeSelected.innerText = ville +", "+ resultL.country
        l_u.innerText = resultL.localtime.slice(11,16);
        tempC.innerText = resultC.temp_c+"°";
        img_st.style.backgroundImage = "url(http:"+(resultC.condition.icon)+")";
        preloader.style.display="none";
        
        for (let i = 0; i < 3; i++) {
            ww.innerHTML+= 
            '<div class="box"><span class="day">day '+(i+1)+'</span><span class="stat" id="stt'+i+'"></span><span class="temp">'+resultF[i]["hour"][i]["temp_c"]+'°</span></div>';   
            document.getElementById('stt'+i).style.backgroundImage = "url(http:"+(resultF[i]['hour']['12']['condition']['icon'])+")";
        }
      
    }
});

function myfunction1() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2501bc847fmsh7ecbaac873c34e8p1d8083jsn7fa997d96f70',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    villes = ['london','paris','oran']
    for (let i = 0; i < villes.length; i++) {
        const element = villes[i];
        fetch('https://weatherapi-com.p.rapidapi.com/current.json?q='+element, options)
        .then(response => response.json())
        .then(response => document.getElementById('country_b_'+(i+1)).innerText = response.location.country)
        .catch(err => console.error(err));

        fetch('https://weatherapi-com.p.rapidapi.com/current.json?q='+element, options)
        .then(response => response.json())
        .then(response => document.getElementById('city_b_'+(i+1)).innerText = response.location.name)
        .catch(err => console.error(err));

        fetch('https://weatherapi-com.p.rapidapi.com/current.json?q='+element, options)
        .then(response => response.json())
        .then(response => document.getElementById('sit_b_'+(i+1)).innerText = response.current.condition.text)
        .catch(err => console.error(err));

        fetch('https://weatherapi-com.p.rapidapi.com/current.json?q='+element, options)
        .then(response => response.json())
        .then(response => document.getElementById('c2Img'+(i+1)).style.backgroundImage = "url(http:"+(response.current.condition.icon)+")")
        .catch(err => console.error(err));

        fetch('https://weatherapi-com.p.rapidapi.com/current.json?q='+element, options)
        .then(response => response.json())
        .then(response => document.getElementById('c2tmp'+(i+1)).innerText = response.current.temp_c+" °")
        .catch(err => console.error(err));
    }

    xhr.open("GET", "https://weatherapi-com.p.rapidapi.com/forecast.json?q="+ville+"&days=7");
    xhr.setRequestHeader("X-RapidAPI-Key", "2501bc847fmsh7ecbaac873c34e8p1d8083jsn7fa997d96f70");
    xhr.setRequestHeader("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com"); 
    xhr.send(data);
}
function updateVille(){
    ville=localStorage.setItem('ville',villeS.value)
    myfunction1()
}
window.onload = myfunction1()
