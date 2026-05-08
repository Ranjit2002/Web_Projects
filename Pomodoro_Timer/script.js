const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");


const updateTime = () => {
    let d = new Date();

    let hours = d.getHours().toString().padStart(0, 2);
    let minutes = d.getMinutes().toString().padStart(0, 2);
    let seconds = d.getSeconds().toString().padStart(0, 2);

    hours.innerHTML = hours;
    minutes.innerHTML = minutes;
    seconds.innerHTML = seconds;
}

updateTime();
setInterval(updateTime, 1000);