    function bandChoice(){
        let v5 = document.getElementById("bandanswer");
        let dc = document.getElementById("musband_");
        let beatles = document.getElementById("musband1");
        let metall = document.getElementById("musband2");
        let oasis = document.getElementById("musband3");

        let valik = "";
        if(dc.checked){
            valik+=dc.value + ", ";
        }
        if(beatles.checked){
            valik+=beatles.value + ", ";
        }
        if (metall.checked) {
            valik += metall.value + ", ";
        }
        if (oasis.checked) {
            valik += oasis.value + ", ";
        }

        v5.innerHTML = "Sa valisid: " + valik;
    }
    function interviewText(){
        let answer  = document.getElementById("interviewanswer");
        let text = document.getElementById("interview");

        answer.innerHTML = "Sinu arvamus: " + text.value;
    }

    function numberAsk(){

        let number = document.getElementById("numberask");
        let answer = document.getElementById("numberanswer");

        answer.innerHTML = "Sa kuulad muusikat " + number.value + " tundi päevas";
    }

    function radioAsk(){
        let answer = document.getElementById("radioanswer");
        let choice1 = document.getElementById("radioask1");
        let choice2 = document.getElementById("radioask2");

        if (choice1.checked){
            answer.innerHTML = "Raadio kuulamine: " + choice1.value;
        }
        else if (choice2.checked){
            answer.innerHTML = "Raadio kuulamine: " + choice2.value;
        }
        else {
            answer.innerHTML = "Palun vastake küsimusele";
        }
    }
    function datalistAsk(){

        let ask = document.getElementById("radio-choice");
        let answer = document.getElementById("datalistanswer");

        answer.innerHTML = "Sinu nimetatud jaamad: " + ask.value
    }

    function genreAsk() {

        let answer = document.getElementById("genreanswer");
        let choice = document.getElementById("genres");

        answer.innerHTML = "Sinu vastus: " + choice.value
    }

    function ifSaada(){
        let summary = document.getElementById("summary");
        let dc = document.getElementById("musband_");
        let beatles = document.getElementById("musband1");
        let metall = document.getElementById("musband2");
        let oasis = document.getElementById("musband3");
        let text = document.getElementById("interview");
        let number = document.getElementById("numberask");
        let choice1 = document.getElementById("radioask1");
        let choice2 = document.getElementById("radioask2");
        let ask = document.getElementById("radio-choice");
        let choice = document.getElementById("genres");

        summary.innerHTML = "";

        let valik = "";
        if(dc.checked){
            valik+=dc.value + ", ";
        }
        if(beatles.checked){
            valik+=beatles.value + ", ";
        }
        if (metall.checked) {
            valik += metall.value + ", ";
        }
        if (oasis.checked) {
            valik += oasis.value + ", ";
        }

        summary.innerHTML += "Sa valisid: " + valik + "<br>";
        summary.innerHTML += "Sinu arvamus: " + text.value + "<br>";
        summary.innerHTML += "Sa kuulad muusikat " + number.value + " tundi päevas<br>";

        if (choice1.checked){
            summary.innerHTML += "Raadio kuulamine: " + choice1.value + "<br>";
        }
        else if (choice2.checked){
            summary.innerHTML += "Raadio kuulamine: " + choice2.value + "<br>";
        }
        else {
            summary.innerHTML += "Palun vastake küsimusele<br>";
        }
        summary.innerHTML += "Sinu nimetatud jaamad: " + ask.value + "<br>";
        summary.innerHTML += "Sinu vastus: " + choice.value + "<br>";
    }