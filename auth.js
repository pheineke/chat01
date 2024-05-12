function authenticator() {
    let person = prompt("User", "Harry Potter");
    let pswd = prompt("Password", "1234");
    let data = {user: person, password: pswd};

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://10.10.10.167:3000/auth", true); // Hier wird die IP-Adresse und der Port des Servers angegeben
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.replace(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify({credentials: data}));

}

window.onload = function() {
    authenticator();    
};