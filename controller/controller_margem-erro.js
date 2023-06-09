/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de TRUMAS
 *  Autor: Luiz, Muryllo e Millena
 *  Data: 09/06/2023
 *  Versão: 1.0
 **************************************************************************************/


var message = require('./modulo/config.js')

var margemErroDAO = require('../model/DAO/margemErroDAO.js')

var resultadoDesejadoDAO = require('../model/DAO/resultadoDesejadoDAO.js')

// Retorna a lista de todas as margem erro
const ctlGetMargemErro = async () => {
    let dadosMargemErroJSON = {}

    let dadosMargemErro = await margemErroDAO.mdlSelectAllMargemErro()

    if (dadosMargemErro) {

        dadosMargemErroJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosMargemErro.length,
            margem_erro: dadosMargemErro
        }
        return dadosMargemErroJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

// Retorna a lista de todas as margem erro
const ctlGetMargemErroID = async (id) => {
    let dadosMargemErroJSON = {}

    if (id == null || id == undefined || id == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosMargemErro = await margemErroDAO.mdlSelectByIdMargemErro(id)

        if (dadosMargemErro) {

            dadosMargemErroJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                margem_erro: dadosMargemErro
            }
            return dadosMargemErroJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlInserirMargemErro = async (dadosMargemErro) => {
    if (
        dadosMargemErro.minimo == '' || dadosMargemErro.minimo == null || dadosMargemErro.minimo == undefined ||
        dadosMargemErro.maximo == '' || dadosMargemErro.maximo == null || dadosMargemErro.maximo == undefined ||
        dadosMargemErro.id_resultado_desejado == '' || dadosMargemErro.id_resultado_desejado == null || dadosMargemErro.id_resultado_desejado == undefined || isNaN(dadosMargemErro.id_resultado_desejado)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {

        let verificarIdResultadoDesejado = await resultadoDesejadoDAO.mdlSelectAllResultadoDesejado(dadosMargemErro.id_resultado_desejado)

        if (verificarIdResultadoDesejado == false) {
            return message.ERROR_INVALID_ID_RESULTADO_DESEJADO
        } else {

            let resultadDadosMargemErro = await margemErroDAO.mdlInsertMargemErro(dadosMargemErro)

            if (resultadDadosMargemErro) {

                let novaMargemErro = await margemErroDAO.mdlSelectLastId()

                let dadosMargemErroJSON = {
                    status: message.SUCCESS_CREATED_ITEM.status,
                    message: message.SUCCESS_CREATED_ITEM.message,
                    margem_erro: novaMargemErro
                }
                return dadosMargemErroJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const ctlAtualizarMargemErro = async (dadosMargemErro, idMargemErro) => {
    if (
        dadosMargemErro.minimo == '' || dadosMargemErro.minimo == null || dadosMargemErro.minimo == undefined ||
        dadosMargemErro.maximo == '' || dadosMargemErro.maximo == null || dadosMargemErro.maximo == undefined ||
        dadosMargemErro.id_resultado_desejado == '' || dadosMargemErro.id_resultado_desejado == null || dadosMargemErro.id_resultado_desejado == undefined || isNaN(dadosMargemErro.id_resultado_desejado)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else if (idTurma == null || idTurma == '' || idTurma == undefined || isNaN(idTurma)){
        //console.log(idTurma);
        return message.ERROR_INVALID_ID
    } else {
        dadosMargemErro.id = idMargemErro

        let dadosMargemErroAntiga = await margemErroDAO.mdlSelectByIdMargemErro(idMargemErro)

        if (dadosMargemErroAntiga) {
        
            let resultadDadosMargemErro = await margemErroDAO.mdlUpdateMargemErro(dadosMargemErro)

            if (resultadDadosMargemErro) {
                let dadosMargemErroNovo = await margemErroDAO.mdlSelectByIdMargemErro(idMargemErro)

                let dadosMargemErroJSON = {
                    status: message.SUCCESS_UPDATED_ITEM.status,
                    message: message.SUCCESS_UPDATED_ITEM.message,
                    margem_erro_antiga : dadosMargemErroAntiga,
                    margem_erro_nova : dadosMargemErroNovo
                }

                return dadosMargemErroJSON
            }else {
                return message.ERROR_INTERNAL_SERVER
            }
        }else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlDeletarMargemErro = async (idMargemErro) => {

    if (idMargemErro == '' || idMargemErro == undefined || idMargemErro == null || isNaN(idMargemErro)) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let buscarMargemErro = await margemErroDAO.mdlSelectByIdMargemErro(idMargemErro)

        if (buscarMargemErro) {
            let margemErro = await margemErroDAO.mdlDeleteMargemErro(idMargemErro)

            if (margemErro) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }

}

module.exports = {
    ctlGetMargemErro,
    ctlGetMargemErroID,
    ctlInserirMargemErro,
    ctlAtualizarMargemErro,
    ctlDeletarMargemErro
}