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
var turmaCursoMateriaProfDAO = require('../model/DAO/turmaCursoMateriaProfDAO.js')
var controllerProfessor = require('./controller_professor.js')
var controllerTurma = require('./controller_turmas.js')
var controllerCursoMateria = require('./controller_curso-materia.js')

/***************Funções***************/
const pegarTurmas = async (idProfessor) => {
    const dadosTurmas = await turmaCursoMateriaProfDAO.mdlGetTurmasByIdProfessor(idProfessor)

    const arrayDados = ['Inicializador']

    if(dadosTurmas){
        dadosTurmas.map(async turma => {
            let status = false
            for (let i = 0; i < arrayDados.length; i++) {
                if (arrayDados[i].id_turma == turma.id_turma) {
                    status = true
                }
            }

            if (status == false) {
                arrayDados.push(turma)
            }
        })

        arrayDados.shift()
        console.log(arrayDados);

        return arrayDados
    }else{
        return false
    }
}

const pegarMaterias = async (idProfessor) => {
    const dadosMateria = await turmaCursoMateriaProfDAO.mdlGetMateriasByIdProfessor(idProfessor)

    const arrayDados = ['Inicializador']

    if(dadosMateria){
        dadosMateria.map(async materia => {
            let status = false
            for (let i = 0; i < arrayDados.length; i++) {
                if (arrayDados[i].id_materia == materia.id_materia) {
                    status = true
                }
            }

            if (status == false) {
                arrayDados.push(materia)
            }
        })

        arrayDados.shift()
        console.log(arrayDados);

        return arrayDados
    }else{
        return false
    }
}

const pegarTarefas = async (idProfessor) => {
    const dadosTarefa = await turmaCursoMateriaProfDAO.mdlGetTarefasByIdProfessor(idProfessor)

    const arrayDados = ['Inicializador']

    if(dadosTarefa){
        dadosTarefa.map(async tarefa => {
            let status = false
            for (let i = 0; i < arrayDados.length; i++) {
                if (arrayDados[i].id_tarefa == tarefa.id_tarefa) {
                    status = true
                }
            }

            if (status == false) {
                arrayDados.push(tarefa)
            }
        })

        arrayDados.shift()
        console.log(arrayDados);

        return arrayDados
    }else{
        return false
    }
}

