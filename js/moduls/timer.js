 function timer(id, dedline) {
   //Timer
   

   function getTimeRemaning(endtime) {

     const t = Date.parse(endtime) - Date.parse(new Date()),
       days = Math.floor(t / (1000 * 60 * 60 * 24)),
       hours = Math.floor((t / (1000 * 60 * 60) % 24)),
       minuts = Math.floor((t / (1000 * 60) % 60)),
       seconds = Math.floor((t / 1000) % 60);

     return {
       'total': t,
       'days': days,
       'hours': hours,
       'minuts': minuts,
       'seconds': seconds,
     };
   }

   function getZero(num) {
     if (num >= 0 && num < 10) {
       return `0 ${num}`;
     } else {
       return num;
     }
   }

   function setClock(selector, endtime) {
     const timer = document.querySelector(selector),
       days = timer.querySelector('#days'),
       hours = timer.querySelector('#hours'),
       minuts = timer.querySelector('#minutes'),
       seconds = timer.querySelector('#seconds'),
       timerInterval = setInterval(upDateClock, 1000);
     upDateClock();

     function upDateClock() {
       const t = getTimeRemaning(endtime);
       days.innerHTML = getZero(t.days);
       hours.innerHTML = getZero(t.hours);
       minuts.innerHTML = getZero(t.minuts);
       seconds.innerHTML = getZero(t.seconds);

       if (t.total <= 0) {
         clearInterval(timerInterval);
       }
     }
   }
   setClock(id, dedline);
 }

 export default timer;