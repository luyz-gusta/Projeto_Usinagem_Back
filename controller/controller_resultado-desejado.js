/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de RESULTADO DESEJADO
 *  Autor: Luiz e Muryllo e Millena
 *  Data: 09/06/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import do arquivo DAO para acessar dados da Registro de Tempo no BD
var resultadoDesejadoDAO = require('../model/DAO/resultadoDesejadoDAO.js')

var criterioDAO = require('../model/DAO/criterioDAO.js')

var controllerCriterio = require('./controller_criterio.js')

var message = require('./modulo/config.js')

//Retorna a lista de todas as ResultadoDesejados
const ctlGetResultadoDesejado = async function () {

    let dadosResultadoDesejadoJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosResultadoDesejado = await resultadoDesejadoDAO.mdlSelectAllResultadoDesejado();

    if (dadosResultadoDesejado) {
        //Criando um JSON com o atributo ResultadoDesejados, para encaminhar um array de ResultadoDesejados
        dadosResultadoDesejadoJSON.status = message.SUCCESS_REQUEST.status;
        dadosResultadoDesejadoJSON.message = message.SUCCESS_REQUEST.message;
        dadosResultadoDesejadoJSON.quantidade = dadosResultadoDesejado.length;
        dadosResultadoDesejadoJSON.resultado_desejado = dadosResultadoDesejado
        return dadosResultadoDesejadoJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND;
    }
}

//Retorna um registro de ResultadoDesejado filtrada pelo ID do Criterio
const ctlGetResultadoDesejadoByIdCriterio = async function (idCriterio) {

    let dadosResultadoDesejadoJSON = {}

    if (idCriterio == null || idCriterio == undefined || idCriterio == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else if (isNaN(idCriterio)) {
        return message.ERROR_INVALID_ID
    } else {
        let verificacaoIdCriterio = await criterioDAO.mdlSelectCriterioByID(idCriterio)

        if (verificacaoIdCriterio) {
            let dadosResultadoDesejado = await resultadoDesejadoDAO.mdlSelectResultadoDesejadoPeloIdCriterio(idCriterio)

            if (dadosResultadoDesejado) {
                dadosResultadoDesejadoJSON.status = message.SUCCESS_REQUEST.status;
                dadosResultadoDesejadoJSON.message = message.SUCCESS_REQUEST.message;
                dadosResultadoDesejadoJSON.quantidade = dadosResultadoDesejado.length;
                dadosResultadoDesejadoJSON.resultado_desejado = dadosResultadoDesejado
                return dadosResultadoDesejadoJSON
            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        }else{
            return message.ERROR_INVALID_ID_CRITERIO
        }
    }
}

//Retorna um registro de Resultado Desejado filtrado pelo ID
const ctlGetResultadoDesejadoByID = async function (id) {

    let idNumero = id

    //Validação do ID
    if (idNumero == '' || id == undefined || isNaN(idNumero)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosResultadoDesejadoJSON = {}

        let dadosResultadoDesejado = await resultadoDesejadoDAO.mdlSelectResultadoDesejadoByID(idNumero)

        if (dadosResultadoDesejado) {
            //Criando um JSON com o atributo Resultado Desejado, para encaminhar um array de Resultado Desejado
            dadosResultadoDesejadoJSON.status = message.SUCCESS_REQUEST.status;
            dadosResultadoDesejadoJSON.message = message.SUCCESS_REQUEST.message;
            dadosResultadoDesejadoJSON.resultado_desejado = dadosResultadoDesejado
            return dadosResultadoDesejadoJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
}

module.exports = {
    ctlGetResultadoDesejado,
    ctlGetResultadoDesejadoByIdCriterio,
    ctlGetResultadoDesejadoByID,
}