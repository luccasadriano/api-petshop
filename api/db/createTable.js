const tabela = require('../model/fornecedor')

tabela
   .sync()
   .then(() => console.log("Tabela Criada com sucesso"))
   .catch(console.log())