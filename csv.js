import fs from "fs";
import csv2json from "csvjson-csv2json";
const employee = [];

const csv = fs.readdirSync("./csv");
csv.map((data) => {
  const result = fs.readFileSync(`./csv/${data}`, { encoding: "utf-8" });
  const json = csv2json(result, { parseNumbers: true });
  employee.push(json);
});

fs.writeFileSync("employee.json", JSON.stringify(employee[0]));
