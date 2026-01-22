const fs = require("fs");
const path = require("path");

const { nimed, rollid } = require("./data");

console.log("Nimed:", nimed);
console.log("Rollid:", rollid);

const failiTee = path.join(__dirname, "assets", "tekst.txt");

const sisu = rollid.join("\n");

fs.writeFile(failiTee, sisu, err => {
    if (err) {
        console.error("Viga faili kirjutamisel:", err.message);
        return;
    }

    console.log("\nFaili kirjutamine õnnestus");

    fs.readFile(failiTee, "utf-8", (err, data) => {
        if (err) {
            console.error("Viga faili lugemisel:", err.message);
            return;
        }

        console.log("\nFaili sisu:");
        console.log(data);
    });
});
