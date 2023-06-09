/************************************************************************************************
 * Objetivo: Responsável pela manipulação de dados dos MARGEM ERRO no Banco de Dados
 * Autor: Luiz Gustavo, Muryllo Vieira e Millena Ferreira
 * Data: 09/06/2023
 * Versão: 1.0
************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

//Inserir dados do MargemErro no Banco de dados
const mdlInsertMargemErro = async function (dadosMargemErro) {
    let sql = `insert into tbl_margem_erro(
                                        minimo,
                                        maximo,
                                        id_resultado_desejado
                                        )values(
                                            '${dadosMargemErro.minimo}', 
                                            '${dadosMargemErro.maximo}', 
                                            ${dadosMargemErro.id_resultado_desejado}
                                        );`

    //Executa o scriptSQL no banco de dados
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Atualizar um MargemErro existente 
const mdlUpdateMargemErro = async function (dadosMargemErro) {
    let sql = `update tbl_margem_erro
                        set minimo = '${dadosMargemErro.minimo}',
                            maximo = '${dadosMargemErro.maximo}',
                            id_resultado_desejado = ${dadosMargemErro.id_resultado_desejado}
                    where id = ${dadosMargemErro.id};`


    //Executa o scriptSQL no banco de dados
    console.log(sql);
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Excluir um MargemErro existente
const mdlDeleteMargemErro = async function (id) {

    let sql = `delete from tbl_margem_erro where id = ${id}`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Retorna a lista de todos os MargemErro
const mdlSelectAllMargemErro = async function () {

    let sql = `select * from tbl_margem_erro`;

    let rsMargemErro = await prisma.$queryRawUnsafe(sql)

    if (rsMargemErro.length > 0) {
        return rsMargemErro
    } else {
        return false;
    }
}


//Retorna o MargemErro filtrando pelo ID
const mdlSelectByIdMargemErro = async function (id) {
    let idMargemErro = id

    let sql = `select * from tbl_margem_erro where id = ${idMargemErro}`;

    //console.log(sql);
    let rsMargemErro = await prisma.$queryRawUnsafe(sql)

    if (rsMargemErro.length > 0) {
        return rsMargemErro
    } else {
        return false;
    }
}

//Retorna o ultimo id inserido no BD
const mdlSelectLastId = async function () {

    let sql = 'select * from tbl_margem_erro order by id desc limit 1'

    let rsMargemErro = await prisma.$queryRawUnsafe(sql);

    if (rsMargemErro.length > 0) {
        return rsMargemErro;
    } else {
        return false;
    }
}


module.exports = {
    mdlInsertMargemErro,
    mdlUpdateMargemErro,
    mdlDeleteMargemErro,
    mdlSelectAllMargemErro,
    mdlSelectByIdMargemErro,
    mdlSelectLastId
}