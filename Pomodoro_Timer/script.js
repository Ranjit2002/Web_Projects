// const hours = document.getElementById("hours");
// const minutes = document.getElementById("minutes");
// const seconds = document.getElementById("seconds");


// const updateTime = () => {
//     let d = new Date();

//     let rawHour = d.getHours();

//     let formatted12Hours = rawHour % 12 || 12;

//     let hour = formatted12Hours.toString().padStart(2, '0');
//     let minute = d.getMinutes().toString().padStart(2, '0');
//     let second = d.getSeconds().toString().padStart(2, '0');

//     hours.innerHTML = hour;
//     minutes.innerHTML = minute;
//     seconds.innerHTML = second;
// }

// updateTime();
// setInterval(updateTime, 1000);




// Grab your HTML elements
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Set starting time: 30 minutes converted to seconds (30 * 60 = 1800)
let timeRemaining = 30 * 60;

const updateTimer = () => {
    // 1. Calculate the current hours, minutes, and seconds
    const h = Math.floor(timeRemaining / 3600);
    const m = Math.floor((timeRemaining % 3600) / 60);
    const s = timeRemaining % 60;

    // 2. Format with leading zeros and update the HTML
    hoursEl.innerHTML = h.toString().padStart(2, '0');
    minutesEl.innerHTML = m.toString().padStart(2, '0');
    secondsEl.innerHTML = s.toString().padStart(2, '0');

    // 3. Check if the time is up
    if (timeRemaining <= 0) {
        clearInterval(countdownInterval); // Stop the interval from running

        // --- NOTIFICATION ACTIONS ---
        // alert("Time is over!"); // Simple browser alert

        // Placeholder for your future audio notification
        const audio = new Audio('music/notification.mp3');
        audio.play();

        return; // Exit the function so timeRemaining doesn't go into negatives
    }

    // 4. Decrease the time by 1 second for the next loop
    timeRemaining--;
}

// Run it once immediately so the user doesn't wait 1 second to see the "30:00"
updateTimer();

// Start the timer, running every 1000 milliseconds (1 second)
const countdownInterval = setInterval(updateTimer, 1000);