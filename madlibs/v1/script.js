(function(){
    "use strict";
    console.log("reading js");

    const overlayContent = document.querySelector('#overlayContent p');
    const errorMessage = document.querySelector('#errorMessage');
    const myForm = document.querySelector('#form');

    myForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const adj1 = document.querySelector('#adj1').value;
        const weather = document.querySelector('#weather').value;
        const color = document.querySelector('#color').value;
        const verb1 = document.querySelector('#verb1').value;
        const location1 = document.querySelector('#location1').value;
        const verb2 = document.querySelector('#verb2').value;
        const noun = document.querySelector('#noun').value;
        const number = document.querySelector('#number').value;
        const exclamation = document.querySelector('#exclamation').value;
        const animal = document.querySelector('#animal').value;
        const location2 = document.querySelector('#location2').value;
        const adj2 = document.querySelector('#adj2').value;
        const greeting = document.querySelector('#greeting').value;
        const verb3 = document.querySelector('#verb3').value;

        let myText;
        let storyTitle;
        let storyText;

        if (adj1 == "") {
            myText = "please fill out empty fields";
            document.querySelector('#adj1').focus();
        } else if (weather == "") {
            myText = "please fill out empty fields";
            document.querySelector('#weather').focus();
        } else if (color == "") {
            myText = "please fill out empty fields";
            document.querySelector('#color').focus();
        } else if (verb1 == "") {
            myText = "please fill out empty fields";
            document.querySelector('#verb1').focus();
        } else if (location1 == "") {
            myText = "please fill out empty fields";
            document.querySelector('#location1').focus();
        } else if (verb2 == "") {
            myText = "please fill out empty fields";
            document.querySelector('#verb2').focus();
        } else if (noun == "") {
            myText = "please fill out empty fields";
            document.querySelector('#noun').focus();
        } else if (number == "") {
            myText = "please fill out empty fields";
            document.querySelector('#number').focus();
        } else if (exclamation == "") {
            myText = "please fill out empty fields";
            document.querySelector('#exclamation').focus();
        } else if (animal == "") {
            myText = "please fill out empty fields";
            document.querySelector('#animal').focus();
        } else if (location2 == "") {
            myText = "please fill out empty fields";
            document.querySelector('#location2').focus();
        } else if (adj2 == "") {
            myText = "please fill out empty fields";
            document.querySelector('#adj2').focus();
        } else if (greeting == "") {
            myText = "please fill out empty fields";
            document.querySelector('#greeting').focus();
        } else if (verb3 == "") {
            myText = "please fill out empty fields";
            document.querySelector('#verb3').focus();
        } else {
            document.querySelector('#overlay').className = "showing";
            myText = "";

            storyTitle = `Mr. Bread's ${adj1} Day`;
            storyText = `It was a <span class="inputStyle">${weather}</span> day. Mr. Bread was feeling a bit sad. He decided to pick out his favorite <span class="inputStyle">${color}</span> outfit before starting his day.
            
            He <span class="inputStyle">${verb1}</span> to the nearby <span class="inputStyle">${location1}</span> where he <span class="inputStyle">${verb2}</span> all day. After, Mr. Bear was feeling super hungry. He bought <span class="inputStyle">${noun}</span> at the store and ate <span class="inputStyle">${number}</span> of them!
            
            While he was eating, a nearby voice said, "<span class="inputStyle">${greeting}</span>". It was Ms.<span class="inputStyle">${animal}</span>. She had just come from <span class="inputStyle">${location2}</span>. She was <span class="inputStyle">${adj2}</span> and wanted some <span class="inputStyle">${noun}</span> too.
            
            Mr. Bear replied “${exclamation}” and they ${verb3} and ate together.`;

            document.querySelector('#adj1').value='';
            document.querySelector('#weather').value='';
            document.querySelector('#color').value='';
            document.querySelector('#verb1').value='';
            document.querySelector('#location1').value='';
            document.querySelector('#verb2').value='';
            document.querySelector('#noun').value='';
            document.querySelector('#number').value='';
            document.querySelector('#exclamation').value='';
            document.querySelector('#animal').value='';
            document.querySelector('#location2').value='';
            document.querySelector('#adj2').value='';
            document.querySelector('#greeting').value='';
            document.querySelector('#verb3').value='';

            // Changing toast
        let toastImg = document.querySelector("#overlayContent div img");

        if (color == "red") {
            toastImg.setAttribute("src", "images/red.png");
        } else if (color == "blue") {
            toastImg.setAttribute("src", "images/blue.png");
        } else if (color == "green") {
            toastImg.setAttribute("src", "images/green.png");
        } else if (color == "yellow") {
            toastImg.setAttribute("src", "images/yellow.png");
        } else {
            toastImg.setAttribute("src", "images/bread.png");
        }

        }

        errorMessage.innerHTML = myText;
        overlayContent.innerHTML = storyTitle;
        overlayContent.innerHTML = storyText;
    });

    const body = document.querySelector('body');
    if (document.querySelector('#overlay').className == "showing") {
        document.querySelector('body').className = "noScroll";
    } else if (document.querySelector('#overlay').className == "hidden") {
        body.classList.remove('noScroll');
    }

    // Close Button 
    document.querySelector('#closebtn').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#overlay').className = "hidden";
    });
})();