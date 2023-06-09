/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de TRUMAS
 *  Autor: Luiz, Muryllo e Millena
 *  Data: 09/06/2023
 *  Versão: 1.0
 **************************************************************************************/


var message = require('./modulo/config.js')

var margemErroDAO = require('../model/DAO/margemErroDAO.js')


// Retorna a lista de todas as margem erro
const ctlGetMargemErro = async () => {
    let dadosMargemErroJSON = {}

    let dadosMargemErro = await margemErroDAO.mdlSelectAllMargemErro()

    if(dadosMargemErro){

        dadosMargemErroJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosMargemErro.length,
            margem_erro: dadosMargemErro
        }
        return dadosMargemErroJSON
    }else{
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

const ctlGetInserirMargemErro = async (dadosMargemErro) => {
    if (
        dadosMargemErro.minimo == '' || dadosMargemErro.minimo == null || dadosMargemErro.minimo == undefined || isNaN(dadosMargemErro.minimo) ||
        dadosMargemErro.maximo == '' || dadosMargemErro.maximo == null || dadosMargemErro.maximo == undefined || isNaN(dadosMargemErro.maximo) ||
        dadosMargemErro.id_resultado_desejado == '' || dadosMargemErro.id_resultado_desejado == null || dadosMargemErro.id_resultado_desejado == undefined || isNaN(dadosMargemErro.id_resultado_desejado)
    
    ) {
        return message.ERROR_REQUIRE_FIELDS
    }else{

        let verificarIdResultadoDesejado = await resultadoDesejadoDAO.mdlSelectAllResultadoDesejado(dadosMargemErro.id_resultado_desejado)

        if (verificarIdResultadoDesejado == false) {
            return message.ERROR_INVALID_ID_RESULTADO_DESEJADO
        } else {

            let resultadDadosMargemErro = await margemErroDAO.mdlInsertMargemErro(dadosMargemErro)

            if (resultadDadosMargemErro) {
                
                let novaMargemErro = await margemErroDAO.mdlSelectLastId()

                let dadosMargemErroJSON = {
                    status : message.SUCCESS_CREATED_ITEM.status,
                    message : message.SUCCESS_CREATED_ITEM.message,
                    margem_erro : novaMargemErro
                }
                return dadosMargemErroJSON
            }else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

module.exports = {
    ctlGetMargemErro,
    ctlGetInserirMargemErro
}