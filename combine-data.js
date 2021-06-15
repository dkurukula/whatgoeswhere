const fs = require('fs');
const path = require('path');
const LKSI = require('./wasteitems-LKSKI.json');
const SMH = require('./wasteitems-SMH.json');
const SJHC = require('./wasteitems-SJHC.json');
const PHC = require('./wasteitems-PHC.json');

const data = JSON.stringify({ ...LKSI, ...SMH, ...SJHC, ...PHC }, null, '  ');
const filepath = path.join(__dirname, 'src', 'data.json');

fs.writeFile(filepath, data, (err) => {
    if (err)
        return console.log(err);
    console.log("data.json saved");
})
