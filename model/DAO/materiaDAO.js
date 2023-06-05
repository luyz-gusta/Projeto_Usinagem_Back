/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados de MATERIAS no Banco de Dados
 * Autor: Luiz Gustavo e Muryllo Vieira
 * Data: 22/05/2023
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

//Inserir dados de materia no Banco de dados
const mdlInsertMateria = async function (dadosMateria) {
    let sql = `insert into tbl_materia(
                                    nome, 
                                    carga_horaria,
                                    sigla, 
                                    descricao, 
                                    id_curso
                                ) values (
                                    '${dadosMateria.nome}', 
                                    '${dadosMateria.carga_horaria}', 
                                    '${dadosMateria.sigla}', 
                                    '${dadosMateria.descricao}',
                                    '${dadosMateria.id_curso}');`

    //Executa o scriptSQL no banco de dados
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Atualizar uma materia existente 
const mdlUpdateMateria = async function (dadosMateria) {
    let sql = `update tbl_materia
    set nome = '${dadosMateria.nome}',
        carga_horaria = '${dadosMateria.carga_horaria}',
        sigla = '${dadosMateria.sigla}',
        descricao = '${dadosMateria.descricao}',
        id_curso = ${dadosMateria.id_curso}
    where id = ${dadosMateria.id};
    `
    //Executa o scriptSQL no banco de dados
    console.log(sql);
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Excluir uma materia existente
const mdlDeleteMateria = async function (id) {

    let sql = `delete from tbl_materia where id = ${id}` 

    let resultStatus = await prisma.$queryRawUnsafe(sql)
    
    if(resultStatus){
        return true
    }else{
        return false
    }

}

//Retorna a lista de todos as materias
const mdlSelectAllMaterias = async function () {

    //Script para buscar todos os itens no BD
    let sql = `select * from tbl_materia`;

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_materia') - permite interpretar o scriptSQL direto no metodo
    let rsMateria = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsMateria.length > 0) {
        return rsMateria
    } else {
        return false;
    }
}

//Retorna a materia filtrando pelo ID
const mdlSelectByIdMateria = async function (id) {

    let idMateria = id

    //Script para buscar uma materia filtrando pelo ID
    let sql = `select * from tbl_materia where id = ${idMateria}`;

    //console.log(sql);
    let rsMateria = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsMateria.length > 0) {
        return rsMateria
    } else {
        return false;
    }
}

//Retorna a materia filtrando pelo nome
const mdlSelectByNameMateria = async function (nome) {

    let nameMateria = nome

    //Script para buscar uma materia filtrando pelo ID
    let sql = `select * from tbl_materia where nome like '%${nameMateria}%'`;

    let rsMateria = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsMateria.length > 0) {
        return rsMateria
    } else {
        return false;
    }

}

//Retorna a materia filtrando pelo sigla
const mdlSelectBySiglaMateria = async function (sigla) {

    let siglaMateria = sigla

    //Script para buscar uma materia filtrando pelo ID
    let sql = `select * from tbl_materia where sigla like '%${siglaMateria}%'`;

    let rsMateria = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsMateria.length > 0) {
        return rsMateria
    } else {
        return false;
    }

}

//Retorna o ultimo id inserido no BD
const mdlSelectLastId = async function () {

    let sql = 'select * from tbl_materia order by id desc limit 1'

    let rsMateria = await prisma.$queryRawUnsafe(sql);

    if (rsMateria.length > 0) {
        return rsMateria;
    } else {
        return false;
    }

}

module.exports = {
    mdlSelectAllMaterias,
    mdlSelectByIdMateria,
    mdlInsertMateria,
    mdlSelectLastId,
    mdlSelectByNameMateria,
    mdlSelectBySiglaMateria,
    mdlUpdateMateria,
    mdlDeleteMateria
}