//Retorna todos os cursos
const ctlGetTurmaCursoMateriaProf = async () => {
    let dadosJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
    let dados = await turmaCursoMateriaProfDAO.mdlSelectAllTurmaCursoMateriaProf()

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

const ctlGetInformacoesTurmaCursoMateriaProfPeloIdProfessor = async (idProfessor) => {
    let dadosJSON = {}

    if (idProfessor == null || idProfessor == undefined || idProfessor == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else if (isNaN(idProfessor)) {
        return message.ERROR_INVALID_ID
    } else {
        let verificacaoProfessor = await controllerProfessor.ctlGetBuscarProfessorID(idProfessor)

        if (verificacaoProfessor.status == 200) {

            //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
            let dados = await controllerProfessor.ctlGetBuscarProfessorID(idProfessor)

            if (dados) {
                dados.professores[0].tarefas = await pegarTarefas(idProfessor)
                dados.professores[0].turmas = await pegarTurmas(idProfessor)
                dados.professores[0].materias = await pegarMaterias(idProfessor)

                dadosJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    dados: dados.professores
                }
                return dadosJSON
            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        } else {
            return message.ERROR_INVALID_ID_PROFESSOR
        }
    }
}

//Retorna os dados filtrando pelo id do Professor
const ctlGetTurmaCursoMateriaProfPeloIdProfessor = async (idProfessor) => {
    let dadosJSON = {}

    if (idProfessor == null || idProfessor == undefined || idProfessor == '') {
        return message.ERROR_REQUIRE_FIELDS
    } else if (isNaN(idProfessor)) {
        return message.ERROR_INVALID_ID
    } else {
        let verificacaoProfessor = await controllerProfessor.ctlGetBuscarProfessorID(idProfessor)

        if (verificacaoProfessor.status == 200) {

            //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
            let dados = await turmaCursoMateriaProfDAO.mdlSelectTurmaCursoMateriaProfByIdProfessor(idProfessor)

            if (dados) {

                const arrayDados = [{curso: ''}]

                dados.map(async dado => {
                    let status = false

                    console.log(dado);
                    for (let i = 0; i < arrayDados.length; i++) {
                        if (arrayDados[i].curso.id_curso == dado.id_curso) {
                            status = true
                            console.log('teste');
                        }
                    }

                    if (status == false) {
                        let dadoJSON = {
                            id: dado.id,
                            curso:{
                                id_curso: dado.id_curso,
                                nome: dado.nome_curso,
                                sigla: dado.sigla_curso,
                                descricao: dado.descricao_curso,
                                carga_horaria: dado.carga_horaria_curso
                            },
                            professor: {
                                id_professor: dado.id_professor,
                                nome: dado.nome_professor,
                                telefone: dado.telefone_professor
                            }
                        }
                        arrayDados.push(dadoJSON)
                    }
                })

                arrayDados.shift()

                dadosJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    quantidade: arrayDados.length,
                    dados: arrayDados
                }
                return dadosJSON
            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        } else {
            return message.ERROR_INVALID_ID_PROFESSOR
        }
    }
}

//Retorna os dados filtrando pelo id do Professor
const ctlGetTurmaCursoMateriaProfPeloIdProfessorEIdCurso = async (idProfessor, idCurso) => {
    let dadosJSON = {}

    if (
        idProfessor == null || idProfessor == undefined || idProfessor == '' ||
        idCurso == null || idCurso == undefined || idCurso == ''
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else if (isNaN(idProfessor) || isNaN(idCurso)) {
        return message.ERROR_INVALID_ID
    } else {
        let verificacaoProfessor = await controllerProfessor.ctlGetBuscarProfessorID(idProfessor)
        let verificacaoCurso = await controllerTurma.ctlGetTurmasIDCurso(idCurso)

        if (verificacaoProfessor.status != 200) {
            return message.ERROR_INVALID_ID_PROFESSOR
        } else if (verificacaoCurso.status != 200) {
            return message.ERROR_INVALID_ID_TURMA_CURSO
        } else {
            //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
            let dados = await turmaCursoMateriaProfDAO.mdlSelectTurmaCursoMateriaProfByIdProfessorAndIdCurso(idProfessor, idCurso)

            if (dados) {
                const arrayDados = ['Inicializador']

                dados.map(async dado => {
                    let status = false

                    for (let i = 0; i < arrayDados.length; i++) {
                        if (arrayDados[i].id_turma == dado.id_turma) {
                            status = true
                        }
                    }

                    if (status == false) {
                        arrayDados.push(dado)
                    }
                })

                arrayDados.shift()

                dadosJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    quantidade: arrayDados.length,
                    dados: arrayDados
                }
                return dadosJSON
            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        }
    }
}

//Retorna os dados filtrando pelo id do Professor
const ctlGetTurmaCursoMateriaProfPeloIdProfessorEIdTurma = async (idProfessor, idTurma) => {
    let dadosJSON = {}

    if (
        idProfessor == null || idProfessor == undefined || idProfessor == '' ||
        idTurma == null || idTurma == undefined || idTurma == ''
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else if (isNaN(idProfessor) || isNaN(idTurma)) {
        return message.ERROR_INVALID_ID
    } else {
        let verificacaoProfessor = await controllerProfessor.ctlGetBuscarProfessorID(idProfessor)
        let verificacaoTurma = await controllerTurma.ctlGetTurmasID(idTurma)

        if (verificacaoProfessor.status != 200) {
            return message.ERROR_INVALID_ID_PROFESSOR
        } else if (verificacaoTurma.status != 200) {
            return message.ERROR_INVALID_ID_TURMA
        } else {
            //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
            let dados = await turmaCursoMateriaProfDAO.mdlSelectTurmaCursoMateriaProfByIdProfessorAndIdTurma(idProfessor, idTurma)

            if (dados) {
                const arrayDados = ['Inicializador']

                dados.map(async dado => {
                    let status = false

                    for (let i = 0; i < arrayDados.length; i++) {
                        if (arrayDados[i].id_materia == dado.id_materia) {
                            status = true
                        }
                    }

                    if (status == false) {
                        arrayDados.push(dado)
                    }
                })

                arrayDados.shift()

                dadosJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    quantidade: arrayDados.length,
                    dados: arrayDados
                }
                return dadosJSON
            } else {
                return message.ERROR_REGISTER_NOT_FOUND
            }
        }
    }
}

const ctlInserirTurmaCursoMateriaProf = async (dados) => {
    if (
        dados.id_turma == null || dados.id_turma == '' || dados.id_turma == undefined ||
        dados.id_curso_materia == null || dados.id_curso_materia == '' || dados.id_curso_materia == undefined ||
        dados.id_professor == null || dados.id_professor == '' || dados.id_professor == undefined
    ) {
        
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificacaoProfessor = await controllerProfessor.ctlGetBuscarProfessorID(dados.id_professor)
        let verificacaoTurma = await controllerTurma.ctlGetTurmasID(dados.id_turma)
        let verificacaoCursoMateria = await controllerCursoMateria.ctlGetCursoMateriaByID(dados.id_curso_materia)

        console.log(dados.id_turma,  dados.id_professor,  dados.id_curso_materia);
        if (verificacaoProfessor.status != 200) {
            return message.ERROR_INVALID_ID_PROFESSOR
        } else if (verificacaoTurma.status != 200) {
            return message.ERROR_INVALID_ID_TURMA
        } else if (verificacaoCursoMateria.status != 200) {
            return message.ERROR_INVALID_ID_CURSO_MATERIA
        } else {
            let resultDados = await turmaCursoMateriaProfDAO.mdlInsertTurmaCursoMateriaProf(dados)

            if (resultDados) {
                let novoDado = await turmaCursoMateriaProfDAO.mdlSelectLastByID()

                let dadosJSON = {
                    status: message.SUCCESS_CREATED_ITEM.status,
                    message: message.SUCCESS_CREATED_ITEM.message,
                    dados: novoDado
                }
                return dadosJSON
            }else{
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

module.exports = {
    ctlGetTurmaCursoMateriaProf,
    ctlGetTurmaCursoMateriaProfPeloIdProfessor,
    ctlGetTurmaCursoMateriaProfPeloIdProfessorEIdCurso,
    ctlGetTurmaCursoMateriaProfPeloIdProfessorEIdTurma,
    ctlGetInformacoesTurmaCursoMateriaProfPeloIdProfessor,
    ctlInserirTurmaCursoMateriaProf
}