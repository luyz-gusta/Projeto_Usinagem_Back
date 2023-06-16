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
var professorDAO = require('../model/DAO/professorDAO.js')
var matriculaDAO = require('../model/DAO/matriculaDAO.js')
var controllerCriterio = require('./controller_criterio.js')
var controllerAvaliacaoAluno = require('./controller_avaliacao-aluno.js')

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

const ctlGetTarefaTurmaCursoMateriaProfessorByIdTurmaEIdProfessorEIdMatricula = async (idTurma, idProfessor, idMatricula) => {
    let dadosJSON = {}

    if (
        idTurma == null || idTurma == undefined || idTurma == '' ||
        idProfessor == null || idProfessor == undefined || idProfessor == '' ||
        idMatricula == null || idMatricula == undefined || idMatricula == ''
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificacaoTurma = await turmaDAO.mdlSelectByIdTurma(idTurma)
        let verificarProfessor = await professorDAO.mdlSelectProfessorByID(idProfessor)
        let pegarMatricula = await matriculaDAO.mdlSelectByIdMatricula(idMatricula)

        if (verificacaoTurma && verificarProfessor && pegarMatricula) {
            let dados = await tarefaTurmaCursoMateriaProfessor.mdlSelectTarefasByIdTurmaAndIdProfessor(idTurma, idProfessor)

            for (let index = 0; index < dados.length; index++) {
                let listaCriterios = await controllerCriterio.ctlGetCriterioByIdTarefa(dados[index].id_tarefa)

                for (let i = 0; i < listaCriterios.criterios.length; i++) {
                    
                    let respostaCriterio = await controllerAvaliacaoAluno.ctlGetAvaliacaoAlunoIdCriterioEIdMatricula(listaCriterios.criterios[i].id_criterio, idMatricula)

                    if(respostaCriterio.status == 200){
                        listaCriterios.criterios[i].resposta = respostaCriterio
                    }else{
                        listaCriterios.criterios[i].resposta = null
                    }
                }
                dados[index].criterios = listaCriterios.criterios
            }

            pegarMatricula[0].tarefas = dados

            if (dados) {
                dadosJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    dados: pegarMatricula
                }
                return dadosJSON
            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        } else {
            return message.ERROR_INVALID_ID_PROFESSOR_TURMA
        }
    }
}


module.exports = {
    ctlGetTarefaTurmaCursoMateriaProfessor,
    ctlGetTarefaTurmaCursoMateriaProfessorByIdTurma,
    ctlGetTarefaTurmaCursoMateriaProfessorByIdTurmaEIdProfessorEIdMatricula
}
