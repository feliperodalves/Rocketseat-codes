const express = require("express");

const server = express();

const projects = [
  {
    id: "1",
    title: "Teste 1",
    tasks: []
  },
  {
    id: "2",
    title: "Teste 2",
    tasks: []
  },
  {
    id: "3",
    title: "Teste 3",
    tasks: []
  }
];
let nRequisitions = 0;

server.use(express.json());

/**Middleware global*/
server.use((req, res, next) => {
  nRequisitions = nRequisitions + 1;

  console.log(`${nRequisitions} realizadas.`);
  next();
});

/**Middleware local */
function checkProject(req, res, next) {
  if (!req.params.id || projects.findIndex(p => p.id === req.params.id) < 0) {
    return res.status(400).json({ error: "project ID is required" });
  }
  return next();
}

/** Parametros da url
 * QUERY = ?xxxx=yyyy
 * ROUTE = /xxxx/yyyy
 * REQUEST = {"xxxx": "yyyy"}
 */

/**Criar Projeto */
server.post("/projects", (req, res) => {
  const project = req.body;
  project.tasks = [];
  projects.push(project);

  return res.json(projects);
});

/**Listar Projetos */
server.get("/projects", (req, res) => {
  return res.json(projects);
});

/**Alterar Projeto */
server.put("/projects/:id", checkProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map(p => (p.id === id ? (p.title = title) : p.title));

  return res.json(projects);
});

/**Deletar Projeto */
server.delete("/projects/:id", checkProject, (req, res) => {
  const { id } = req.params;
  let index = projects.findIndex(p => p.id === id);

  projects.splice(index, 1);

  return res.json(projects);
});

/**Criar Tarefa */
server.post("/projects/:id/tasks", checkProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map(p => (p.id === id ? p.tasks.push(title) : p));

  return res.json({ message: "Hello World" });
});

server.listen(3000);
