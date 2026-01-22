const { opilased, vanused } = require("./students");

const fs = require("fs");
const path = require("path");

console.log("Õpilased:", opilased);
console.log("Vanused:", vanused);

const tekstFail = path.join(__dirname, "assets", "tekst.txt");

fs.readFile(tekstFail, "utf-8", (err, data) => {
    if (err) {
        console.error("Viga faili lugemisel:", err);
        return;
    }

    console.log("\nFaili sisu:");
    console.log(data);

    fs.appendFile(tekstFail, "\nLisatud Node.js-ist", err => {
        if (err) {
            console.error("Viga faili kirjutamisel:", err);
            return;
        }
        console.log("\nTekst lisatud faili");
    });
});
