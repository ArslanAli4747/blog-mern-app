const { log } = require("console");
const fs = require("fs");

const readImage = () => {
  return new Promise((resolve, reject) => {
    const read = fs.createReadStream("c.PNG");
    let imageData = Buffer.from([]);

    read.on("data", (chunk) => {
      imageData = Buffer.concat([imageData, chunk]);
    });

    read.on("end", () => {
      log("read done");
      resolve(imageData);
    });

    read.on("error", (error) => {
      reject(error);
    });
  });
};

const writeImage = (imageData) => {
  return new Promise((resolve, reject) => {
    const write = fs.createWriteStream("img.PNG");

    write.on("finish", () => {
      log("image written");
      resolve();
    });

    write.on("error", (error) => {
      reject(error);
    });

    write.write(imageData);
    write.end();
  });
};

const data = async () => {
  try {
    const imageData = await readImage();
    console.log("message");
    await writeImage(imageData);
  } catch (error) {
    log(error);
  }
};

data();
