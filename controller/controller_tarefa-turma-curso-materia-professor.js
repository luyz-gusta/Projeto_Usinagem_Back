/************************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de Cursos
 * Autor: Luiz Gustavo
 * Data: 12/05/2023
 * Versão: 1.0
************************************************************************************************/

/**********************************************************
* Métodos com inicio 'ctl' são funcões do controller
* e
* Métodos com inicio 'mdl' são funcões do model
**********************************************************/

var message = require('./modulo/config.js')

var tarefaTurmaCursoMateriaProfessor = require('../model/DAO/tarefaTurmaCursoMateriaProfessorDAO.js')
var turmaDAO = require('../model/DAO/turmaDAO.js')

const ctlGetTarefaTurmaCursoMateriaProfessor = async () => {
    let dadosJSON = {}

    let dados = await tarefaTurmaCursoMateriaProfessor.mdlSelectAllTarefaTurmaCursoMateriaProfessor()

    if (dados) {
        dadosJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dados.length,
            dados: dados
        }
        return dadosJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

const ctlGetTarefaTurmaCursoMateriaProfessorByIdTurma = async (idTurma) => {
    let dadosJSON = {}

    if (idTurma == null || idTurma == undefined || idTurma == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificacaoTurma = await turmaDAO.mdlSelectByIdTurma(idTurma)

        if (verificacaoTurma) {
            let dados = await tarefaTurmaCursoMateriaProfessor.mdlSelectTarefasByIdTurma(idTurma)

            if (dados) {
                dadosJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    dados: dados
                }
                return dadosJSON
            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        } else {
            return message.ERROR_INVALID_ID_TURMA
        }
    }
}


module.exports = {
    ctlGetTarefaTurmaCursoMateriaProfessor,
    ctlGetTarefaTurmaCursoMateriaProfessorByIdTurma
}
