/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de CRITERIO
 *  Autor: Luiz e Muryllo
 *  Data: 14/04/2023
 *  Versão: 1.0
 **************************************************************************************/

/**********************************************************
* Métodos com inicio 'ctl' são funcões do controller
* e
* Métodos com inicio 'mdl' são funcões do model
**********************************************************/

var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do aluno no BD
var criterioDAO = require('../model/DAO/criterioDAO.js')
var controllerTarefa = require('../controller/controller_tarefa.js')
var controllerResultadoDesejado = require('../controller/controller_resultado-desejado.js')

//Retorna a lista de todos os professores
const ctlGetCriterios = async () => {
    let dadosCriterioJSON = {}

    let dadosCriterio = await criterioDAO.mdlSelectAllCriterio()

    if (dadosCriterio) {

        const dados = dadosCriterio.map(async criterio => {
            let dadosResultadoDesejado = await controllerResultadoDesejado.ctlGetResultadoDesejadoByIdCriterio(criterio.id_criterio)
            criterio.resultados = dadosResultadoDesejado.resultado_desejado

            return await criterio
        });

        let arrayMargemErro = await Promise.all(dados)

        dadosCriterioJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosCriterio.length,
            criterios: arrayMargemErro
        }
        return dadosCriterioJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

const ctlGetCriterioByID = async (idCriterio) => {
    let dadosCriterioJSON = {}

    if (idCriterio == null || idCriterio == undefined || idCriterio == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else if (isNaN(idCriterio)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosCriterio = await criterioDAO.mdlSelectCriterioByID(idCriterio)

        if (dadosCriterio) {
            const dados = dadosCriterio.map(async criterio => {
                let dadosResultadoDesejado = await controllerResultadoDesejado.ctlGetResultadoDesejadoByIdCriterio(criterio.id_criterio)
                console.log(dadosResultadoDesejado + criterio.id_criterio);
                criterio.resultados = dadosResultadoDesejado.resultado_desejado
    
                return await criterio
            });
    
            let arrayMargemErro = await Promise.all(dados)

            dadosCriterioJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                quantidade: dadosCriterio.length,
                criterios: arrayMargemErro
            }
            return dadosCriterioJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlGetCriterioByIdTarefa = async (idTarefa) => {
    let dadosCriterioJSON = {}

    if (idTarefa == null || idTarefa == undefined || idTarefa == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else if (isNaN(idTarefa)) {
        return message.ERROR_INVALID_ID
    } else {
        let verificacaoIdTarefa = await controllerTarefa.ctlGetTarefaByID(idTarefa)

        if (verificacaoIdTarefa.status == 200) {
            let dadosCriterio = await criterioDAO.mdlSelectCriterioByIdTarefa(idTarefa)

            if (dadosCriterio) {
                const dados = dadosCriterio.map(async criterio => {
                    let dadosResultadoDesejado = await controllerResultadoDesejado.ctlGetResultadoDesejadoByIdCriterio(criterio.id_criterio)
                    console.log(dadosResultadoDesejado + criterio.id_criterio);
                    criterio.resultados = dadosResultadoDesejado.resultado_desejado
        
                    return await criterio
                });
        
                let arrayMargemErro = await Promise.all(dados)

                dadosCriterioJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    quantidade: dadosCriterio.length,
                    criterios: arrayMargemErro
                }
                return dadosCriterioJSON
            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        } else {
            return message.ERROR_INVALID_ID_TAREFA
        }
    }
}

const ctlInserirCriterio = async (dadosCriterio) => {
    if (
        dadosCriterio.descricao == '' || dadosCriterio.descricao == null || dadosCriterio.descricao == undefined || dadosCriterio.descricao.length > 350 ||
        dadosCriterio.observacao != true && dadosCriterio.observacao != false ||
        dadosCriterio.tipo_critico != false && dadosCriterio.tipo_critico != true ||
        dadosCriterio.id_tarefa == null || dadosCriterio.id_tarefa == undefined || isNaN(dadosCriterio.id_tarefa)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificacaoIdTarefa = await controllerTarefa.ctlGetTarefaByID(dadosCriterio.id_tarefa)

        if (verificacaoIdTarefa.status == 200) {
            let resultDadosCriterio = await criterioDAO.mdlInsertCriterio(dadosCriterio)

            if (resultDadosCriterio) {
                let novoCriterio = await criterioDAO.mdlSelectLastByID()

                let dadosCriterioJSON = {
                    status: message.SUCCESS_CREATED_ITEM.status,
                    message: message.SUCCESS_CREATED_ITEM.message,
                    criterio: novoCriterio
                }
                return dadosCriterioJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_INVALID_ID_TAREFA
        }
    }
}

const ctlAtualizarCriterio = async (dadosCriterio, idCriterio) => {
    if (
        dadosCriterio.descricao == '' || dadosCriterio.descricao == null || dadosCriterio.descricao == undefined || dadosCriterio.descricao.length > 350 ||
        dadosCriterio.observacao != true && dadosCriterio.observacao != false ||
        dadosCriterio.tipo_critico != false && dadosCriterio.tipo_critico != true ||
        dadosCriterio.id_tarefa == null || dadosCriterio.id_tarefa == undefined || isNaN(dadosCriterio.id_tarefa)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else if (idCriterio == null || idCriterio == undefined || idCriterio == '') {
        return message.ERROR_INVALID_ID
    } else {
        let criterioAntigo = await criterioDAO.mdlSelectCriterioByID(idCriterio)

        if (criterioAntigo) {
            let verificacaoTarefa = await controllerTarefa.ctlGetTarefaByID(dadosCriterio.id_tarefa)

            if (verificacaoTarefa.status != 200) {
                return message.ERROR_INVALID_ID_TIPO_TAREFA
            } else {
                dadosCriterio.id = idCriterio

                let resultDadosCriterio = await criterioDAO.mdlUpdateCriterio(dadosCriterio)

                if (resultDadosCriterio) {
                    let criterioNovo = await criterioDAO.mdlSelectCriterioByID(dadosCriterio.id)

                    let dadosCriterioJSON = {
                        status: message.SUCCESS_UPDATED_ITEM.status,
                        message: message.SUCCESS_UPDATED_ITEM.message,
                        criterio_antigo: criterioAntigo,
                        criterio_novo: criterioNovo
                    }
                    return dadosCriterioJSON
                }else{
                    return message.ERROR_INTERNAL_SERVER
                }
            }
        } else {
            return message.ERROR_INVALID_ID_CRITERIO
        }
    }
}

module.exports = {
    ctlGetCriterios,
    ctlGetCriterioByID,
    ctlGetCriterioByIdTarefa,
    ctlInserirCriterio,
    ctlAtualizarCriterio
}