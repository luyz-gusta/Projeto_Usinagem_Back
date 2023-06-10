/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de CURSO_MATERIA
 *  Autor: Luiz e Muryllo e Millena
 *  Data: 09/06/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import do arquivo DAO para acessar dados da materia no BD
var materiaDAO = require('../model/DAO/materiaDAO.js')

var cursoMateriaDAO = require('../model/DAO/cursoMateriaDAO.js')
var controllerCurso = require('./controller_curso.js')
var controllerMateria = require('./controller_materia.js')

var cursoDAO = require('../model/DAO/cursoDAO.js')

var message = require('./modulo/config.js')

const ctlInserirCursoMateria = async function (dadosCursoMateria) {
    if (
        dadosCursoMateria.id_curso == undefined || dadosCursoMateria.id_curso == '' || isNaN(dadosCursoMateria.id_curso) ||
        dadosCursoMateria.id_materia == undefined || dadosCursoMateria.id_materia == '' || isNaN(dadosCursoMateria.id_materia)
    ) {
        return message.ERROR_REGISTER_NOT_FOUND
    } else {
        let verificacaoMateria = await materiaDAO.mdlSelectByIdMateria(dadosCursoMateria.id_materia)
        let verificacaoCurso = await cursoDAO.mdlSelectCursoByID(dadosCursoMateria.id_curso)

        if (verificacaoMateria == false || verificacaoCurso == false) {
            return message.ERROR_INVALID_ID_MATERIA_CURSO
        } else {
            let resultDados = await cursoMateriaDAO.mdlInsertCursoMateria(dadosCursoMateria)

            if (resultDados) {
                let novoCursoMateria = await cursoMateriaDAO.mdlSelectLastId()

                let dadosJSON = {}
                dadosJSON.status = message.SUCCESS_CREATED_ITEM.status
                dadosJSON.curso_materia = novoCursoMateria

                return dadosJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}


const ctlAtualizarCursoMateria = async function (dadosCursoMateria, idCursoMateria) {
    if (
        dadosCursoMateria.id_curso == undefined || dadosCursoMateria.id_curso == '' || isNaN(dadosCursoMateria.id_curso) ||
        dadosCursoMateria.id_materia == undefined || dadosCursoMateria.id_materia == '' || isNaN(dadosCursoMateria.id_materia)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else if (idCursoMateria == '' || idCursoMateria == undefined || idCursoMateria == isNaN(idCursoMateria)) {
        return message.ERROR_INVALID_ID
    } else {
        let verificacaoMateria = await materiaDAO.mdlSelectByIdMateria(dadosCursoMateria.id_materia)
        let verificacaoCurso = await cursoDAO.mdlSelectCursoByID(dadosCursoMateria.id_curso)

        if (verificacaoMateria == false || verificacaoCurso == false) {
            return message.ERROR_INVALID_ID_MATERIA_CURSO
        } else {

            dadosCursoMateria.id = idCursoMateria;

            let statusId = await cursoMateriaDAO.mdlSelectCursoMateriaByID(idCursoMateria)

            if (statusId) {

                let resultDadosCursoMateria = await cursoMateriaDAO.mdlUpdateCursoMateria(dadosCursoMateria);

                if (resultDadosCursoMateria) {

                    let dadosJSON = {}

                    dadosJSON.status = message.SUCCESS_UPDATED_ITEM.status
                    dadosJSON.message = message.SUCCESS_UPDATED_ITEM.message
                    dadosJSON.curso_materia = dadosCursoMateria
                    return dadosJSON
                } else
                    return message.ERROR_INTERNAL_SERVER

            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        }
    }

}

const ctlDeletarCursoMateria = async function (idCursoMateria) {

    let statusId = await cursoMateriaDAO.mdlSelectCursoMateriaByID(idCursoMateria)

    if (statusId) {
        if (idCursoMateria == '' || idCursoMateria == undefined || isNaN(idCursoMateria)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDados = await cursoMateriaDAO.mdlDeleteCursoMateria(idCursoMateria)

            if (resultDados) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}


const ctlGetCursoMateria = async function () {

    let dadosCursoMateriaJSON = {}

    let dadosCursoMateria = await cursoMateriaDAO.mdlSelectAllCursoMateria()

    if (dadosCursoMateria) {
        const dados = dadosCursoMateria.map(async curso_materia => {
            let dadosCurso = await controllerCurso.ctlGetCursosID(curso_materia.id_curso)
            let dadosMateria = await controllerMateria.ctlGetBuscarMateriaIdCurso(curso_materia.id_materia)
            let curso = dadosCurso.cursos
            curso[0].materias = dadosMateria.materias
            console.log(dadosMateria.materias);
            return await curso
        });

        let arrayMaterias = await Promise.all(dados)

        dadosCursoMateriaJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosCursoMateria.length,
            materias: arrayMaterias
        }
        return dadosCursoMateriaJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}


//Retorna um registro de CursoMateria filtrada pelo ID
const ctlGetCursoMateriaByID = async function (id) {

    let idNumero = id

    //Validação do ID
    if (idNumero == '' || id == undefined || isNaN(idNumero)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosCursoMateriaJSON = {}

        let dadosCursoMateria = await cursoMateriaDAO.mdlSelectCursoMateriaByID(idNumero)

        if (dadosCursoMateria) {
            //Criando um JSON com o atributo CursoMateria, para encaminhar um array de CursoMaterias
            dadosCursoMateriaJSON.status = message.SUCCESS_REQUEST.status;
            dadosCursoMateriaJSON.message = message.SUCCESS_REQUEST.message;
            dadosCursoMateriaJSON.curso_materia = dadosCursoMateria
            return dadosCursoMateriaJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
}

module.exports = {
    ctlAtualizarCursoMateria,
    ctlInserirCursoMateria,
    ctlGetCursoMateria,
    ctlDeletarCursoMateria,
    ctlGetCursoMateriaByID
}
