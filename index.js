const fs = require("fs");
const path = require("path");

const employee = require("./employee.json");
const fileName = fs.readdirSync("./pictures");

let output = "";

const sbu = process.argv[2];
if (!sbu) {
  console.log("Please input the SBU...");
  return;
}

// Sort array by Letterfirst then number

const letterFirst = fileName.sort((a, b) => {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
});

// Auto Rename based on Firstname and Lastname first then SSS#

letterFirst.map((data) => {
  employee.map(({ firstname, lastname, department, sss }) => {
    const newFileName = `${firstname} ${lastname}_${sbu}(${department})${path.extname(
      data
    )}`;
    if (fs.existsSync(`./pictures/${newFileName}`)) {
      console.log(`Already rename: ${newFileName}`);
      return;
    } else if (
      data.toLowerCase().indexOf(firstname.toLowerCase()) >= 0 &&
      data.toLowerCase().indexOf(lastname.toLowerCase()) >= 0
    ) {
      if (fs.existsSync(`./pictures/${data}`)) {
        fs.renameSync(`./pictures/${data}`, `./pictures/${newFileName}`);
        console.log(`Based on Fullname: ${newFileName}`);
        output += `Based on Fullname: ${data} -> ${firstname} ${lastname} \n`;
      }
    } else if (data.indexOf(sss) >= 0) {
      if (fs.existsSync(`./pictures/${data}`)) {
        fs.renameSync(`./pictures/${data}`, `./pictures/${newFileName}`);
        console.log(`Based on SSS#: ${newFileName}`);
        output += `Based on SSS#: ${data} -> ${firstname} ${lastname} \n`;
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
