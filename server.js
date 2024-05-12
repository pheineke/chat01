const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { stringify } = require('querystring');

const app = express();
const port = 8000;

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

app.get('/update/:count', (req, res) => {
    const count = parseInt(req.params.count);
    
    // Überprüfe, ob count eine gültige Zahl ist
    if (isNaN(count)) {
        return res.status(400).json({ error: 'Ungültige Anzahl von Nachrichten' });
    }
    messages
    try {
        // Lese die Chat-Historie aus der Datei
        const data = fs.readFileSync("chat.json", 'utf8');
        const texts = JSON.parse(data);

        let lastMessages;
        if (count <= 0) {
            // Wenn count <= 0 ist, gib den gesamten Chatverlauf zurück
            lastMessages = texts;
        } else {
            // Andernfalls gib die letzten 'count' Nachrichten zurück
            lastMessages = texts.slice(-count);
        }

        res.json({ lastMessages });
    } catch (error) {
        console.error("Fehler beim Laden der Chat-Historie:", error);
        res.status(500).json({ error: 'Fehler beim Laden der Chat-Historie' });
    }
});

app.post('/auth', (req, res) => {
    fs.readFile("users.json", 'utf8', (err, data) => {
        if (err) {
            console.log("Error beim Laden von users.json:", err);
            res.json({ success: false });
            return;
        }
        try {
            const users = JSON.parse(data);
            const login = req.body.credentials;
            
            // Rufe die Funktion mit einer Callback-Funktion auf
            checkIfUserInDb(users, login, (found) => {
                console.log(found);
                res.json({ success: found });
            });
        } catch (parseError) {
            console.log("Fehler beim Parsen von users.json:", parseError);
            res.json({ success: false });
        }
    });
});

// Die Funktion, die die Überprüfung auf Benutzer in der Datenbank durchführt und eine Callback-Funktion aufruft
function checkIfUserInDb(users, cred, callback) {
    for (const user of users) {
        if (JSON.stringify(user) === JSON.stringify(cred)) {
            callback(true);
            return;
        }
    }
    callback(false);
}


app.listen(port, () => {
    console.log(`Server läuft auf http://192.168.8.167:${port}`);
});

function generateRandomId() {
    var min = Math.pow(10, 9); // die kleinste 10-stellige Zahl
    var max = Math.pow(10, 10) - 1; // die größte 10-stellige Zahl
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
