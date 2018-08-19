const p = document.getElementsByTagName('p')[0];
const circle = document.getElementsByTagName('div')[0];
const input = document.getElementsByTagName('input')[0];
const zip = document.getElementsByTagName('h3')[4];
const form = document.getElementsByTagName('form')[0];
// const city = document.getElementsByTagName('h3')[2];
// const state = document.getElementsByTagName('h3')[3];
// const zipcode = document.getElementsByTagName('h3')[4];

let geoInfo = {
    city: document.getElementsByTagName('h3')[2].textContent,
    state: document.getElementsByTagName('h3')[3],
    zipcode: document.getElementsByTagName('h3')[4]
}

function timeFunc(){ 
    // let date = new Date();
    // let dateHours = date.getHours()
    // dateHours += ((dateHours + 11) % 12);
    // let time = `${dateHours}:${date.getMinutes()}:${date.getSeconds()}`;
    // // console.log(time);
    let date = new Date();
    let time = date.toLocaleTimeString('en-US');
    let presentDate = date.toLocaleDateString('en-US');
    // console.log(datee.toLocaleTimeString('en-US'));

    const h3 = document.getElementsByTagName('h3')[0];
    const h3two =  document.getElementsByTagName('h3')[1];
    h3.textContent = time
    h3two.textContent = presentDate;
}

function onfocusout(){
    input.style.animation = 'input-pulse 2s linear 1s infinite';
    input.style.borderRadius = '50px';
}

//input event listener

input.addEventListener('submit', (e) => {
    if(circle.parentNode.removeChild(circle)){
    var div = document.createElement('div');
    div.className = 'weather-selector';
    } else {
        console.log('Something went wrong in the input Event Listener')
    }
});

input.addEventListener('focus', e => {
    input.style.border = 'none';
    input.style.borderRadius = '0px';
    input.style.animation = 'none';
});

const discordImg = document.getElementsByTagName('img')[1];
discordImg.addEventListener('mouseleave', e => {
    discordImg.style.transition = 'padding 1s';
});
    
const igImg = document.getElementsByTagName('img')[2];

igImg.addEventListener('mouseleave', e => {
    igImg.style.transition = 'padding 1s';
});

const twitterImg = document.getElementsByTagName('img')[3];

twitterImg.addEventListener('mouseleave', e => {
    twitterImg.style.transition = 'padding 1s';
});



let dynamicTime = setInterval(timeFunc, 1000);

const group2xx = [];

for(let i = 200; i <= 232; i++){
    group2xx.push(i);
}

const group5xx = [];
for(let i = 500; i <= 531; i++){
    group5xx.push(i);
}

const group6xx = [];
for(let i = 600; i <= 622; i++){
    group6xx.push(i);
}

const group7xx = [];
for(let i = 701; i <= 781; i++){
    group7xx.push(i);
}

const group80x = [];
for(let i = 800; i <= 804; i++){
    group80x.push(i);
}


if (p.textContent == group6xx.filter(id => id == p.textContent)) {
    console.log('Snow');
    circle.parentNode.removeChild(circle);
    
} else if(p.textContent == group7xx.filter(id => id == p.textContent)) {
    console.log('Atmosphere');
    circle.style.top = '415px';
    circle.style.left = '755px';
    
} else if(p.textContent == 800) {
    console.log('Clear' + '/Sunny')
    circle.style.top = '240px';
    circle.style.left = '768px';

} else if(p.textContent == group80x.filter(id => id == p.textContent)) {
    console.log('Clouds' + '/Cloudy')
    circle.style.top = '415px';
    circle.style.left = '755px';

} else if(p.textContent == group5xx.filter(id => id == p.textContent)) {
    console.log('Rain' + '/Rainy day')
    circle.style.top = '418px';
    circle.style.left = '530px';

} else if(p.textContent == group2xx.filter(id => id == p.textContent)) {
    console.log('Thunderstorm' + '/Rainy day');
    circle.style.top = '418px';
    circle.style.left = '530px';

} else {
    console.log('Something went wrong!');
}