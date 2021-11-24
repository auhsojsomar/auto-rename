import fs from "fs";
import path from "path";
import csv2json from "csvjson-csv2json";

const input = process.argv[2];

// Convert csv to json

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

    // Check if ./pictures and ./done is exist

    if (!fs.existsSync("./pictures")) {
      fs.mkdirSync("./pictures");
    }
    if (!fs.existsSync("./pictures/done")) {
      fs.mkdirSync("./pictures/done");
    }

    const employee = JSON.parse(fs.readFileSync("./employee.json"));
    const fileName = fs.readdirSync("./pictures");

    let output = "";

    // Sort array by Letterfirst then number

    const letterFirst = fileName.sort((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });

    // Auto Rename based on Firstname and Lastname first then SSS#

    letterFirst.map((data) => {
      employee.map(({ firstname, lastname, sss }) => {
        const newFileName = `${lastname
          .toLowerCase()
          .replace(/ /g, "_")}_${firstname
          .toLowerCase()
          .replace(/ /g, "_")}${path.extname(data)}`;
        if (fs.existsSync(`./pictures/done/${newFileName}`)) {
          return;
        } else if (
          data.toLowerCase().indexOf(firstname.toLowerCase()) >= 0 &&
          data.toLowerCase().indexOf(lastname.toLowerCase()) >= 0
        ) {
          if (fs.existsSync(`./pictures/${data}`)) {
            fs.renameSync(
              `./pictures/${data}`,
              `./pictures/done/${newFileName}`
            );
            console.log(`Based on Fullname: ${newFileName}`);
            output += `${data} -> ${newFileName} \n`;
          }
        } else if (sss) {
          if (data.indexOf(sss) >= 0) {
            if (fs.existsSync(`./pictures/${data}`)) {
              fs.renameSync(
                `./pictures/${data}`,
                `./pictures/done/${newFileName}`
              );
              console.log(`Based on SSS#: ${newFileName}`);
              output += `${data} -> ${newFileName} \n`;
            }
          }
        }
      });
    });

    // Output to textfile

    const now = new Date();
    now.setUTCHours(now.getHours());
    const logFile =
      now.toISOString().replace(/\..+/, "").replace(/:/g, "-") + ".txt";

    if (output) {
      if (!fs.existsSync("./logs")) {
        fs.mkdirSync("./logs");
      }
      fs.writeFileSync(path.join("logs", logFile), output);
    }
  }
}
