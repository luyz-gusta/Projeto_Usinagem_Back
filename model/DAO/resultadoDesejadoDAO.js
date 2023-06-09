/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados de RESULTADO DESEJADO no Banco de Dados
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
    let sql = `select * from tbl_resultado_desejado where id_criterio = ${id_criterio};`;

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

module.exports = {
    mdlSelectAllResultadoDesejado,
    mdlSelectResultadoDesejadoPeloIdCriterio,
}