const fs = require("fs");
const path = require("path");

const employee = require("./employee.json");
const fileName = fs.readdirSync("./pictures");
let sbu = process.argv[2];
if (!sbu) {
  console.log("Input SBU");
  return false;
}

// Auto Rename based on Firstname and Lastname first then SSS#

fileName.map((data) => {
  employee.map(({ firstname, lastname, department, sss }) => {
    let newFileName = `${firstname} ${lastname}_${sbu}(${department})`;
    if (data.toLowerCase().indexOf(newFileName.toLowerCase()) >= 0) {
      console.log("Already renamed");
      return false;
    } else if (
      data.toLowerCase().indexOf(firstname.toLowerCase()) >= 0 &&
      data.toLowerCase().indexOf(lastname.toLowerCase()) >= 0
    ) {
      if (fs.existsSync(`./pictures/${data}`)) {
        fs.renameSync(`./pictures/${data}`, `./pictures/${newFileName}.txt`);
        console.log(newFileName);
      }
      return false;
    } else if (data.indexOf(sss) >= 0) {
      if (fs.existsSync(`./pictures/${data}`)) {
        fs.renameSync(`./pictures/${data}`, `./pictures/${newFileName}.txt`);
        console.log(newFileName);
      }
      return false;
    }
  });
});

// Generate random file with 10 digits random filename

// for (let i = 0; i < 100; i++) {
//   const randomNumber = Math.floor(Math.random() * 10000000000);
//   fs.writeFile(
//     `./pictures/${randomNumber}.txt`,
//     randomNumber.toString(),
//     (err) => {
//       if (err) throw err;
//     }
//   );
// }
