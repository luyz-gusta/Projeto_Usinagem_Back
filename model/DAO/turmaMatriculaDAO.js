/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados dos TURMA_MATRICULA no Banco de Dados
 * Autor: Luiz Gustavo e Muryllo Vieira
 * Data: 22/05/2023
 * Versão: 1.0
************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllTurmasMatriculas = async () => {
    let sql = `select turma_matricula.id,
    turma.id as id_turma, turma.nome as nome_turma, 
    turma.semestre as semestre_turma, turma.data_inicio as data_inicio_turma, 
    turma.descricao as descricao_turma, date_format(turma.data_conclusao, '%m/%Y') as conclusao_turma,
    matricula.id as id_matricula, matricula.numero as numero_matricula, matricula.id_usuario,
    aluno.id as id_aluno, aluno.nome as nome_aluno
from tbl_turma_matricula as turma_matricula
    inner join tbl_turma as turma 
         on turma.id = turma_matricula.id_turma
     inner join tbl_matricula as matricula
         on matricula.id = turma_matricula.id_matricula
     inner join tbl_aluno as aluno
         on aluno.id = matricula.id_aluno;
    `

    let rsMatriculaTurma = await prisma.$queryRawUnsafe(sql)

    if(rsMatriculaTurma.length > 0){
        return rsMatriculaTurma
    }else{
        return false
    }
}

const mdlSelecTurmasMatriculasByID = async (id) => {
    let sql = `select turma_matricula.id,
    turma.id as id_turma, turma.nome as nome_turma, 
    turma.semestre as semestre_turma, turma.data_inicio as data_inicio_turma, 
    turma.descricao as descricao_turma, date_format(turma.data_conclusao, '%m/%Y') as conclusao_turma,
    matricula.id as id_matricula, matricula.numero as numero_matricula, matricula.id_usuario,
    aluno.id as id_aluno, aluno.nome as nome_aluno
from tbl_turma_matricula as turma_matricula
    inner join tbl_turma as turma 
         on turma.id = turma_matricula.id_turma
     inner join tbl_matricula as matricula
         on matricula.id = turma_matricula.id_matricula
     inner join tbl_aluno as aluno
         on aluno.id = matricula.id_aluno
    where turma_matricula.id = ${id};
    `

    let rsMatriculaTurma = await prisma.$queryRawUnsafe(sql)

    if(rsMatriculaTurma.length > 0){
        return rsMatriculaTurma
    }else{
        return false
    }
}

const mdlSelectMatriculasByIdTurma = async (idTurma) => {
    let sql = `select turma_matricula.id,
        matricula.id as id_matricula, matricula.numero as numero_matricula, matricula.id_usuario,
        aluno.id as id_aluno, aluno.nome as nome_aluno,
        aluno.email as email_pessoal, 
        date_format(aluno.data_nascimento, '%d/%m/%Y') as data_nascimento_aluno,
        aluno.cpf
    from tbl_turma_matricula as turma_matricula
        inner join tbl_turma as turma 
            on turma.id = turma_matricula.id_turma
        inner join tbl_matricula as matricula
            on matricula.id = turma_matricula.id_matricula
        inner join tbl_aluno as aluno
            on aluno.id = matricula.id_aluno
    where turma_matricula.id_turma = ${idTurma};
    `

    let rsMatriculaTurma = await prisma.$queryRawUnsafe(sql)

    if(rsMatriculaTurma.length > 0){
        return rsMatriculaTurma
    }else{
        return false
    }
}

const mdlSelectLastByID = async () => {
    let sql = `select turma_matricula.id,
    turma.id as id_turma, turma.nome as nome_turma, 
    turma.semestre as semestre_turma, turma.data_inicio as data_inicio_turma, 
    turma.descricao as descricao_turma, date_format(turma.data_conclusao, '%m/%Y') as conclusao_turma,
    matricula.id as id_matricula, matricula.numero as numero_matricula, matricula.id_usuario,
    aluno.id as id_aluno, aluno.nome as nome_aluno
from tbl_turma_matricula as turma_matricula
    inner join tbl_turma as turma 
         on turma.id = turma_matricula.id_turma
     inner join tbl_matricula as matricula
         on matricula.id = turma_matricula.id_matricula
     inner join tbl_aluno as aluno
         on aluno.id = matricula.id_aluno
    order by turma_matricula.id desc limit 1;
`

    let rsMatriculaTurma = await prisma.$queryRawUnsafe(sql)

    if(rsMatriculaTurma.length > 0){
        return rsMatriculaTurma
    }else{
        return false
    }
}


const mdlInsertTurmasMatriculas = async (dadosTurmaMatricula) => {
    let sql = `insert into tbl_turma_matricula(
        id_turma, 
        id_matricula
        )values(
            ${dadosTurmaMatricula.id_turma}, 
            ${dadosTurmaMatricula.id_matricula}
        );
    `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

const mdlUpdateTurmaMatricula = async (dadosTurmaMatricula) => {
    let sql = `update tbl_turma_matricula
	    set id_turma = ${dadosTurmaMatricula.id_turma}, 
		    id_matricula = ${dadosTurmaMatricula.id_matricula}
	where id = ${dadosTurmaMatricula.id};
    `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

const mdlDeleteTurmaMatricula = async (id) => {
    let sql = `delete from tbl_turma_matricula where id = ${id}` 

    let resultStatus = await prisma.$queryRawUnsafe(sql)
    
    if(resultStatus){
        return true
    }else{
        return false
    }
}



module.exports = {
    mdlSelectAllTurmasMatriculas,
    mdlSelecTurmasMatriculasByID,
    mdlSelectMatriculasByIdTurma,
    mdlSelectLastByID,
    mdlInsertTurmasMatriculas,
    mdlUpdateTurmaMatricula,
    mdlDeleteTurmaMatricula
}
