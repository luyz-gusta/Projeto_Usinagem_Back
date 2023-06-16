/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de AVALIACAO_PROFESSOR
 *  Autor: Luiz, Muryllo e Millena
 *  Data: 10/06/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

const mdlInsertAvaliacaoProfessor = async function (dadosAvaliacaoProfessor) {
    let sql = `insert into tbl_avaliacao_professor (
        valor,
        id_professor,
        id_avaliacao_aluno
        ) values (
        ${dadosAvaliacaoProfessor.valor},
        ${dadosAvaliacaoProfessor.id_professor},
        ${dadosAvaliacaoProfessor.id_avaliacao_aluno}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

const mdlUpdateAvaliacaoProfessor = async function (dadosAvaliacaoProfessor) {
    let sql = `update tbl_avaliacao_professor set
                    valor = ${dadosAvaliacaoProfessor.valor},
                    id_professor = ${dadosAvaliacaoProfessor.id_professor},
                    id_avaliacao_aluno = ${dadosAvaliacaoProfessor.id_avaliacao_aluno}
                where id = ${dadosAvaliacaoProfessor.id}`

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const mdlDeleteAvaliacaoProfessor = async function (id) {
    let idAvaliacaoProfessor = id;

    let sql = `delete from tbl_avaliacao_professor where id = ${idAvaliacaoProfessor}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const mdlSelectAllAvaliacoesProfessor = async function () {

    let sql = `select * from tbl_avaliacao_professor`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false;
    }
}

const mdlSelectAvaliacaoProfessorByID = async function (id) {

    let sql = `select * from tbl_avaliacao_professor where id = ${id}`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

const mdlSelectLastId = async function () {
    let sql = `select * from tbl_avaliacao_professor order by id desc limit 1;`

    let rsAvaliacaoAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacaoAluno.length > 0)
        return rsAvaliacaoAluno
    else
        return false
}

module.exports = {
    mdlInsertAvaliacaoProfessor,
    mdlUpdateAvaliacaoProfessor,
    mdlDeleteAvaliacaoProfessor,
    mdlSelectAllAvaliacoesProfessor,
    mdlSelectAvaliacaoProfessorByID,
    mdlSelectLastId
}