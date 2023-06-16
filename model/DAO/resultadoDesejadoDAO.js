/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados de RESULTADO_DESEJADO no Banco de Dados
 * Autor: Luiz Gustavo, Muryllo Vieira e Millena
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

//Retorna a lista de todas as ResultadoDesejado
const mdlSelectAllResultadoDesejado = async function () {

    //Script para buscar todos os itens no BD
    let sql = `select * from tbl_resultado_desejado;`;

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_resultado_desejado') - permite interpretar o scriptSQL direto no metodo
    let rsResultadoDesejado = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsResultadoDesejado.length > 0) {
        return rsResultadoDesejado
    } else {
        return false;
    }
}

//Retorna a lista de todas as ResultadoDesejado
const mdlSelectResultadoDesejadoPeloIdCriterio = async function (id_criterio) {

    //Script para buscar todos os itens no BD
    let sql = `select 
        tbl_resultado_desejado.id as id_resultado_desejado, tbl_resultado_desejado.valor
    from tbl_resultado_desejado where id_criterio = ${id_criterio};`;

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_resultado_desejado') - permite interpretar o scriptSQL direto no metodo
    let rsResultadoDesejado = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsResultadoDesejado.length > 0) {
        return rsResultadoDesejado
    } else {
        return false;
    }
}

const mdlSelectResultadoDesejadoByID = async (idResultadoDesejado) => {
    let sql = `
    select *
    from tbl_resultado_desejado
    where id = ${idResultadoDesejado};
    `

    let rsResultadoDesejado = await prisma.$queryRawUnsafe(sql)

    if (rsResultadoDesejado.length > 0) {
        return rsResultadoDesejado
    } else {
        return false
    }
}

const mdlSelectResultadoDesejadoByValor = async (valorResultadoDesejado) => {
    let sql = `
    select *
    from tbl_resultado_desejado
    where valor like '%${valorResultadoDesejado}%';
    `

    let rsResultadoDesejado = await prisma.$queryRawUnsafe(sql)

    if (rsResultadoDesejado.length > 0) {
        return rsResultadoDesejado
    } else {
        return false
    }
}

//Inserir dados de ResultadoDesejado no Banco de dados
const mdlInsertResultadoDesejado = async function (dadosResultadoDesejado) {

    let sql = `insert into tbl_resultado_desejado(  
                valor,
                id_criterio
             ) values (
                '${dadosResultadoDesejado.valor}',
                ${dadosResultadoDesejado.id_criterio}
                );`
                

    //Executa o scriptSQL no banco de dados
    //console.log(sql);
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Atualizar um ResultadoDesejado existente 
const mdlUpdateResultadoDesejado = async function (dadosResultadoDesejado) {

    let sql = `update tbl_resultado_desejado
    set valor = '${dadosResultadoDesejado.valor}',
        id_criterio = ${dadosResultadoDesejado.id_criterio}
    where id = ${dadosResultadoDesejado.id};
    `
    //Executa o scriptSQL no banco de dados
    // console.log(sql);
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Excluir uma ResultadoDesejado existente
const mdlDeleteResultadoDesejado = async function (id) {

    let sql = `delete from tbl_resultado_desejado where id = ${id}`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Retorna o ultimo id inserido no BD
const mdlSelectLastId = async function () {

    let sql = 'select * from tbl_resultado_desejado order by id desc limit 1'

    let rsResultadoDesejado = await prisma.$queryRawUnsafe(sql);

    if (rsResultadoDesejado.length > 0) {
        return rsResultadoDesejado;
    } else {
        return false;
    }
}

module.exports = {
    mdlSelectAllResultadoDesejado,
    mdlSelectResultadoDesejadoPeloIdCriterio,
    mdlSelectResultadoDesejadoByID,
    mdlSelectResultadoDesejadoByValor,
    mdlInsertResultadoDesejado,
    mdlUpdateResultadoDesejado,
    mdlDeleteResultadoDesejado,
    mdlSelectLastId,
}