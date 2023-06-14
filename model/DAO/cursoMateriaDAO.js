/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados de CURSO_MATERIAS no Banco de Dados
 * Autor: Luiz Gustavo e Muryllo Vieira e Millena
 * Data: 09/06/2023
 * Versão: 1.0
************************************************************************************************/

/**
    //$queryRawUnsafe( ) -> Permite interpretar uma variavel como sendo um scriptSQL
    //$queryRaw( ) -> Esse executa o comando dentro de aspas e não podendo interpretar uma variavel
*/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

//Retorna a lista de todos as materias
const mdlSelectAllCursoMateria = async function () {

    //Script para buscar todos os itens no BD
    let sql = `SELECT
                tbl_curso_materia.id,
                tbl_curso_materia.id_curso,
                tbl_curso.id AS id_curso,
                tbl_curso.nome AS nome_curso,
                tbl_curso.carga_horaria AS carga_horaria_curso,
                tbl_curso.sigla AS sigla_curso,
                tbl_curso_materia.id_materia,
                tbl_materia.id AS id_materia,
                tbl_materia.nome AS nome_materia,
                tbl_materia.carga_horaria AS carga_horaria_materia,
                tbl_materia.sigla AS sigla_materia,
                tbl_materia.descricao AS descricao_materia
            FROM
                tbl_curso
                INNER JOIN tbl_curso_materia ON tbl_curso.id = tbl_curso_materia.id_curso
                INNER JOIN tbl_materia ON tbl_materia.id = tbl_curso_materia.id_materia;`;

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_curso_materia') - permite interpretar o scriptSQL direto no metodo
    let rsCursoMateria = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsCursoMateria.length > 0) {
        return rsCursoMateria
    } else {
        return false;
    }
}

const mdlSelectCursoMateriaByID = async function (id) {
    let sql = `select * from tbl_curso_materia where id = ${id}`;

    let rsTurmaMateria = await prisma.$queryRawUnsafe(sql);

    if (rsTurmaMateria.length > 0) {
        return rsTurmaMateria;
    }
    else {
        return false;
    }
}

const mdlInsertCursoMateria = async function (dadosCursoMateria) {
    let sql = `insert into tbl_curso_materia (
        id_curso,
        id_materia
    ) values (
        ${dadosCursoMateria.id_curso},
        ${dadosCursoMateria.id_materia}
    )`
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}


const mdlUpdateCursoMateria = async function (dadosCursoMateria) {
    let sql = `update tbl_curso_materia set
                    id_curso = ${dadosCursoMateria.id_curso},
                    id_materia = ${dadosCursoMateria.id_materia}
                where id = ${dadosCursoMateria.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}


const mdlDeleteCursoMateria = async function (id) {
    let idCursoMateria = id;

    let sql = `delete from tbl_curso_materia where id = ${idCursoMateria}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}


//Retorna o ultimo id inserido no BD
const mdlSelectLastId = async function () {

    let sql = 'select * from tbl_curso_materia order by id desc limit 1'

    let rsCursoMateria = await prisma.$queryRawUnsafe(sql);

    if (rsCursoMateria.length > 0) {
        return rsCursoMateria;
    } else {
        return false;
    }

}

module.exports = {
    mdlInsertCursoMateria,
    mdlSelectLastId,
    mdlUpdateCursoMateria,
    mdlSelectCursoMateriaByID,
    mdlSelectAllCursoMateria,
    mdlDeleteCursoMateria
}