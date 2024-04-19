const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { stringify } = require('querystring');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // CORS aktivieren


let texts = [];

app.post('/new', (req, res) => {
    const text = req.body.text;
    text['id'] = generateRandomId();

    console.log(text)
    texts.push(text);
    res.json({ status: 'success', text: text });
    
    fs.writeFile("chat.json", JSON.stringify(texts), 'utf8', (err) => {
        if (err) {
            console.error('Fehler beim Schreiben der Datei:', err);
            return;
        }
        console.log('Array erfolgreich in die Datei gespeichert.');
    }); 
});

app.get('/history', (req, res) => {
    fs.readFile("chat.json", 'utf8', (err, data) => {
        if (err) {
            // Bei einem Fehler, rufe die Callback-Funktion mit dem Fehler auf
            console.log("Error beim Laden von besucherlog.json 0")
            return;
        }
        try {
            // Parst den Inhalt der Datei als JSON
            texts = JSON.parse(data);
            // Rufe die Callback-Funktion mit dem geparsten Array auf
            return;
        } catch (parseError) {
            // Bei einem Fehler beim Parsen, rufe die Callback-Funktion mit dem Parsierungsfehler auf
            return;
        }
    });

    res.json({ texts: texts });
});

app.post('/auth', (req, res) => {
    fs.readFile("users.json", 'utf8', (err, data) => {
        if (err) {
            // Bei einem Fehler, rufe die Callback-Funktion mit dem Fehler auf
            console.log("Error beim Laden von besucherlog.json 0")
            return;
        }
        try {
            // Parst den Inhalt der Datei als JSON
            texts = JSON.parse(data);
            // Rufe die Callback-Funktion mit dem geparsten Array auf
            return;
        } catch (parseError) {
            // Bei einem Fehler beim Parsen, rufe die Callback-Funktion mit dem Parsierungsfehler auf
            console.log(parseError)
            return;
        }
    });

    const login = req.body.credentials;
    let x = checkIfUserInDb(login)
    console.log(JSON.stringify(x));
    res.json({ success: "test"});

    
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

function generateRandomId() {
    var min = Math.pow(10, 9); // die kleinste 10-stellige Zahl
    var max = Math.pow(10, 10) - 1; // die größte 10-stellige Zahl
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkIfUserInDb(cred) {
    // Lese die JSON-Datei ein
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Datei:', err);
            return;
        }

        try {
    
            // Parse die JSON-Daten
            const jsonContent = JSON.parse(data);
            console.log(jsonContent);
            for (let elem in jsonContent) {
                console.log(typeof(JSON.stringify(jsonContent[elem]) === JSON.stringify(cred)))
                if (JSON.stringify(jsonContent[elem]) === JSON.stringify(cred)) {
                    return true;
                }
                
            }
            return false;
        } catch (err) {
            console.error('Fehler beim Parsen der JSON-Daten:', err);
        }
    });
}