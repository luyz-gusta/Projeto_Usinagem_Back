/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de RESULTADO DESEJADO
 *  Autor: Luiz e Muryllo e Millena
 *  Data: 09/06/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import do arquivo DAO para acessar dados da Registro de Tempo no BD
var resultadoDesejadoDAO = require('../model/DAO/resultadoDesejadoDAO.js')
var criterioDAO = require('../model/DAO/criterioDAO.js')
var controllerMargemErro = require('./controller_margem-erro.js')


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

            for (let index = 0; index < dadosResultadoDesejado.length; index++) {
                let dadosMargemErro = await controllerMargemErro.ctlGetMargemErroIDResultadoDesejado(dadosResultadoDesejado[index].id)

                dadosResultadoDesejado[index].margem_erro = dadosMargemErro.margem_erro
            }

            if (dadosResultadoDesejado) {
                dadosResultadoDesejadoJSON.status = message.SUCCESS_REQUEST.status;
                dadosResultadoDesejadoJSON.message = message.SUCCESS_REQUEST.message;
                dadosResultadoDesejadoJSON.quantidade = dadosResultadoDesejado.length;
                dadosResultadoDesejadoJSON.resultado_desejado = dadosResultadoDesejado
                return dadosResultadoDesejadoJSON
            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        } else {
            return message.ERROR_INVALID_ID_CRITERIO
        }
    }
}

//Retorna um registro de Resultado Desejado filtrado pelo ID
const ctlGetResultadoDesejadoByID = async function (id) {

    let idNumero = id

    //Validação do ID
    if (idNumero == '' || idNumero == undefined || isNaN(idNumero)) {
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

//Retorna um registro de Resultado Desejado filtrado pelo ID
const ctlGetResultadoDesejadoByValor = async function (valor) {

    let valorNumero = valor

    //Validação do ID
    if (valorNumero == '' || valorNumero == undefined) {
        return message.ERROR_INVALID_VALOR
    } else {
        let dadosResultadoDesejadoJSON = {}

        let dadosResultadoDesejado = await resultadoDesejadoDAO.mdlSelectResultadoDesejadoByValor(valorNumero)

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

//Inserir uma nova ResultadoDesejado
const ctlInserirResultadoDesejado = async function (dadosResultadoDesejado) {

    let resultDadosResultadoDesejado;

    if (dadosResultadoDesejado.valor == '' || dadosResultadoDesejado.valor == undefined ||
        dadosResultadoDesejado.id_criterio == '' || dadosResultadoDesejado.id_criterio == undefined || isNaN(dadosResultadoDesejado.id_criterio)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificacaoCriteiro = await criterioDAO.mdlSelectCriterioByID(dadosResultadoDesejado.id_criterio)

        if (verificacaoCriteiro == false) {
            return message.ERROR_INVALID_ID_CRITERIO
        } else {
            //Envia os dados para a model inserir no Banco de Dados
            resultDadosResultadoDesejado = await resultadoDesejadoDAO.mdlInsertResultadoDesejado(dadosResultadoDesejado);

            //Valida de o banco de dados inseriu corretamente os dados
            if (resultDadosResultadoDesejado) {

                //Chama a função que vai encontrar o ID gerado após o insert
                let novoResultadoDesejado = await resultadoDesejadoDAO.mdlSelectLastId();

                let dadosResultadoDesejadosJSON = {};
                dadosResultadoDesejadosJSON.status = message.SUCCESS_CREATED_ITEM.status;
                dadosResultadoDesejadosJSON.message = message.SUCCESS_CREATED_ITEM.message;
                dadosResultadoDesejadosJSON.resultado_desejado = novoResultadoDesejado;
                return dadosResultadoDesejadosJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

//Atualizar uma ResultadoDesejado
const ctlAtualizarResultadoDesejado = async function (dadosResultadoDesejado, idResultadoDesejado) {

    if (dadosResultadoDesejado.valor == '' || dadosResultadoDesejado.valor == undefined ||
        dadosResultadoDesejado.id_criterio == '' || dadosResultadoDesejado.id_criterio == undefined || isNaN(dadosResultadoDesejado.id_criterio)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else if (idResultadoDesejado == '' || idResultadoDesejado == undefined || isNaN(idResultadoDesejado)) {
        return message.ERROR_INVALID_ID
    } else {
        let verificacaoCriteiro = await criterioDAO.mdlSelectCriterioByID(dadosResultadoDesejado.id_criterio)

        if (verificacaoCriteiro == false) {
            return message.ERROR_INVALID_ID_CRITERIO
        } else {
            //Adiciona o ID da ResultadoDesejado no JSON dos dados
            dadosResultadoDesejado.id = idResultadoDesejado

            let statusID = await resultadoDesejadoDAO.mdlSelectResultadoDesejadoByID(idResultadoDesejado);

            if (statusID) {
                let resultDadosResultadoDesejado = await resultadoDesejadoDAO.mdlUpdateResultadoDesejado(dadosResultadoDesejado);

                if (resultDadosResultadoDesejado) {

                    let dadosResultadoDesejadoJSON = {};
                    dadosResultadoDesejadoJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                    dadosResultadoDesejadoJSON.message = message.SUCCESS_UPDATED_ITEM.message;
                    dadosResultadoDesejadoJSON.resultado_desejado = dadosResultadoDesejado;

                    return dadosResultadoDesejadoJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER
                }
            } else {
                return message.ERROR_REGISTER_NOT_FOUND;
            }
        }
    }
}

//Excluir um resultado desejado existente filtrando pelo id
const ctlDeletarResultadoDesejado = async function (id) {

    if (id == '' || id == undefined || id == null || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let buscarResultadoDesejado = await resultadoDesejadoDAO.mdlSelectResultadoDesejadoByID(id);

        if (buscarResultadoDesejado == false) {
            return message.ERROR_REGISTER_NOT_FOUND
        } else {
            let ResultadoDesejado = await resultadoDesejadoDAO.mdlDeleteResultadoDesejado(id)

            if (ResultadoDesejado) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

module.exports = {
    ctlGetResultadoDesejado,
    ctlGetResultadoDesejadoByIdCriterio,
    ctlGetResultadoDesejadoByID,
    ctlGetResultadoDesejadoByValor,
    ctlInserirResultadoDesejado,
    ctlAtualizarResultadoDesejado,
    ctlDeletarResultadoDesejado
}