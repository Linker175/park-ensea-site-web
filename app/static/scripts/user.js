var arceauStateNew;
var arceau_id = 1;
var arceauAction = 0;
var lock = 0;
var timer = 0;


/*** UPDATE THE BUTTON STATE ***/
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
  updateTab();
}

function updateTab(){
    document.getElementById("arceauState").innerHTML = arceauState;
    document.getElementById("arceauAction").innerHTML = arceauAction;
    document.getElementById("arceauBattery").innerHTML = arceauBattery+"%";
}

/*** REACT ON THE CLICK OF THE BUTTON ***/
function buttonClick() {
    var arceauButton = document.getElementById("arceauButton");
    if (arceauButton.disabled) {
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
    buttonUpdate();
    updateTab();
    sendDataToDB(arceauAction);
    lock=1;
    clearInterval();
    setTimeout(function() {
        arceauAction=0;
          sendDataToDB(arceauAction);
        lock=0;
        buttonUpdate();
        updateTab();
        updateState();
        setInterval(updateState, 1000);
    }, timer);
}

/*** SEND DATA TO UPDATE_DB ***/
function sendDataToDB(arceauActiontoDB){
    fetch('/update_state/' + arceau_id, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: arceauActiontoDB.toString()})
    })

/*** print response from update_db ***/ 
.then(response => response.json())
.then(data => {
        console.log(data.message);
})
.catch(error => {
        console.error(error);
});
}

/*** FONCTIONS TEST POUR REINITIALISER State ***/
/**

function buttonClick2() {
    arceauState=2;
    buttonUpdate();
}

function buttonClick3() {
    arceauState=1;
    buttonUpdate();
}

**/

/*** Viens chercher l'état de state selon l'ESP32 ***/
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
            buttonUpdates();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

}

setInterval(updateState, 1000);

