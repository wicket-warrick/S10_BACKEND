const path = require("path");
const fs = require("fs").promises;
const chalk = require("chalk");

const writeJson = async (path, content) => {
  try {
    listaTarefas.push(newTask);
    await fs.writeFile(path, JSON.stringify(content));
    console.log(chalk.green.bgGreen("Arquivo actualizado correctamente"));
    console.log();
  } catch (err) {
    console.log(chalk.black.bgRed.bold("erro actualizando o arquivo"));
    console.error(chalk.red(err.message));
    process.exit(1);
  }
};

const createJson = async (path, content) => {
  try {
    let listaTarefas = [];
    await fs.writeFile(path, JSON.stringify(listaTarefas));
    console.log(chalk.black.bgGreen.bold("Arquivo creado correctamente"));
    console.log();
  } catch (err) {
    console.log(chalk.black.bgRed.bold("erro creando o arquivo"));
    console.error(chalk.red(err.message));
    process.exit(1);
  }
};

module.exports = { writeJson, createJson };
