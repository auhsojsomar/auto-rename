import fs from "fs";
import csv2json from "csvjson-csv2json";

const input = process.argv[2];

if (!input) {
  console.log("Please input the csv filename");
} else {
  if (!fs.existsSync(`./csv/${input.toUpperCase()}.csv`)) {
    console.log("Please check the filename");
  } else {
    const result = fs.readFileSync(`./csv/${input.toUpperCase()}.csv`, {
      encoding: "utf-8",
    });
    const json = csv2json(result, { parseNumbers: true });
    fs.writeFileSync("employee.json", JSON.stringify(json));
  }
}
