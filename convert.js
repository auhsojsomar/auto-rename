import Jimp from "jimp";
import fs from "fs";
import path from "path";

if (!fs.existsSync("./pictures")) {
  fs.mkdirSync("./pictures");
}

const picture = fs.readdirSync("./pictures");

picture
  .filter((filtered) => filtered != "converted")
  .map((data) => {
    Jimp.read(`./pictures/${data}`)
      .then((res) => {
        console.log(`Processing ${data}`);
        res
          .contain(500, 500)
          .quality(100)
          .write(`./pictures/converted/${path.parse(data).name}.jpg`);
      })
      .catch((err) => {
        console.log(err);
      });
  });
