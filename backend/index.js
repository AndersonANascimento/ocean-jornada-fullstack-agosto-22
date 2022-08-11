const express = require('express')
const app = express()

// Sinalizando ao Express o uso de JSON no body de requests
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send("Olá, mundo!")
})

// Criação de lista com pontuações pré-definidas
const lista = [
  {
    id: 1,
    nome: "Paulo",
    pontos: 90
  },
  {
    id: 2,
    nome: "Daniel",
    pontos: 52
  },
  {
    id: 3,
    nome: "Beatriz",
    pontos: 97
  },
];

app.get("/pontuacoes", function(req, res) {
  res.send(lista);
})

app.post("/pontuacoes", function(req, res) {
  const item = req.body
  console.log(item)
  lista.push({
    id: lista.length + 1,
    nome: item.nome,
    pontos: item.pontos
  })
  res.send("Item criado com sucesso!")
})

app.listen(3000, () => 
  console.log("Servidor rodando em http://localhost:3000")
)