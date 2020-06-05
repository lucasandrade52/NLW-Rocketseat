const express = require("express")
const server = express()

// configurar pasta pública
server.use(express.static("public"))

//configurando template enginee
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
//configurar caminhos da minha aplicação
//Home
server.get("/", function(req, res) {
    return res.render("index.html")
})

server.get("/create-point", function(req, res) {
    return res.render(__dirname + "/views/create-point.html")
})

server.get("/search", function(req, res) {
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)