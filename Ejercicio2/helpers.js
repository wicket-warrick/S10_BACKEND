const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");

async function pathExists(path) {
  try {
    await fs.access(path);
  } catch {
    throw new Error(` a ruta ${path} non existe`);
  }
}

async function fileExists(path) {
  try {
    await fs.access(path);
    console.log(
      chalk.black.bgGreen.bold(
        `Imaxe creada con exito. O resultado podelos atopar en  ${outputPath}`
      )
    );
  } catch {
    throw new Error(`O arquivo de saida xa existe no directorio actual`);
  }
}

const formatAccept = (pathfile) => {
  const validExtensions = [".jpg", ".jpeg", ".gif", ".png", ".webp"];
  if (!validExtensions.includes(path.extname(pathfile).toLowerCase())) {
    throw new Error(chalk.red("Formato non válido."));
    // validExtensions.forEach((format) => {
    //   console.log(chalk.yellow(format));
    // });
    process.exit(1);
  }
};

async function createOuputPath(path) {
  try {
    await fs.access(path);
    console.log(chalk.black.bgWhite.bold(`O directorio de saida xa existe`));
    console.log();
  } catch {
    await fs.mkdir(path);
    console.log(chalk.black.bgWhite.bold(`Novo directorio creado en ${path}`));
    console.log();
  }
}

async function fileName(image, fileName, outputPath, size, filter) {
  if (size && !filter) {
    await image.toFile(path.resolve(outputPath, `${fileName}_${size}`));
  }
  if (size && filter) {
    await image.toFile(
      path.resolve(outputPath, `${fileName}_${size}_${filter}`)
    );
  }
  if (!size && filter) {
    await image.toFile(path.resolve(outputPath, `${fileName}_${filter}`));
  }
}

const sharpImage = (filter, image) => {
  if (filter === "b-w") {
    image.toColourspace("b-w");
  } else if (filter === "cmyk") {
    image.toColourspace("cmyk");
  } else if (filter === "negative") {
    image.negate();
  } else if (filter !== "b-w" || "cmyk" || "negative") {
    throw new Error("Filtro non soportado");
  }
};

module.exports = {
  pathExists,
  formatAccept,
  createOuputPath,
  fileName,
  sharpImage,
};
