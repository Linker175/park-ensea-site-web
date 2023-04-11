var arceau_id = 1;
var arceauAction = 0;
var lock = 0;
var timer = 0;

/*** Generate HTML code to print the table (in function of the number of arceau) ***/
function update_tab(){
    var tableHTML = "<table id='table'><tr id='titre'><th>Arceau ID</th><th>Battery</th><th>Action</th><th>État</th><th>Lever/Descendre</th></tr>";
    for (var i = 0; i < arceauState.length; i++) {
    tableHTML += "<tr>";
    tableHTML += "<td >" + arceauId[i] + "</td>";
    tableHTML += "<td id='arceauBattery'>" + arceauBattery[i] + "</td>";
    tableHTML += "<td id='arceauAction'>" + 0 + "</td>";
    tableHTML += "<td id='arceauState'>" + arceauState[i] + "</td>";
    tableHTML += "<td>" + "<button id='arceauButton' onclick='buttonClick();'>-</button>" + "</td>";
    tableHTML += "</tr>";
    }

    tableHTML += "</table>";

    document.getElementById("section-arceau-tableau").innerHTML = tableHTML;
}

/*** update text of the button and call table text update ***/
function buttonUpdate() {
    var button = document.getElementById('arceauButton');
    if (arceauState == 0) {
        button.innerHTML = "En attente";
        button.disabled = true;
    }
    else if (arceauState == 1) {
        button.innerHTML = "Descendre l'arceau";
        button.disabled = false;
    }
    else if (arceauState == 2) {
        button.innerHTML = "Lever l'arceau";
        button.disabled = false;
    }
    document.getElementById("arceauState").innerHTML = arceauState;
    document.getElementById("arceauAction").innerHTML = arceauAction;
    document.getElementById("arceauBattery").innerHTML = arceauBattery+"%";
}

/*** react on the click of the button ***/
function buttonClick() {
    clearInterval(); //stop the process that update arceauState from db every seconds 
    var arceauButton = document.getElementById("arceauButton");
    if (arceauButton.disabled) { //update button text
        button.innerHTML = "En attente";
        button.disabled = true;
    } 
    else if(arceauButton.innerHTML == "Descendre l'arceau"){
        arceauState=0;
        arceauAction=2;
        timer=7500;
    }
    else if(arceauButton.innerHTML == "Lever l'arceau") {
        arceauState=0;
        arceauAction=1;
        timer=13000;
    }
    buttonUpdate(); // update state of the buttons and tab informations
    sendDataToDB(arceauAction);
    lock=1;
    setTimeout(function() {
        arceauAction=0;
        sendDataToDB(arceauAction); //update the command of the arceau on the db
        lock=0;
        buttonUpdate(); //update again state of the buttons  and tab informations
        updateState();  //update arceauState from db
        setInterval(updateState, 1000); //relaunch process that update arceauState from db every second
    }, timer);
}


/*** send data to update the DB ***/
function sendDataToDB(arceauActiontoDB){
    fetch('/update_state/' + arceau_id, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: arceauActiontoDB.toString()})
    })
.then(response => response.json()) //print response 
.then(data => {
        console.log(data.message);
})
.catch(error => {
        console.error(error);
});
}


/*** come get state of the arceau on DB ***/
function updateState(){
    if(lock==0){
        fetch('/get_state/' + arceau_id, { 
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            arceauState = data.state;
            arceauBattery = data.battery;
            buttonUpdate();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

}

setInterval(updateState, 1000); //launch a process that update arceauState every seconds

