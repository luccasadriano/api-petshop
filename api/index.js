const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const router = require('./router/fornecedores')

const NaoEncontrados = require('./erros/NaoEncontrados')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

const app = express()

app.use((req, res, next)=>{
   let formatReq = req.header('Accept')

   if(formatReq === '*/*'){
      formatReq = 'application/json'
   }

   if(formatosAceitos.indexOf(formatReq) === -1){
      res.status(406)
      res.end()
      return
   }
   res.setHeader('Content-Type', formatReq)
   next()
})

app.use(bodyParser.json())

app.use('/api/fornecedores', router)

app.use((err, req, res, next) => {

   let status = 500

   if (err instanceof NaoEncontrados) {
      status = 404
   } else if (err instanceof CampoInvalido || err instanceof DadosNaoFornecidos) {
      status = 400
   } else if (err instanceof ValorNaoSuportado) {
      status = 406
   }

   res.status(status)

   res.send(JSON.stringify({
      Mensagem: err.message,
      id: err.idErro
   })
   )
})

app.listen(config.get('api.porta'), () => console.log("API start"))