import fs from "fs";
import csv2json from "csvjson-csv2json";
import csvMerger from "csv-merger";
const employee = [];

const test = csvMerger.merge(["./csv/BK.csv", "./csv/CK.csv"]).then((data) => {
  fs.appendFileSync("test.txt", data);
});

console.log(test);

// const csv = fs.readdirSync("./csv");
// csv.map((data) => {
//   const result = fs.readFileSync(`./csv/${data}`, { encoding: "utf-8" });
//   const json = csv2json(result, { parseNumbers: true });
//   employee.push(json);
// });

// fs.writeFileSync("employee.json", JSON.stringify(employee));
