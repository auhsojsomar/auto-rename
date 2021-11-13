const fs = require("fs");
const path = require("path");

// Check if ./pictures and ./done is exist

if (!fs.existsSync("./pictures")) {
  fs.mkdirSync("./pictures");
}
if (!fs.existsSync("./pictures/done")) {
  fs.mkdirSync("./pictures/done");
}

const employee = require("./employee.json");
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
        fs.renameSync(`./pictures/${data}`, `./pictures/done/${newFileName}`);
        console.log(`Based on Fullname: ${newFileName}`);
        output += `${data} -> ${newFileName} \n`;
      }
    } else if (sss) {
      if (data.indexOf(sss) >= 0) {
        if (fs.existsSync(`./pictures/${data}`)) {
          fs.renameSync(`./pictures/${data}`, `./pictures/done/${newFileName}`);
          console.log(`Based on SSS#: ${newFileName}`);
          output += `${data} -> ${newFileName} \n`;
        }
      }
    }
  });
});

// Output to textfile

if (output) {
  fs.appendFileSync(
    "./log.txt",
    `${new Date().toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    })}\n${output}`
  );
}
