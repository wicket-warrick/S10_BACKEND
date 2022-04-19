const minimist = require("minimist");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

const {
  pathExists,
  formatAccept,
  createOuputPath,
  fileName,
  sharpImage,
} = require("./helpers");

const args = minimist(process.argv.slice(2));
const { image, size, filter } = args;

console.log();
console.log(chalk.black.bgYellow.bold(`Benvido ó samplesPhoto.hab 2022`));
console.log();

async function samplesImages({ image, size, filter }) {
  try {
    const imagePath = path.resolve(__dirname, image);
    const extensionFile = path.extname(imagePath);
    const imageDirectory = path.dirname(imagePath);
    const imageFile = path.basename(imagePath, extensionFile);
    const outputPath = path.resolve(imageDirectory, `samples_${imageFile}`);

    formatAccept(imagePath);
    await pathExists(imagePath);
    await createOuputPath(outputPath);

    const imageSharp = sharp(imagePath);
    if (size) {
      imageSharp.resize(size);
    }
    sharpImage(filter, imageSharp);
    console.log(chalk.black.bgBlue.bold(`Procesando imaxen:`));
    console.log();
    await fileName(imageSharp, imageFile, outputPath, size, filter);

    console.log(
      chalk.black.bgGreen.bold(
        `Imaxe creada con exito. O resultado podelos atopar en  ${outputPath}`
      )
    );
  } catch (error) {
    console.error(chalk.red(error.message));
    console.error(
      chalk.red("Comprobar que todolos argumentos sexan correctos")
    );
  }
}

if (!image) {
  console.error(chalk.red("É preciso que introduzas un a ruta dunha imaxe"));
  process.exit(1);
}
if (!size && !filter) {
  console.error(chalk.red("É preciso que introduzas unha edición a realizar"));
  process.exit(1);
}

samplesImages({ image, size, filter });
