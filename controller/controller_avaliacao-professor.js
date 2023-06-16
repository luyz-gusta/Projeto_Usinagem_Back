/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de AVALIACAO_PROFESSOR
 *  Autor: Luiz, Muryllo e Millena
 *  Data: 09/06/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var avaliacaoProfessorDAO = require('../model/DAO/avaliacaoProfessorDAO.js')
var professorDAO = require('../model/DAO/professorDAO.js')
var avaliacaoAlunoDAO = require('../model/DAO/avaliacaoAlunoDAO.js')


const ctlGetAvaliacoesProfessor = async function () {
    let avaliacaoJSON = {}

    let avaliacoes = await avaliacaoProfessorDAO.mdlSelectAllAvaliacoesProfessor()

    if (avaliacoes) {

        avaliacaoJSON.status = message.SUCCESS_REQUEST.status
        avaliacaoJSON.message = message.SUCCESS_REQUEST.message
        avaliacaoJSON.quantidade = avaliacoes.length;
        avaliacaoJSON.avaliacao = avaliacoes

        return avaliacaoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const ctlGetAvaliacaoProfessorID = async function (id) {

    let dadosAvaliacaoProfessorJSON = {};

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosAvaliacaoProfessor = await avaliacaoProfessorDAO.mdlSelectAvaliacaoProfessorByID(id)

        if (dadosAvaliacaoProfessor) {
            dadosAvaliacaoProfessorJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                dado_avaliacao_professor: dadosAvaliacaoProfessor
            }
            return dadosAvaliacaoProfessorJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlInserirAvaliacaoProfessor = async (dadosAvaliacaoProfessor) => {

    if(
        dadosAvaliacaoProfessor.valor == undefined || dadosAvaliacaoProfessor.valor == null ||
        dadosAvaliacaoProfessor.id_professor == '' || dadosAvaliacaoProfessor.id_professor == undefined || dadosAvaliacaoProfessor.id_professor == null ||
        dadosAvaliacaoProfessor.id_avaliacao_aluno == '' || dadosAvaliacaoProfessor.id_avaliacao_aluno == undefined || dadosAvaliacaoProfessor.id_avaliacao_aluno == null
    ){
        return message.ERROR_REQUIRE_FIELDS  
    } else {
        let verificarIdProfessor = await professorDAO.mdlSelectProfessorByID(dadosAvaliacaoProfessor.id_professor)

        let verificarIdAvaliacaoAluno = await avaliacaoAlunoDAO.mdlSelectAllAvaliacoesAlunos(dadosAvaliacaoProfessor.id_avaliacao_aluno)

        if (verificarIdProfessor == false) {
            return message.ERROR_INVALID_ID_MATRICULA //mudar
        }else if (verificarIdAvaliacaoAluno == false) {
            return message.ERROR_INVALID_ID_CRITERIO // mudar
        }else{
            
            let resultDadosAvaliacaoProfessor = await avaliacaoProfessorDAO.mdlInsertAvaliacaoProfessor(dadosAvaliacaoProfessor)

            if (resultDadosAvaliacaoProfessor) {
                
                let novaAvaliacaoProfessor = await avaliacaoProfessorDAO.mdlSelectLastId()

                let dadosAvaliacaoProfessorJSON = {
                    status : message.SUCCESS_CREATED_ITEM.status,
                    message : message.SUCCESS_CREATED_ITEM.message,
                    avaliacao_professor : novaAvaliacaoProfessor 
                }
                return dadosAvaliacaoProfessorJSON
            }else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const ctlAtualizarAvaliacaoProfessor = async (dadosAvaliacaoProfessor, idAvaliacaoProfessor) => {
    if(
        dadosAvaliacaoProfessor.valor == '' || dadosAvaliacaoProfessor.valor == undefined || dadosAvaliacaoProfessor.valor == null ||
        dadosAvaliacaoProfessor.id_professor == '' || dadosAvaliacaoProfessor.id_professor == undefined || dadosAvaliacaoProfessor.id_professor == null ||
        dadosAvaliacaoProfessor.id_avaliacao_aluno == '' || dadosAvaliacaoProfessor.id_avaliacao_aluno == undefined || dadosAvaliacaoProfessor.id_avaliacao_aluno == null
    ){
        return message.ERROR_REQUIRE_FIELDS  
    }else if (idAvaliacaoProfessor == null || idAvaliacaoProfessor == '' || idAvaliacaoProfessor == undefined || isNaN(idAvaliacaoProfessor)){
        return message.ERROR_INVALID_ID
    } else {
        dadosAvaliacaoProfessor.id = idAvaliacaoProfessor

        let dadosAvaliacaoProfessorAntigo = await avaliacaoProfessorDAO.mdlSelectAvaliacaoProfessorByID(idAvaliacaoProfessor)

        if (dadosAvaliacaoProfessorAntigo) {
            
            let resultDadosAvaliacaoProfessor = await avaliacaoProfessorDAO.mdlUpdateAvaliacaoProfessor(dadosAvaliacaoProfessor)

            if (resultDadosAvaliacaoProfessor) {
                
                let dadosAvaliacaoProfessorNovo = await avaliacaoProfessorDAO.mdlSelectAvaliacaoProfessorByID(idAvaliacaoProfessor)

                let dadosAvaliacaoProfessorJSON = {
                    status: message.SUCCESS_UPDATED_ITEM.status,
                    message: message.SUCCESS_UPDATED_ITEM.message,
                    avaliacao_professor_antiga : dadosAvaliacaoProfessorAntigo,
                    avaliacao_professor_novo : dadosAvaliacaoProfessorNovo
                }
                return dadosAvaliacaoProfessorJSON
            }else{
                return message.ERROR_INTERNAL_SERVER
            }
        }else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlDeletarAvaliacaoProfessor = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    }else {
        let buscarAvaliacaoProfessor = await avaliacaoProfessorDAO.mdlSelectAvaliacaoProfessorByID(id)

        if (buscarAvaliacaoProfessor) {
            let avaliacaoProfessor = await avaliacaoProfessorDAO.mdlDeleteAvaliacaoProfessor(id)

            if (avaliacaoProfessor) {
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
    ctlGetAvaliacoesProfessor,
    ctlGetAvaliacaoProfessorID,
    ctlInserirAvaliacaoProfessor,
    ctlAtualizarAvaliacaoProfessor,
    ctlDeletarAvaliacaoProfessor
}