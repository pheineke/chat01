var last_msg_id = 0;
var port = 8000;
var ip = "192.168.8.167"


function sendData() {
    var textInput = document.getElementById("textInput").value;
    var outputDiv = document.getElementById("styleChat");
    var currentDate = new Date().toLocaleString(undefined, {
        day:    'numeric',
        month:  'numeric',
        year:   'numeric',
        hour:   '2-digit',
        minute: '2-digit',
    });
    var data = {'time':currentDate,
                'id': 100,
                'author': 'dev',
                'content': textInput}
    

    // AJAX request to send data to server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `http://${ip}:${port}/new`, true); // Hier wird die IP-Adresse und der Port des Servers angegeben
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Server response
            var response = JSON.parse(xhr.responseText);
            let content = response.text['content']
            
            outputDiv.innerHTML += "<div id=\"message\">" + currentDate + " " + " " + content + "</div>";
        }
    };
    xhr.send(JSON.stringify({ text: data }));
    var elem = document.getElementById('styleChat');
    elem.scrollTop = elem.scrollHeight;
}

function history() {
    var outputDiv = document.getElementById("output");

    // AJAX request to fetch data from server
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://${ip}:${port}/history`, true); // Hier wird die IP-Adresse und der Port des Servers angegeben
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Server response
            var response = JSON.parse(xhr.responseText);
            response.texts.forEach(function(text) {
                let time = text[0];
                let content = text[1];
                outputDiv.innerHTML += "<p>" + time +" " +" "+ content + "</p>";
            });
        }
    };
    xhr.send();
}


var last_msg_id = 0; // Globale Variable, um die letzte Nachrichten-ID zu speichern

function update() {
    var outputDiv = document.getElementById("output");

    // AJAX request to fetch new data from server
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://${ip}:${port}/update/` + last_msg_id, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var newMessages = response.newMessages;
            
            newMessages.forEach(function(message) {
                let time = message.time;
                let content = message.content;
                outputDiv.innerHTML += "<p>" + time + " " + content + "</p>";
                
                // Update last_msg_id with the latest message ID
                last_msg_id = Math.max(last_msg_id, message.id);
            });
        }
    };
    xhr.send();
}

// Füge diesen Aufruf hinzu, um sicherzustellen, dass die Box auch dann nach unten scrollt, wenn neuer Text hinzugefügt wird
// Hier wird angenommen, dass du diese Funktion aufrufst, wenn neuer Text hinzugefügt wird
window.setInterval(function() {
    update();
  }, 5000);
  
  