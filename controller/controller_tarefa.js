/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de TAREFA
 *  Autor: Luiz e Muryllo
 *  Data: 29/05/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import do arquivo DAO para acessar dados da Tarefa no BD
var tarefaDAO = require('../model/DAO/tarefaDAO.js')

var professorDAO = require('../model/DAO/professorDAO.js')

var materiaDAO = require('../model/DAO/materiaDAO.js')

var message = require('./modulo/config.js')

//Retorna a lista de todas as tarefas
const ctlGetTarefa = async function () {

    let dadosTarefaJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosTarefa = await tarefaDAO.mdlSelectAllTarefas();

    if (dadosTarefa) {
        //Criando um JSON com o atributo Tarefas, para encaminhar um array de Tarefas
        dadosTarefaJSON.status = message.SUCCESS_REQUEST.status;
        dadosTarefaJSON.message = message.SUCCESS_REQUEST.message;
        dadosTarefaJSON.quantidade = dadosTarefa.length;
        dadosTarefaJSON.tarefas = dadosTarefa
        return dadosTarefaJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND;
    }
}

//Retorna um registro de tarefa filtrada pelo ID
const ctlGetTarefaByID = async function (id) {

    let idNumero = id

    //Validação do ID
    if (idNumero == '' || id == undefined || isNaN(idNumero)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosTarefaJSON = {}

        let dadosTarefa = await tarefaDAO.mdlSelectByIdTarefa(idNumero)

        if (dadosTarefa) {
            //Criando um JSON com o atributo Tarefa, para encaminhar um array de Tarefas
            dadosTarefaJSON.status = message.SUCCESS_REQUEST.status;
            dadosTarefaJSON.message = message.SUCCESS_REQUEST.message;
            dadosTarefaJSON.tarefa = dadosTarefa
            return dadosTarefaJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
}

//Retorna uma Tarefa filtrando pelo nome
const ctlGetBuscarTarefaNome = async function (nome) {

    let nomeTarefa = nome

    let dadosTarefaJSON = {}

    let dadosTarefa = await tarefaDAO.mdlSelectByNameTarefa(nomeTarefa)

    if (dadosTarefa) {
        dadosTarefaJSON.status = message.SUCCESS_REQUEST.status;
        dadosTarefaJSON.message = message.SUCCESS_REQUEST.message;
        dadosTarefaJSON.tarefa = dadosTarefa
        return dadosTarefaJSON
    } else {
        return message.ERROR_INVALID_NOME;
    }
}

//Inserir uma nova Tarefa
const ctlInserirTarefa = async function (dadosTarefa) {

    let resultDadosTarefa;

    if (dadosTarefa.nome == '' || dadosTarefa.nome == undefined || dadosTarefa.nome.length > 100 ||
        dadosTarefa.tempo_previsto == '' || dadosTarefa.tempo_previsto == undefined ||
        dadosTarefa.numero == '' || dadosTarefa.numero == undefined ||
        dadosTarefa.foto_peca == '' || dadosTarefa.foto_peca == undefined || dadosTarefa.foto_peca.length > 150 ||
        dadosTarefa.id_tipo_tarefa == '' || dadosTarefa.id_tipo_tarefa == undefined || isNaN(dadosTarefa.id_tipo_tarefa) ||
        dadosTarefa.id_professor == '' || dadosTarefa.id_professor == undefined || isNaN(dadosTarefa.id_professor) ||
        dadosTarefa.id_materia == '' || dadosTarefa.id_materia == undefined || isNaN(dadosTarefa.id_materia)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificacaoProfessor = await professorDAO.mdlSelectProfessorByID(dadosTarefa.id_professor)
        let verificacaoMateria = await materiaDAO.mdlSelectByIdMateria(dadosTarefa.id_materia)

        if (verificacaoProfessor == false || verificacaoMateria == false) {
            return message.ERROR_INVALID_ID_PROFESSOR_MATERIA
        } else {
            //Envia os dados para a model inserir no Banco de Dados
            resultDadosTarefa = await tarefaDAO.mdlInsertTarefa(dadosTarefa);

            //Valida de o banco de dados inseriu corretamente os dados
            if (resultDadosTarefa) {

                //Chama a função que vai encontrar o ID gerado após o insert
                let novaTarefa = await tarefaDAO.mdlSelectLastId();

                let dadosTarefasJSON = {};
                dadosTarefasJSON.status = message.SUCCESS_CREATED_ITEM.status;
                dadosTarefasJSON.message = message.SUCCESS_CREATED_ITEM.message;
                dadosTarefasJSON.tarefa = novaTarefa;
                return dadosTarefasJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

//Atualizar uma Tarefa
const ctlAtualizarTarefa = async function (dadosTarefa, idTarefa) {

    if (dadosTarefa.nome == '' || dadosTarefa.nome == undefined || dadosTarefa.nome.length > 100 ||
        dadosTarefa.tempo_previsto == '' || dadosTarefa.tempo_previsto == undefined ||
        dadosTarefa.numero == '' || dadosTarefa.numero == undefined ||
        dadosTarefa.foto_peca == '' || dadosTarefa.foto_peca == undefined || dadosTarefa.foto_peca.length > 150 ||
        dadosTarefa.id_tipo_tarefa == '' || dadosTarefa.id_tipo_tarefa == undefined ||
        dadosTarefa.id_professor == '' || dadosTarefa.id_professor == undefined ||
        dadosTarefa.id_materia == '' || dadosTarefa.id_materia == undefined
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else if (idTarefa == '' || idTarefa == undefined || isNaN(idTarefa)) {
        return message.ERROR_INVALID_ID
    } else {
        let verificacaoProfessor = await professorDAO.mdlSelectProfessorByID(dadosTarefa.id_professor)
        let verificacaoMateria = await materiaDAO.mdlSelectByIdMateria(dadosTarefa.id_materia)

        if (verificacaoProfessor == false || verificacaoMateria == false) {
            return message.ERROR_INVALID_ID_PROFESSOR_MATERIA
        } else {
            //Adiciona o ID da Tarefa no JSON dos dados
            dadosTarefa.id = idTarefa

            let statusID = await tarefaDAO.mdlSelectByIdTarefa(idTarefa);

            if (statusID) {
                let resultDadosTarefa = await tarefaDAO.mdlUpdateTarefa(dadosTarefa);

                if (resultDadosTarefa) {

                    let dadosTarefaJSON = {};
                    dadosTarefaJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                    dadosTarefaJSON.message = message.SUCCESS_UPDATED_ITEM.message;
                    dadosTarefaJSON.tarefa = dadosTarefa;

                    return dadosTarefaJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER
                }
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    }
}

//Excluir uma tarefa existente filtrando pelo id
const ctlDeletarTarefaPeloID = async function (id) {

    if (id == '' || id == undefined || id == null || isNaN(id)) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let buscarTarefa = await tarefaDAO.mdlSelectByIdTarefa(id);

        if (buscarTarefa == false) {
            return message.ERROR_REGISTER_NOT_FOUND
        } else {
            let tarefa = await tarefaDAO.mdlDeleteTarefa(id)

            if (tarefa) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

module.exports = {
    ctlGetTarefa,
    ctlGetTarefaByID,
    ctlGetBuscarTarefaNome,
    ctlInserirTarefa,
    ctlAtualizarTarefa,
    ctlDeletarTarefaPeloID
}