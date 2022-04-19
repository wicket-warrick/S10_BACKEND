const writeJson = async (path, content) => {
  await fs.writeFile(path, JSON.stringify(content));
};

const planner = async (path, content) => {
  try {
    // si tengo que imprimir: imprimo y no hago los pasos siguientes

    // creo el objeto con los datos que llegan por params

    // hago push del objeto en timeLine

    // writeFile(JSON.stringify(timeLine))

    const data = await fs.readFile(path, "utf-8");
    const dataParse = JSON.parse(data);
    dataParse.push(newTask);
    writeJson(path, dataParse);
    console.log(dataParse);
  } catch (err) {
    console.error(`erro gardando o JSON`, err.message);
    //const listaTarefas = [];
    //listaTarefas.push(newTask);
    //console.log(listaTarefas);
    //writeJson(path, listaTarefas);
  }
};
