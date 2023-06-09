function timer (id ,deadline) {
    

    //функция определяющая разницу между дедлайн  и  настоящим 
    function getTimeRemaining(endtime){
        let days , hours ,minutes ,seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        //summary of remaining days in milliseconds
        if(t <= 0 ){
            days = 0;
            hours = 0 ;
            minutes = 0;
            seconds = 0;
        }else {
              days = Math.floor( (t/(1000*60*60*24)) ),// summary of remaining days in days
              hours = Math.floor( (t / (1000*60*60) % 24) ),
              minutes = Math.floor( (t/1000/60) % 60 ),
              seconds = Math.floor( (t/1000) % 60);
        }

              
        
              
        return {
            'total' : t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds' : seconds
        };
    }

    function getZero (num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    //функция устанавливания таймера на страницу 
    //selector элемент таймера ,endtime дедлайн таймера 
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'), //element of days
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),//element of minutes
                seconds = timer.querySelector('#seconds'); //element of seconds 

        //запускаем функцию каждую секунду 
        const timeInterval = setInterval(updateClock, 1000);
        
        updateClock();
        
        //функция обновление таймера в каждую секунду
        function updateClock (){
            //расчет времени который остался на эту секунду
            const t = getTimeRemaining(endtime); //it is our function that returns an object with remaineng time
            //записываем в ХТМЛ  дни
            days.innerHTML = getZero(t.days);  
            hours.innerHTML = getZero(t.hours); 
            minutes.innerHTML = getZero(t.minutes); 
            seconds.innerHTML = getZero(t.seconds); 


            //stopping the timer 
            // if the total time in object returnd from function getTimeRemaining is 
            //equal or less than 0 , then we clear the interval , and function updateClock stops 
            if(t.t <= 0){
                clearInterval(timeInterval);
            }
        }   
    }




    setClock(id, deadline);
}

export default timer;