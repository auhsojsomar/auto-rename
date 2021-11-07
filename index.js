const fs = require("fs");
const path = require("path");

const employee = require("./employee.json");
const fileName = fs.readdirSync("./pictures");

const sbu = process.argv[2];
if (!sbu) {
  console.log("Input SBU");
  return;
}

// Sort array by Letterfirst then number

let letterFirst = fileName.sort((a, b) => {
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
      return;
    } else if (
      data.toLowerCase().indexOf(firstname.toLowerCase()) >= 0 &&
      data.toLowerCase().indexOf(lastname.toLowerCase()) >= 0
    ) {
      if (fs.existsSync(`./pictures/${data}`)) {
        fs.renameSync(`./pictures/${data}`, `./pictures/${newFileName}`);
        console.log(`Based on Fullname: ${newFileName}`);
      }
    } else if (data.indexOf(sss) >= 0) {
      if (fs.existsSync(`./pictures/${data}`)) {
        fs.renameSync(`./pictures/${data}`, `./pictures/${newFileName}`);
        console.log(`Based on SSS#: ${newFileName}`);
      }
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
