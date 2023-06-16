/************************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de TURMA_MATRICULA
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

var turmaMatriculaDAO = require('../model/DAO/turmaMatriculaDAO.js')
var controllerTurma = require('./controller_turmas.js')
var controllerMatricula = require('./controller_matricula.js')

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

const ctlGetMatriculaTurmasByID = async (id) => {
    let dadosMateriaTurmaJSON = {}

    if (id == null || id == undefined || id == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosMatricula = await turmaMatriculaDAO.mdlSelecTurmasMatriculasByID(id)

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

const ctlInsertTurmaMatricula = async (dadosTurmaMatricula) => {
    if (
        dadosTurmaMatricula.id_turma == null || dadosTurmaMatricula.id_turma == '' || dadosTurmaMatricula.id_turma == undefined ||
        dadosTurmaMatricula.id_matricula == null || dadosTurmaMatricula.id_matricula == '' || dadosTurmaMatricula.id_matricula == undefined
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificacaoTurma = await controllerTurma.ctlGetTurmasID(dadosTurmaMatricula.id_turma)
        let verificacaoMatricula = await controllerMatricula.ctlGetBuscarMatriculaID(dadosTurmaMatricula.id_matricula)

        if (verificacaoTurma.status != 200) {
            return message.ERROR_INVALID_ID_TURMA
        } else if (verificacaoMatricula.status != 200) {
            return message.ERROR_INVALID_ID_MATRICULA
        } else {
            let resultDados = await turmaMatriculaDAO.mdlInsertTurmasMatriculas(dadosTurmaMatricula)

            if (resultDados) {
                let novaTurmaMatricula = await turmaMatriculaDAO.mdlSelectLastByID()

                let dadosJSON = {
                    status: message.SUCCESS_CREATED_ITEM.status,
                    message: message.SUCCESS_CREATED_ITEM.message,
                    dados: novaTurmaMatricula
                }
                return dadosJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const ctlAtualizarTurmaMatricula = async (dadosTurmaMatricula, id) => {
    if (
        id == null || id == '' || id == undefined ||
        dadosTurmaMatricula.id_turma == null || dadosTurmaMatricula.id_turma == '' || dadosTurmaMatricula.id_turma == undefined ||
        dadosTurmaMatricula.id_matricula == null || dadosTurmaMatricula.id_matricula == '' || dadosTurmaMatricula.id_matricula == undefined
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificacaoTurma = await controllerTurma.ctlGetTurmasID(dadosTurmaMatricula.id_turma)
        let verificacaoMatricula = await controllerMatricula.ctlGetBuscarMatriculaID(dadosTurmaMatricula.id_matricula)

        if (verificacaoTurma.status != 200) {
            return message.ERROR_INVALID_ID_TURMA
        } else if (verificacaoMatricula.status != 200) {
            return message.ERROR_INVALID_ID_MATRICULA
        } else {
            let dadosAntigo = await turmaMatriculaDAO.mdlSelecTurmasMatriculasByID(id)

            if (dadosAntigo) {
                dadosTurmaMatricula.id = id

                let resultDados = await turmaMatriculaDAO.mdlInsertTurmasMatriculas(dadosTurmaMatricula)

                if (resultDados) {
                    let dadosNovo = await turmaMatriculaDAO.mdlSelecTurmasMatriculasByID(id)

                    let dadosJSON = {
                        status: message.SUCCESS_CREATED_ITEM.status,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        dados_antigo: dadosAntigo,
                        dados_novo: dadosNovo
                    }
                    return dadosJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER
                }
            }

        }
    }

}


const ctlDeletarTurmaMatricula = async (id) => {
    if (id == null || id == undefined || id == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosTurmaMatricula = await turmaMatriculaDAO.mdlDeleteTurmaMatricula(id)

        if (dadosTurmaMatricula) {
            return message.SUCCESS_DELETED_ITEM
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}


module.exports = {
    ctlGetMatriculaTurmas,
    ctlGetMatriculaIdTurma,
    ctlInsertTurmaMatricula,
    ctlAtualizarTurmaMatricula,
    ctlDeletarTurmaMatricula
}
