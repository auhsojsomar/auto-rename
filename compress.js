import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

const compress = async () => {
  console.log("Processing...");
  await imagemin(["pictures/*.{jpg,jpeg,png,JPG,JPEG,PNG}"], {
    destination: "pictures/min",
    plugins: [
      imageminMozjpeg({ quality: 50 }),
      imageminPngquant({ quality: [0.4, 0.6] }),
    ],
  });
  console.log("Done Compressing image");
};
compress();
