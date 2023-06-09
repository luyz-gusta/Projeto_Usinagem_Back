/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados dos ALUNOS no Banco de Dados
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

const mdlSelectAllCriterio = async () => {
    let sql = `
    select 
	    criterio.id as id_criterio, 
        criterio.descricao as descricao_criterio, 
        criterio.observacao as observacao_nota_criterio,
        criterio.tipo_critico, 
        criterio.id_tarefa,
        tarefa.nome as nome_tarefa,
        tarefa.nome as nome_tarefa, tarefa.tempo_previsto as tempo_previsto_tarefa, 
        tarefa.numero as numero_tarefa, tarefa.foto_peca
    from tbl_criterio as criterio
	    inner join tbl_tarefa as tarefa
		    on tarefa.id = criterio.id_tarefa
    order by criterio.id asc;
    `

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0) {
        return rsCriterio
    } else {
        return false
    }
}

const mdlSelectCriterioByID = async (idCriterio) => {
    let sql = `
    select 
	    criterio.id as id_criterio, 
        criterio.descricao as descricao_criterio, 
        criterio.observacao as observacao_nota_criterio,
        criterio.tipo_critico, 
        criterio.id_tarefa,
        tarefa.nome as nome_tarefa,
        tarefa.nome as nome_tarefa, tarefa.tempo_previsto as tempo_previsto_tarefa, 
        tarefa.numero as numero_tarefa, tarefa.foto_peca
    from tbl_criterio as criterio
	    inner join tbl_tarefa as tarefa
		    on tarefa.id = criterio.id_tarefa
    where criterio.id = ${idCriterio}
    order by criterio.id asc;
    `

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0) {
        return rsCriterio
    } else {
        return false
    }
}

const mdlSelectCriterioByIdTarefa = async (idTarefa) => {
    let sql = `
    select 
	    criterio.id as id_criterio, 
        criterio.descricao as descricao_criterio, 
        criterio.observacao as observacao_nota_criterio,
        criterio.tipo_critico, 
        criterio.id_tarefa,
        tarefa.nome as nome_tarefa,
        tarefa.nome as nome_tarefa, tarefa.tempo_previsto as tempo_previsto_tarefa, 
        tarefa.numero as numero_tarefa, tarefa.foto_peca
    from tbl_criterio as criterio
	    inner join tbl_tarefa as tarefa
		    on tarefa.id = criterio.id_tarefa
    where criterio.id_tarefa = ${idTarefa}
    order by criterio.id asc;
    `

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0) {
        return rsCriterio
    } else {
        return false
    }
}

const mdlSelectLastByID = async () => {
    let sql = `select * from tbl_criterio order by id desc limit 1;
    `

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0) {
        return rsCriterio
    } else {
        return false
    }
}

const mdlInsertCriterio = async (dadosCriterio) => {
    let sql = `
    insert into tbl_criterio(
        descricao, 
        observacao, 
        tipo_critico, 
        id_tarefa
    ) values (
        '${dadosCriterio.descricao}',
        ${dadosCriterio.observacao},
        ${dadosCriterio.tipo_critico},
        ${dadosCriterio.id_tarefa}
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

const mdlUpdateCriterio = async (dadosCriterio) => {
    let sql = `
    update tbl_criterio 
	set descricao = '${dadosCriterio.descricao}',
		observacao = ${dadosCriterio.observacao},
		tipo_critico = ${dadosCriterio.tipo_critico},
        id_tarefa = ${dadosCriterio.id_tarefa}
	where id = ${dadosCriterio.id};
    `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}


module.exports = {
    mdlSelectAllCriterio,
    mdlSelectCriterioByID,
    mdlSelectCriterioByIdTarefa,
    mdlSelectLastByID,
    mdlInsertCriterio,
    mdlUpdateCriterio
}