
let workInMinute = 0;
document.querySelector('.WorkTime').innerHTML = 'Время выполнения: ' + workInMinute + ' мин';
setInterval(
   () => { 
    workInMinute++;
    document.querySelector('.WorkTime').innerHTML = 'Время выполнения: ' + Math.trunc(workInMinute / 60) + ' мин';
},
   1000
);





