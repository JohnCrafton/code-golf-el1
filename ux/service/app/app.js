'use strict'

import('node-fetch');

const port = 9001;

const express = require('express'),
    cors = require('cors');

const allowedOrigins = ['*'];

const cors_options = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true)
        console.info('cors_options::origin =\t[' + origin + ']')
        if (allowedOrigins.indexOf(origin) === -1) {
            let msg =
                'The CORS policy for this site does not allow access from the specified origin.'
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    }
}

const app = express();
app.use(cors(cors_options));

const DEFAULT_TRUCK_URL = 'https://data.sfgov.org/resource/rqzj-sfat.json';

let current_trucks = [];

app.get('/is/up', (req, res) => {
    res.type('text/plain')
    res.send('up')
})

const processTrucks = (trucks) => {
    let output = { trucks: [] }
    trucks.filter(truck => truck.status === "ISSUED").forEach(truck => {
        output.trucks.push({
            name: truck.applicant,
            location: truck.location,
            location_description: truck.locationdescription,
            hours: truck.dayshours,
            items: truck.fooditems
        })
    })
    return output;
}

app.get('/available', (req, res) => {
    res.json(current_trucks);
});

app.get('/raw', (req, res) => {
    const fs = require('fs');
    const raw = fs.readFileSync('trucks.json');
    res.json(JSON.parse(raw));
});

app.listen(port, function() {

    fetch(DEFAULT_TRUCK_URL)
        .then(response => response.json())
        .then(data => {
            // save the trucks to a local file, trucks.json
            const fs = require('fs');
            fs.writeFile('trucks.json', JSON.stringify(data), (err) => {
                if (err) { console.log(`ignored error: ${err}`)};
                console.log('saved');
            });

            current_trucks = processTrucks(data);
        })
        .then(() => {
            console.log('Truck API listening on port ' + port + '!')
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
});
