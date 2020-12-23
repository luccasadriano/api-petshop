const router = require('express').Router()
const table = require('../controller/index.js')
const Fornecedor = require('../controller/fornecedores')
const SerializadorFornecedor = require('../Serializador').SerializadorFornecedor

router.get('/', async (req, res) => {
   const resultados = await table.listar()
   res.status(200)
   const serializador = new SerializadorFornecedor(
      res.getHeader('Content-Type'),
      ['email', 'dataCraiacao', 'dataAtualizacao', 'versao']
   )
   res.send(
      serializador.serializar(resultados)
   )
})

router.post('/', async (req, res, next) => {
   try {
      const dadosRecebidos = req.body
      const fornecedor = new Fornecedor(dadosRecebidos)
      await fornecedor.criar()
      res.status(201)
      const serializador = new SerializadorFornecedor(
         res.getHeader('Content-Type')
      )
      res.send(
         serializador.serializar(fornecedor)
      )
   } catch (err) {
      next(err)
   }
})

router.get('/:idFornecedor', async (req, res, next) => {
   try {
      const id = req.params.idFornecedor
      const fornecedor = new Fornecedor({ id: id })
      await fornecedor.carregar()
      res.status(200)
      const serializador = new SerializadorFornecedor(
         res.getHeader('Content-Type'),
         ['email', 'dataCraiacao', 'dataAtualizacao', 'versao']
      )
      res.send(
         serializador.serializar(fornecedor)
      )
   } catch (err) {
      next(err)
   }
})

router.put('/:idFornecedor', async (req, res, next) => {
   try {
      const id = req.params.idFornecedor
      const dadosRecebidos = req.body
      const dados = Object.assign({}, dadosRecebidos, { id: id })
      const fornecedor = new Fornecedor(dados)
      await fornecedor.atualizar()
      res.status(204)
      res.end()
   } catch (err) {
      next(err)
   }
})

router.delete('/:idFornecedor', async (req, res, next) => {
   try {
      const id = req.params.idFornecedor
      const fornecedor = new Fornecedor({ id: id })
      await fornecedor.carregar()
      await fornecedor.remover()
      res.status(204)
      res.end()
   } catch (err) {
      next(err)
   }
})


module.exports = router