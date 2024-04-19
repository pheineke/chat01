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
    xhr.open("POST", "http://localhost:3000/new", true); // Hier wird die IP-Adresse und der Port des Servers angegeben
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
    xhr.open("GET", "http://localhost:3000/history", true); // Hier wird die IP-Adresse und der Port des Servers angegeben
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

function update() {
    var outputDiv = document.getElementById("output");

    // AJAX request to fetch data from server
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/update", true); // Hier wird die IP-Adresse und der Port des Servers angegeben
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

function authenticator() {
    let person = prompt("User", "Harry Potter");
    let pswd = prompt("Password", "1234");
    let data = {user: person, password: pswd};

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/auth", true); // Hier wird die IP-Adresse und der Port des Servers angegeben
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
           console.log(xhr.responseText)
        }
    };
    xhr.send(JSON.stringify({credentials: data}));

}

window.onload = function() {
    authenticator();    
};


// Füge diesen Aufruf hinzu, um sicherzustellen, dass die Box auch dann nach unten scrollt, wenn neuer Text hinzugefügt wird
// Hier wird angenommen, dass du diese Funktion aufrufst, wenn neuer Text hinzugefügt wird
window.setInterval(function() {
    update();
  }, 5000);
  
  