const express = require('express')
const { MongoClient } = require("mongodb")

// const url = "mongodb://localhost:27017";
const url = "mongodb+srv://admin:tWzHRIEBWod6wjCc@cluster0.z9grwi0.mongodb.net/";
const dbName = "jornada-fullstack-agosto-2022"

async function main() {
  // Realizar a conexão com o MongoClient
  // MongoClient -> MongoDatabase -> MongoCollection

  // Conexões com o client podem levar um tempo para
  //  concluir. Portanto, utilizamos o mecanismo de
  //  Promises do JavaScript, que permitem aguardar
  //  esse tempo. Para isso, vamos usar o async/await.

  const client = await MongoClient.connect(url)
  const db = client.db(dbName)
  const collection = db.collection("pontuacoes")
  
  const app = express()
  
  // Sinalizando ao Express o uso de JSON no body de requests
  app.use(express.json());
  
  app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
  app.get('/oi', function (req, res) {
    res.send("Olá, mundo!")
  })

  app.get("/pontuacoes", async function(req, res) {
    // res.send(lista);
    const itens = await collection
      .find()
      .sort({ pontos: -1 })
      .limit(10)
      .toArray();

    res.send(itens);
  })

  app.post("/pontuacoes", async function(req, res) {
    const item = req.body
    // console.log(item)
    // lista.push({
    //   id: lista.length + 1,
    //   nome: item.nome,
    //   pontos: item.pontos
    // })
    await collection.insertOne(item)
    res.send(item)
  })

  app.listen(process.env.PORT || 3000, () => 
  console.log("Aplicação rodando em http://localhost:3000")
  )
}

main()