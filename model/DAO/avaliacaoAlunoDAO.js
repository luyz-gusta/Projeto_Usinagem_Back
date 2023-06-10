/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de TRUMAS
 *  Autor: Luiz, Muryllo e Millena
 *  Data: 09/06/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

const mdlInsertAvaliacaoAluno = async function (dadosAvaliacaoAluno) {
    let sql = `insert into tbl_avaliacao_aluno (
        nota,
        valor_obtido,
        id_matricula,
        id_criterio
        ) values (
        ${dadosAvaliacaoAluno.nota},
        '${dadosAvaliacaoAluno.valor_obtido}',
        '${dadosAvaliacaoAluno.id_matricula}',
        '${dadosAvaliacaoAluno.id_criterio}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

const mdlUpdateAvaliacaoAluno = async function (dadosAvaliacaoAluno) {
    let sql = `update tbl_avaliacao_aluno set
                    nota = ${dadosAvaliacaoAluno.nota},
                    valor_obtido = '${dadosAvaliacaoAluno.valor_obtido}',
                    id_matricula = '${dadosAvaliacaoAluno.id_matricula}',
                    id_criterio = '${dadosAvaliacaoAluno.id_criterio}'
                where id = ${dadosAvaliacaoAluno.id}`

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const mdlDeleteAvaliacaoAluno = async function (id) {
    let idAvaliacaoAluno = id;

    let sql = `delete from tbl_avaliacao_aluno where id = ${idAvaliacaoAluno}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const mdlSelectAllAvaliacoesAlunos = async function () {

    let sql = `select * from tbl_avaliacao_aluno`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false;
    }
}

const mdlSelectAvaliacaoAlunoByID = async function (id) {

    let sql = `select * from tbl_avaliacao_aluno where id = ${id}`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

const mdlSelectLastId = async function () {
    let sql = `select * from tbl_avaliacao_aluno order by id desc limit 1;`

    let rsAvaliacaoAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacaoAluno.length > 0)
        return rsAvaliacaoAluno
    else
        return false
}

module.exports = {
    mdlInsertAvaliacaoAluno,
    mdlUpdateAvaliacaoAluno,
    mdlDeleteAvaliacaoAluno,
    mdlSelectAllAvaliacoesAlunos,
    mdlSelectAvaliacaoAlunoByID,
    mdlSelectLastId
}