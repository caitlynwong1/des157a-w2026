(function(){
    'use strict';
    console.log("reading js");

    const img1 = document.querySelector('#one')
    const img2 = document.querySelector('#two')
    const img3 = document.querySelector('#three')

    // Hover to Grow
    img1.addEventListener('mouseover', function(event) {
        img1.className = "grow";
    });

    img1.addEventListener('mouseout', function(event) {
        img1.className = "shrink";
    });

    // Click to Focus
    img2.addEventListener('click', function(event) {
        img2.className = "infocus";
    });

    // Scroll to Grow
    window.addEventListener('scroll', function(event) {
        const scrollPosition = window.pageYOffset - 180;
        img3.style.transform = 'rotate(' + scrollPosition + 'deg)';
    });

})();