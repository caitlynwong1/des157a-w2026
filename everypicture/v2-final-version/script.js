(function(){
    'use strict';
    console.log('reading js');

    const theImages = document.querySelectorAll ('.row');
    const theGallery = document.querySelector('#gallery');
    const lastImage = document.querySelector('.row:last-of-type')
    const hiddenHeader = document.querySelector('.hiddenHeader');

    let counter = 1;

    const observer = new IntersectionObserver(callBack, {threshold: 0.5});
    const observeLastImage = new IntersectionObserver(addNewContent, {rootMargin:'100px'});
    observeLastImage.observe(lastImage);

    theImages.forEach(function(eachImage){
        observer.observe(eachImage);
    });

    function callBack(entries){
        entries.forEach(function(eachEntry){
            if(eachEntry.isIntersecting){
                // console.log(eachEntry);
                eachEntry.target.classList.add('show');
                // hiddenHeader.className = "showingHeader";
            } else {
                eachEntry.target.classList.remove('show');
                hiddenHeader.className = "hiddenHeader";
            }
        });
    }

    function addNewContent(entries){
        const lastCard = entries[0];
        if(lastCard.isIntersecting) {
            // console.log('last card is intersecting');
            createNewContent();
            observeLastImage.unobserve(lastCard.target);
            observeLastImage.observe(document.querySelector('.img:last-of-type'));
        }
        
        // overlay content
        const imgContainer = document.querySelectorAll('.img');
        const overlay = document.querySelector('#overlay');

        for (const eachContainer of imgContainer) {
            eachContainer.addEventListener('click', function(){
                window.scrollTo(0,0);
                overlay.className = "showing";
                document.body.classList.add('no-scroll');

                // sets overlay image to the image that was selected
                const imageSource = eachContainer.getAttribute('src');
                console.log(imageSource);
                const overlayImg = document.querySelector('#overlayImg');
                overlayImg.src = imageSource;

                if (imageSource == 'images/img1.jpeg') {
                    overlayImg.setAttribute('src', 'images/over1.jpg');
                } else if (imageSource == 'images/img2.jpeg') {
                    overlayImg.setAttribute('src', 'images/over2.jpg');
                } else if (imageSource == 'images/img3.jpeg') {
                    overlayImg.setAttribute('src', 'images/over3.jpg');
                } else if (imageSource == 'images/img4.jpeg') {
                    overlayImg.setAttribute('src', 'images/over4.jpg');
                } else if (imageSource == 'images/img5.jpeg') {
                    overlayImg.setAttribute('src', 'images/over5.jpg');
                } else if (imageSource == 'images/img6.jpeg') {
                    overlayImg.setAttribute('src', 'images/over6.jpg');
                } else if (imageSource == 'images/img7.jpeg') {
                    overlayImg.setAttribute('src', 'images/over7.jpg');
                } else if (imageSource == 'images/img8.jpeg') {
                    overlayImg.setAttribute('src', 'images/over8.jpg');
                }
            });
        }

        document.querySelector('.backbtn').addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('#overlay').className = "hidden";
            document.body.classList.remove('no-scroll');
        });
    }

    function createNewContent() {
        const newImg = document.createElement('div');
        newImg.classList.add('row');
        if (counter == 1) {
            newImg.innerHTML = `<div class="imgContainer"><img class="img" src="images/img1.jpeg" height="400" width="600" alt="img"></div>
            <div class="imgContainer"><img class="img" src="images/img2.jpeg" height="400" width="600" alt="img"></div>
            <div class="imgContainer"><img class="img" src="images/img3.jpeg" height="400" width="600" alt="img"></div>
            <div class="imgContainer"><img class="img" src="images/img4.jpeg" height="400" width="600" alt="img"></div>`;
            counter = counter + 1;
        } else if (counter == 2) {
            newImg.innerHTML = `<div class="imgContainer"><img class="img" src="images/img5.jpeg" height="400" width="600" alt="img"></div>
            <div class="imgContainer"><img class="img" src="images/img6.jpeg" height="400" width="600" alt="img"></div>
            <div class="imgContainer"><img class="img" src="images/img7.jpeg" height="400" width="600" alt="img"></div>
            <div class="imgContainer"><img class="img" src="images/img8.jpeg" height="400" width="600" alt="img"></div>`;
            counter = 1;
        }
        // else if (counter == 3) {
        //     newImg.innerHTML = `<div class="imgContainer"><img class="img" src="images/img9.jpeg" height="400" width="600" alt="img"></div>
        //     <div class="imgContainer"><img class="img" src="images/img10.jpeg" height="400" width="600" alt="img"></div>
        //     <div class="imgContainer"><img class="img" src="images/img11.jpeg" height="400" width="600" alt="img"></div>
        //     <div class="imgContainer"><img class="img" src="images/img8.jpeg" height="400" width="600" alt="img"></div>`;
        //     counter = 1;
        // }

        observer.observe(newImg);
        theGallery.append(newImg);
    }
})();