const tabelaFornecedor = require('./index')
const CampoInvalido = require('../erros/CampoInvalido')
const DadosNaoFornecidos = require('../erros/DadosNaoFornecidos')

class Fornecedor {
   constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
      this.id = id
      this.empresa = empresa
      this.email = email
      this.categoria = categoria
      this.dataCriacao = dataCriacao
      this.dataAtualizacao = dataAtualizacao
      this.versao = versao

   }

   async criar() {
      this.validar()
      const resultado = await tabelaFornecedor.inserir({
         empresa: this.empresa,
         email: this.email,
         categoria: this.categoria
      })

      this.id = resultado.id
      this.dataCriacao = resultado.dataCriacao
      this.dataAtualizacao = resultado.dataAtualizacao
      this.versao = resultado.versao
   }

   async carregar() {
      const findId = await tabelaFornecedor.pegarPorId(this.id)
      this.empresa = findId.empresa
      this.email = findId.email
      this.categoria = findId.categoria
      this.dataCriacao = findId.dataCriacao
      this.dataAtualizacao = findId.dataAtualizacao
      this.versao = findId.versao

   }

   async atualizar() {
      await tabelaFornecedor.pegarPorId(this.id)
      const campos = ['empresa', 'email', 'categoria']
      const dadosParaAtualizar = {}

      campos.forEach((campo) => {
         const valor = this[campo]

         if (typeof valor === 'string' && valor.length > 0) {
            dadosParaAtualizar[campo] = valor
         }
      })

      if (Object.keys(dadosParaAtualizar).length === 0) {
         throw new DadosNaoFornecidos()
      }

      await tabelaFornecedor.atualizar(this.id, dadosParaAtualizar)

   }

   remover() {
      tabelaFornecedor.remover(this.id)
   }

   validar() {
      const campos = ['empresa', 'email', 'categoria']
      campos.forEach(campo => {
         const valor = this[campo]
         if (typeof valor !== 'string' || valor.length === 0) {
            throw new CampoInvalido(campo)
         }
      })
   }





}
module.exports = Fornecedor