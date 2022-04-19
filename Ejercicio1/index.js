const path = require("path");
const fs = require("fs").promises;
const minimist = require("minimist");
const chalk = require("chalk");
const fileName = "listaTarefas.json";
const { createTask, print, planner } = require("./helpers.js");

const pathFile = path.join(__dirname, fileName);
const argsTask = minimist(process.argv.slice(2));
const { d, m, y, p } = argsTask;

console.log(chalk.black.bgYellow.bold("benvido ó teu organizador"));
console.log();
if (p) {
  print(pathFile);
} else if (!d || !m || !y) {
  console.log(chalk.black.bgRed.bold("Debes introducir a data completa"));
} else if (d && m && y) {
  if (typeof d !== "number" || typeof m !== "number" || typeof y !== "number") {
    console.log(
      chalk.black.bgRed.bold("Os valores para día,mes e ano, deben ser numeros")
    );
  } else {
    const task = createTask(argsTask);
    const newTask = {
      dia: d,
      mes: m,
      ano: y,
      tarefa: task,
    };

    planner(pathFile, newTask, fileName);
  }
}
