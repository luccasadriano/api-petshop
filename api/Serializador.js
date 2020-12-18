const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {
   json(dados) {
      return JSON.stringify(dados)
   }
   serializar(dados) {
      if (this.contentType === 'application/json') {
         return this.json(this.filtrar(dados))
      }
      throw new ValorNaoSuportado(this.contentType)
   }

   filtrarObjeto(data) {
      const newObjeto = {}

      this.camposPublicos.forEach((campo) => {
         if (data.hasOwnProperty(campo)) {
            newObjeto[campo] = data[campo]
         }
      })
      return newObjeto
   }
   filtrar(dados) {
      if (Array.isArray(dados)) {
         dados = dados.map(item => {
            return this.filtrarObjeto(item)
         })
      } else {
         dados = this.filtrarObjeto(dados)
      }
      return dados
   }
}

class SerializadorFornecedor extends Serializador {
   constructor(contentType) {
      super()
      this.contentType = contentType
      this.camposPublicos = ['id', 'empresa', 'categoria']

   }
}

module.exports = {
   Serializador: Serializador,
   SerializadorFornecedor: SerializadorFornecedor,
   formatosAceitos: ['application/json']
}