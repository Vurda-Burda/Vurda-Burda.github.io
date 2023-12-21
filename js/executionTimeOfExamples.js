let workTime = 0;
let minute = 0;

document.querySelector('.WorkTime').innerHTML = 'Время выполнения: ' + minute + ' мин ' + workTime + ' сек';
let timer = setInterval(
   () => {
      if(minute == 60) {
         clearInterval(timer);
      } 
      workTime++;
      if(workTime == 60) {
         minute ++;
         workTime = 0;
      }
      document.querySelector('.WorkTime').innerHTML = 'Время выполнения: ' + minute + ' мин ' + workTime + ' сек';
   },
   1000
);





