/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de TRUMAS
 *  Autor: Luiz, Muryllo e Millena
 *  Data: 09/06/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var avaliacaoAlunoDAO = require('../model/DAO/avaliacaoAlunoDAO.js')

var matriculaDAO = require('../model/DAO/matriculaDAO.js')

var criterioDAO = require('../model/DAO/criterioDAO.js')

const ctlGetAvaliacoesAlunos = async function () {
    let avaliacaoJSON = {}

    let avaliacoes = await avaliacaoAlunoDAO.mdlSelectAllAvaliacoesAlunos()

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

const ctlGetAvaliacaoAlunoID = async function (id) {

    let dadosAvaliacaoAlunoJSON = {};

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosAvaliacaoAluno = await avaliacaoAlunoDAO.mdlSelectAvaliacaoAlunoByID(id)

        if (dadosAvaliacaoAluno) {
            dadosAvaliacaoAlunoJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                dadoAvaliacaoAluno: dadosAvaliacaoAluno
            }
            return dadosAvaliacaoAlunoJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlInserirAvaliacaoAluno = async (dadosAvaliacaoAluno) => {

    if(
        dadosAvaliacaoAluno.nota == undefined || dadosAvaliacaoAluno.nota == null ||
        dadosAvaliacaoAluno.valor_obtido == '' || dadosAvaliacaoAluno.valor_obtido == undefined || dadosAvaliacaoAluno.valor_obtido == null ||
        dadosAvaliacaoAluno.id_matricula == '' || dadosAvaliacaoAluno.id_matricula == undefined || dadosAvaliacaoAluno.id_matricula == null ||
        dadosAvaliacaoAluno.id_criterio == '' || dadosAvaliacaoAluno.id_criterio == undefined || dadosAvaliacaoAluno.id_criterio == null
    ){
        return message.ERROR_REQUIRE_FIELDS  
    } else {
        let verificarIdMatricula = await matriculaDAO.mdlSelectByIdMatricula(dadosAvaliacaoAluno.id_matricula)

        let verificarIdCriterio = await criterioDAO.mdlSelectCriterioByID(dadosAvaliacaoAluno.id_criterio)

        if (verificarIdMatricula == false) {
            return message.ERROR_INVALID_ID_MATRICULA
        }else if (verificarIdCriterio == false) {
            return message.ERROR_INVALID_ID_CRITERIO
        }else{
            
            let resultDadosAvaliacaoAluno = await avaliacaoAlunoDAO.mdlInsertAvaliacaoAluno(dadosAvaliacaoAluno)

            if (resultDadosAvaliacaoAluno) {
                
                let novaAvaliacaoAluno = await avaliacaoAlunoDAO.mdlSelectLastId()

                let dadosAvaliacaoAlunoJSON = {
                    status : message.SUCCESS_CREATED_ITEM.status,
                    message : message.SUCCESS_CREATED_ITEM.message,
                    avaliacao_aluno : novaAvaliacaoAluno 
                }
                return dadosAvaliacaoAlunoJSON
            }else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }


}

const ctlAtualizarAvaliacaoAluno = async (dadosAvaliacaoAluno, idAvaliacaoAluno) => {
    if(
        dadosAvaliacaoAluno.nota == undefined || dadosAvaliacaoAluno.nota == null ||
        dadosAvaliacaoAluno.valor_obtido == '' || dadosAvaliacaoAluno.valor_obtido == undefined || dadosAvaliacaoAluno.valor_obtido == null ||
        dadosAvaliacaoAluno.id_matricula == '' || dadosAvaliacaoAluno.id_matricula == undefined || dadosAvaliacaoAluno.id_matricula == null ||
        dadosAvaliacaoAluno.id_criterio == '' || dadosAvaliacaoAluno.id_criterio == undefined || dadosAvaliacaoAluno.id_criterio == null
    ){
        return message.ERROR_REQUIRE_FIELDS  
    }else if (idAvaliacaoAluno == null || idAvaliacaoAluno == '' || idAvaliacaoAluno == undefined || isNaN(idAvaliacaoAluno)){
        return message.ERROR_INVALID_ID
    } else {
        dadosAvaliacaoAluno.id = idAvaliacaoAluno

        let dadosAvaliacaoAlunoAntigo = await avaliacaoAlunoDAO.mdlSelectAvaliacaoAlunoByID(idAvaliacaoAluno)

        if (dadosAvaliacaoAlunoAntigo) {
            
            let resultDadosAvaliacaoAluno = await avaliacaoAlunoDAO.mdlUpdateAvaliacaoAluno(dadosAvaliacaoAluno)

            if (resultDadosAvaliacaoAluno) {
                
                let dadosAvaliacaoAlunoNovo = await avaliacaoAlunoDAO.mdlSelectAvaliacaoAlunoByID(idAvaliacaoAluno)

                let dadosAvaliacaoAlunoJSON = {
                    status: message.SUCCESS_UPDATED_ITEM.status,
                    message: message.SUCCESS_UPDATED_ITEM.message,
                    avaliacao_aluno_antiga : dadosAvaliacaoAlunoAntigo,
                    avaliacao_aluno_novo : dadosAvaliacaoAlunoNovo
                }
                return dadosAvaliacaoAlunoJSON
            }else{
                return message.ERROR_INTERNAL_SERVER
            }
        }else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlDeletarAvaliacaoAluno = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    }else {
        let buscarAvaliacaoAluno = await avaliacaoAlunoDAO.mdlSelectAvaliacaoAlunoByID(id)

        if (buscarAvaliacaoAluno) {
            let avaliacaoAluno = await avaliacaoAlunoDAO.mdlDeleteAvaliacaoAluno(id)

            if (avaliacaoAluno) {
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
    ctlGetAvaliacoesAlunos,
    ctlGetAvaliacaoAlunoID,
    ctlInserirAvaliacaoAluno,
    ctlAtualizarAvaliacaoAluno,
    ctlDeletarAvaliacaoAluno
}