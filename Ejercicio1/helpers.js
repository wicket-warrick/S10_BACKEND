const path = require("path");
const fs = require("fs").promises;
const chalk = require("chalk");

const writeJson = async (path, content, array) => {
  try {
    array.push(content);
    await fs.writeFile(path, JSON.stringify(array));
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
    listaTarefas.push(content);

    await fs.writeFile(path, JSON.stringify(listaTarefas));
    console.log(chalk.black.bgGreen.bold("Arquivo creado correctamente"));
    console.log();
  } catch (err) {
    console.log(chalk.black.bgRed.bold("erro creando o arquivo"));
    console.error(chalk.red(err.message));
    process.exit(1);
  }
};

const createTask = (content) => {
  try {
    return content._.reduce((a, b) => `${a} ${b}`);
  } catch (error) {
    console.log(
      chalk.black.bgRed.bold("Debes introducir unha tarefa a realizar")
    );

    process.exit(1);
  }
};

const print = async (path) => {
  let data;
  let listaTarefas;
  try {
    data = await fs.readFile(path, "utf-8");
    listaTarefas = JSON.parse(data);
    console.log(listaTarefas);
  } catch (error) {
    console.log(
      chalk.black.bgRed.bold("Erro na lectura do arquivo.Tenteo de novo")
    );

    process.exit(1);
  }
};

const planner = async (path, content, file) => {
  let data;
  let listaTarefas;
  try {
    data = await fs.readFile(path, "utf-8");
    listaTarefas = JSON.parse(data);
    console.log(chalk.black.bgBlue.bold(`O arquivo ${file} xa existe.`));
    console.log();
    writeJson(path, content, listaTarefas);
  } catch {
    console.log(
      chalk.black.bgBlue.bold(`O arquivo ${file} non existe. Crearemolo por ti`)
    );
    console.log();
    await createJson(path, content);
  }
};

module.exports = { createTask, print, planner };
