const path = require("path");
const fs = require("fs").promises;
const minimist = require("minimist");
const chalk = require("chalk");
const fileName = "listaTarefas.json";
const { writeJson, createJson } = require("./helpers");

const pathFile = path.join(__dirname, fileName);

const argsTask = minimist(process.argv.slice(2));
const { d, m, y } = argsTask;
// const task = argsTask._.reduce((a, b) => `${a} ${b}`);
const newTask = {
  dia: d,
  mes: m,
  ano: y,
  // tarefa: task,
};

console.log(chalk.black.bgYellow.bold("benvido ó teu organizador"));
console.log();

const planner = async (path, content) => {
  let data;
  let listaTarefas;
  try {
    data = await fs.readFile(path, "utf-8");
    listaTarefas = JSON.parse(data);
    console.log(chalk.black.bgBlue.bold(`O arquivo ${fileName} xa existe.`));
  } catch {
    console.log(
      chalk.black.bgBlue.bold(
        `O arquivo ${fileName} non existe. Crearemolo por ti`
      )
    );
    console.log();
    await createJson(path, content);
  }
};

planner(pathFile, newTask);
