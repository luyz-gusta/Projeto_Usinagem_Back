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

//Import do arquivo DAO para acessar dados do aluno no BD
var turmaMatriculaDAO = require('../model/DAO/turmaMatriculaDAO.js')

//Retorna todos os cursos
const ctlGetMatriculaTurmas = async () => {
    let dadosMateriaTurmaJSON = {}

    let dadosMatricula = await turmaMatriculaDAO.mdlSelectAllTurmasMatriculas()

    if (dadosMatricula) {
        dadosMateriaTurmaJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            matriculas: dadosMatricula
        }
        return dadosMateriaTurmaJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }

}

const ctlGetMatriculaIdTurma = async (idTurma) => {
    let dadosMateriaTurmaJSON = {}

    if (idTurma == null || idTurma == undefined || idTurma == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosMatricula = await turmaMatriculaDAO.mdlSelectMatriculasByIdTurma(idTurma)

        if (dadosMatricula) {
            dadosMateriaTurmaJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                matriculas: dadosMatricula
            }
            return dadosMateriaTurmaJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}


module.exports = {
    ctlGetMatriculaTurmas,
    ctlGetMatriculaIdTurma
}
