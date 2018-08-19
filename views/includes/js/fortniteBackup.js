const Client = require('fortnite');
const fortnite = new Client('8d7a84bf-70d8-4e93-ab6f-f000152fd525');
let username = document.getElementById('username');
let input = document.getElementsByTagName('input')[0];
let body = document.getElementsByTagName('body')[0];
let platformP = document.getElementById('platform');

fortnite.user(username.textContent, platformP.textContent ).then(function(resolved){
  var i = 0;
  var txt = JSON.stringify(resolved, undefined, 2)
  var speed = 15;
  function typeWriter() {
    if (i < txt.length) {
      document.getElementById('output').innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter()
});

body.addEventListener('click', e => {
  input.focus()
});