/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados dos TAREFA_TURMA_CURSOS_MATERIA_PROFESSOR no Banco de Dados
 * Autor: Luiz Gustavo e Muryllo Vieira
 * Data: 22/05/2023
 * Versão: 1.0
************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllTarefaTurmaCursoMateriaProfessor = async () => {
    let sql = `select tbl_tarefa_turma_curso_materia_professor.id,
        tarefa.id as id_tarefa, tarefa.nome as nome_tarefa,
        tarefa.tempo_previsto as tempo_previsto_tarefa,
        tarefa.numero as numero_tarefa,
        tarefa.foto_peca as foto_peca_tarefa,
        tipo_tarefa.id as id_tipo_tarefa,
        tipo_tarefa.nome as nome_tipo_tarefa
    from tbl_tarefa_turma_curso_materia_professor
        inner join tbl_tarefa as tarefa
            on tarefa.id = tbl_tarefa_turma_curso_materia_professor.id_tarefa
        inner join tbl_tipo_tarefa as tipo_tarefa
            on tipo_tarefa.id = tarefa.id_tipo_tarefa
        inner join tbl_turma_curso_materia_professor
            on tbl_turma_curso_materia_professor.id = tbl_tarefa_turma_curso_materia_professor.id_turma_curso_materia_professor
        inner join tbl_turma as turma
            on turma.id = tbl_turma_curso_materia_professor.id_turma
        inner join tbl_professor as professor 
            on professor.id = tbl_turma_curso_materia_professor.id_professor
        inner join tbl_curso_materia 
            on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
        inner join tbl_curso as curso 
            on tbl_curso_materia.id_curso = curso.id
        inner join tbl_materia as materia
            on tbl_curso_materia.id_materia = materia.id
    `

    let rsDados = await prisma.$queryRawUnsafe(sql)

    if(rsDados.length > 0){
        return rsDados
    }else{
        return false
    }
}

const mdlSelectTarefasByIdTurma = async (idTurma) => {
    let sql = `select tbl_tarefa_turma_curso_materia_professor.id,
        tarefa.id as id_tarefa, tarefa.nome as nome_tarefa,
        tarefa.tempo_previsto as tempo_previsto_tarefa,
        tarefa.numero as numero_tarefa,
        tarefa.foto_peca as foto_peca_tarefa,
        tipo_tarefa.id as id_tipo_tarefa,
        tipo_tarefa.nome as nome_tipo_tarefa,
        curso.id as id_curso,
        turma.id as id_turma,
        professor.id as id_professor,
        materia.id as id_materia,
        tbl_curso_materia.id as id_curso_materia
    from tbl_tarefa_turma_curso_materia_professor
        inner join tbl_tarefa as tarefa
            on tarefa.id = tbl_tarefa_turma_curso_materia_professor.id_tarefa
        inner join tbl_tipo_tarefa as tipo_tarefa
            on tipo_tarefa.id = tarefa.id_tipo_tarefa
        inner join tbl_turma_curso_materia_professor
            on tbl_turma_curso_materia_professor.id = tbl_tarefa_turma_curso_materia_professor.id_turma_curso_materia_professor
        inner join tbl_turma as turma
            on turma.id = tbl_turma_curso_materia_professor.id_turma
        inner join tbl_professor as professor 
            on professor.id = tbl_turma_curso_materia_professor.id_professor
        inner join tbl_curso_materia 
            on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
        inner join tbl_curso as curso 
            on tbl_curso_materia.id_curso = curso.id
        inner join tbl_materia as materia
            on tbl_curso_materia.id_materia = materia.id
    where turma.id = ${idTurma};
    `

    let rsDados = await prisma.$queryRawUnsafe(sql)

    if(rsDados.length > 0){
        return rsDados
    }else{
        return false
    }
}

const mdlSelectTarefasByIdTurmaAndIdProfessor = async (idTurma, idProfessor) => {
    let sql = `select tbl_tarefa_turma_curso_materia_professor.id,
        tarefa.id as id_tarefa, tarefa.nome as nome_tarefa,
        tarefa.tempo_previsto as tempo_previsto_tarefa,
        tarefa.numero as numero_tarefa,
        tarefa.foto_peca as foto_peca_tarefa,
        tipo_tarefa.id as id_tipo_tarefa,
        tipo_tarefa.nome as nome_tipo_tarefa,
        curso.id as id_curso,
        turma.id as id_turma,
        professor.id as id_professor,
        materia.id as id_materia,
        tbl_curso_materia.id as id_curso_materia
    from tbl_tarefa_turma_curso_materia_professor
        inner join tbl_tarefa as tarefa
            on tarefa.id = tbl_tarefa_turma_curso_materia_professor.id_tarefa
        inner join tbl_tipo_tarefa as tipo_tarefa
            on tipo_tarefa.id = tarefa.id_tipo_tarefa
        inner join tbl_turma_curso_materia_professor
            on tbl_turma_curso_materia_professor.id = tbl_tarefa_turma_curso_materia_professor.id_turma_curso_materia_professor
        inner join tbl_turma as turma
            on turma.id = tbl_turma_curso_materia_professor.id_turma
        inner join tbl_professor as professor 
            on professor.id = tbl_turma_curso_materia_professor.id_professor
        inner join tbl_curso_materia 
            on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
        inner join tbl_curso as curso 
            on tbl_curso_materia.id_curso = curso.id
        inner join tbl_materia as materia
            on tbl_curso_materia.id_materia = materia.id
    where turma.id = ${idTurma} and professor.id = ${idProfessor};
    `

    let rsDados = await prisma.$queryRawUnsafe(sql)

    if(rsDados.length > 0){
        return rsDados
    }else{
        return false
    }
}


module.exports = {
    mdlSelectAllTarefaTurmaCursoMateriaProfessor,
    mdlSelectTarefasByIdTurma,
    mdlSelectTarefasByIdTurmaAndIdProfessor
}
