const navDialog = document.getElementById("nav-dialog");

function handleMenu(){
    navDialog.classList.toggle("hidden");
}

const initialTranslateLTR = -48*4;
const initialTranslateRTL = 36*4;

function setupIntersectionObserver(element, isLTR, speed){

    const intersectionCallback = (entries) =>{
        const isIntersecting = entries[0].isIntersecting;
        if(isIntersecting){
            document.addEventListener("scroll", scrollHandler);
        }
        else{
            document.removeEventListener("scroll", scrollHandler);
        }
    }

    // FIX 1: Properly initialize the IntersectionObserver
    const intersectionObserver = new IntersectionObserver(intersectionCallback);

    intersectionObserver.observe(element);

    function scrollHandler(){
        // FIX 2: Corrected getBoundingClientRect typo
        const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;

        let totalTranslate = 0;

        if(isLTR){
            totalTranslate = translateX + initialTranslateLTR;
        }else{
            totalTranslate = -(translateX + initialTranslateRTL); 
        }

        element.style.transform = `translateX(${totalTranslate}px)`;
    }
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const line4 = document.getElementById('line4');

// Setup observers independently so one missing element doesn't break the others
if (line1) setupIntersectionObserver(line1, true, 0.15);
if (line2) setupIntersectionObserver(line2, false, 0.15);
if (line3) setupIntersectionObserver(line3, true, 0.15);
if (line4) setupIntersectionObserver(line4, true, 0.8);

const data = document.getElementById("data");

const dtElements = document.querySelectorAll('dt');
dtElements.forEach(element => {
    element.addEventListener("click", () => {
        const ddId = element.getAttribute('aria-controls');
        const ddElement = document.getElementById(ddId);
        const ddArrowIcon = element.querySelectorAll('i')[0];

        ddElement.classList.toggle('hidden');
        ddArrowIcon.classList.toggle('-rotate-180');
    })
})