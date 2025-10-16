require("dotenv").config();
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName) {
  try {
    const result = await imagekit.upload({
      file: fileBuffer.toString("base64"), // convert Buffer → base64
      fileName: fileName,
    });
    return result;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
}

module.exports = { uploadFile };
