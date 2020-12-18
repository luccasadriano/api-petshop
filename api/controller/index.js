const ModelTable = require('../model/fornecedor')
const NaoEncontrados = require('../erros/NaoEncontrados')

module.exports = {
   listar() {
      return ModelTable.findAll({ raw: true })
   },
   inserir(fornecedor) {
      return ModelTable.create(fornecedor)
   },
   async pegarPorId(id) {
      const find = await ModelTable.findOne({
         where: {
            id: id
         }
      })
      if (!find) {
         throw new NaoEncontrados()
      }
      return find
   },
   atualizar(id, dadosParaAtualizar) {
      return ModelTable.update(
         dadosParaAtualizar,
         {
            where: {
               id: id
            }
         }
      )
   },
   remover(id) {
      return ModelTable.destroy({
         where: { id: id }
      })
   }

}